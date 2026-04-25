import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const DEFAULT_GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v25.0";

function sanitizeRecord(obj: Record<string, unknown> = {}) {
  const clean: Record<string, string | number | boolean> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length) clean[key] = value.join("|").slice(0, 1000);
      return;
    }
    if (typeof value === "boolean" || typeof value === "number") {
      clean[key] = value;
      return;
    }
    clean[key] = String(value).slice(0, 1000);
  });
  return clean;
}

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded?.trim()) return forwarded.split(",")[0].trim();
  return "";
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  const datasetId =
    process.env.META_DATASET_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken =
    process.env.META_ACCESS_TOKEN || process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!datasetId || !accessToken) {
    return NextResponse.json(
      { ok: false, skipped: true, reason: "missing_meta_env" },
      { status: 202 },
    );
  }

  const payload = (await req.json().catch(() => ({}))) as {
    event_name?: string;
    event_time?: number;
    event_id?: string;
    action_source?: string;
    event_source_url?: string;
    page_location?: string;
    user_data?: Record<string, unknown>;
    custom_data?: Record<string, unknown>;
    fbp?: string;
    fbc?: string;
    external_id?: string;
  };

  if (!payload.event_name) {
    return NextResponse.json({ ok: false, error: "missing_event_name" }, { status: 400 });
  }

  const eventId = payload.event_id || crypto.randomUUID();
  const graphUrl =
    `https://graph.facebook.com/${DEFAULT_GRAPH_VERSION}/` +
    `${encodeURIComponent(datasetId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  const requestBody: Record<string, unknown> = {
    data: [
      {
        event_name: payload.event_name,
        event_time: payload.event_time || Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: payload.action_source || "website",
        event_source_url: payload.event_source_url || payload.page_location || "",
        user_data: sanitizeRecord({
          fbp: payload.user_data?.fbp || payload.fbp || "",
          fbc: payload.user_data?.fbc || payload.fbc || "",
          external_id: payload.user_data?.external_id || payload.external_id || "",
          em: payload.user_data?.em || "",
          ph: payload.user_data?.ph || "",
          client_ip_address: getClientIp(req),
          client_user_agent: req.headers.get("user-agent") || "",
        }),
        custom_data: sanitizeRecord(payload.custom_data || {}),
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    requestBody.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const upstream = await fetch(graphUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const text = await upstream.text();
    let parsed: unknown = {};
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      parsed = { raw: text };
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "meta_upstream_error", status: upstream.status, details: parsed },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, event_id: eventId, details: parsed });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "meta_request_failed",
        message: error instanceof Error ? error.message : "unknown_error",
      },
      { status: 502 },
    );
  }
}
