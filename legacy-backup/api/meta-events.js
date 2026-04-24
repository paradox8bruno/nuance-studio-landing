import crypto from "node:crypto";

const DEFAULT_GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v25.0";

function sanitizeRecord(obj) {
  const clean = {};
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length) clean[key] = value.join("|").slice(0, 1000);
      return;
    }
    if (typeof value === "boolean") {
      clean[key] = value;
      return;
    }
    if (typeof value === "number") {
      clean[key] = value;
      return;
    }
    clean[key] = String(value).slice(0, 1000);
  });
  return clean;
}

function readRequestBody(req) {
  if (!req || req.body === undefined || req.body === null) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }
  return req.body;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "";
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const datasetId =
    process.env.META_DATASET_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken =
    process.env.META_ACCESS_TOKEN ||
    process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!datasetId || !accessToken) {
    res.status(202).json({
      ok: false,
      skipped: true,
      reason: "missing_meta_env",
    });
    return;
  }

  const payload = readRequestBody(req);
  const eventName = payload.event_name;

  if (!eventName) {
    res.status(400).json({ ok: false, error: "missing_event_name" });
    return;
  }

  const graphUrl =
    `https://graph.facebook.com/${DEFAULT_GRAPH_VERSION}/` +
    `${encodeURIComponent(datasetId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  const eventId = payload.event_id || crypto.randomUUID();
  const requestBody = {
    data: [
      {
        event_name: eventName,
        event_time: payload.event_time || Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: payload.action_source || "website",
        event_source_url:
          payload.event_source_url || payload.page_location || "",
        user_data: sanitizeRecord({
          fbp: payload.user_data?.fbp || payload.fbp || "",
          fbc: payload.user_data?.fbc || payload.fbc || "",
          client_ip_address: getClientIp(req),
          client_user_agent: req.headers["user-agent"] || "",
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const text = await upstream.text();
    let parsed = {};

    try {
      parsed = text ? JSON.parse(text) : {};
    } catch (error) {
      parsed = { raw: text };
    }

    if (!upstream.ok) {
      res.status(502).json({
        ok: false,
        error: "meta_upstream_error",
        status: upstream.status,
        details: parsed,
      });
      return;
    }

    res.status(200).json({
      ok: true,
      event_id: eventId,
      details: parsed,
    });
  } catch (error) {
    res.status(502).json({
      ok: false,
      error: "meta_request_failed",
      message: error.message,
    });
  }
}
