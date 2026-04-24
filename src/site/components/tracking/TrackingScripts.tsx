"use client";

import Script from "next/script";
import { brand } from "@/site/config/brand";

const bootstrap = `
(function () {
  const PIXEL_ID = "${brand.pixelId}";
  const GA_ID = "${brand.gaId}";
  const STORAGE_PREFIX = "nuance_tracking_v2";
  const ATTR_KEYS = [
    "utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid",
    "ctwa_clid","source_id","source_type","source_url","ad_id","adset_id",
    "campaign_id","ad_name","adset_name","campaign_name","placement",
    "site_source_name","fb_ref","fb_source","fb_action_ids","fb_action_types",
    "mibextid","igshid"
  ];
  const META_PARAM_PATTERNS = [/^fb/i,/^ig/i,/^utm_/i,/clid$/i,/^ad(_|$)/i,/^adset(_|$)/i,/^campaign(_|$)/i,/^placement$/i,/^site_source_name$/i,/^source(_|$)/i];
  const now = Date.now();

  function safeRead(storage, key) {
    try { const raw = storage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (error) { return null; }
  }
  function safeWrite(storage, key, value) {
    try { storage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^|;\\\\s*)" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[2]) : "";
  }
  function setCookie(name, value, maxAgeSeconds) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + String(maxAgeSeconds) + "; SameSite=Lax";
  }
  function getHost(value) {
    try { return value ? new URL(value).hostname : ""; } catch (error) { return ""; }
  }
  function sanitize(obj) {
    const cleaned = {};
    Object.entries(obj || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      if (Array.isArray(value)) { if (value.length) cleaned[key] = value.join("|").slice(0, 500); return; }
      if (typeof value === "boolean") { cleaned[key] = value ? "true" : "false"; return; }
      if (typeof value === "object") {
        try { cleaned[key] = JSON.stringify(value).slice(0, 1000); } catch (error) { cleaned[key] = String(value).slice(0, 1000); }
        return;
      }
      cleaned[key] = String(value).slice(0, 1000);
    });
    return cleaned;
  }

  const search = new URLSearchParams(window.location.search);
  const query = {};
  ATTR_KEYS.forEach((key) => {
    const value = search.get(key);
    if (value) query[key] = value.trim();
  });
  const allQueryParams = {};
  search.forEach((value, key) => {
    const cleanKey = key.trim();
    const cleanValue = value.trim();
    if (!cleanKey || !cleanValue) return;
    if (allQueryParams[cleanKey]) {
      allQueryParams[cleanKey] = [].concat(allQueryParams[cleanKey], cleanValue);
      return;
    }
    allQueryParams[cleanKey] = cleanValue;
  });
  const metaQueryParams = Object.fromEntries(
    Object.entries(allQueryParams).filter(([key]) =>
      META_PARAM_PATTERNS.some((pattern) => pattern.test(key)),
    ),
  );

  const firstTouchKey = STORAGE_PREFIX + ":first_touch";
  const lastTouchKey = STORAGE_PREFIX + ":last_touch";
  const sessionTouchKey = STORAGE_PREFIX + ":session_touch";
  const referrer = document.referrer || "";
  const referrerHost = getHost(referrer) || "(direct)";
  const touchPoint = sanitize({
    captured_at: new Date(now).toISOString(),
    landing_page: window.location.pathname,
    landing_url: window.location.href,
    referrer,
    referrer_host: referrerHost,
    url_query_params: allQueryParams,
    meta_query_params: metaQueryParams,
    ...query,
  });

  const existingFirstTouch = safeRead(localStorage, firstTouchKey);
  const existingLastTouch = safeRead(localStorage, lastTouchKey);
  const existingSessionTouch = safeRead(sessionStorage, sessionTouchKey);
  const hasCampaignParams = ATTR_KEYS.some((key) => key in query) || Object.keys(metaQueryParams).length > 0;
  const firstTouch = existingFirstTouch || touchPoint;
  const lastTouch = hasCampaignParams || !existingLastTouch ? { ...(existingLastTouch || {}), ...touchPoint } : existingLastTouch;
  const sessionTouch = hasCampaignParams || !existingSessionTouch ? { ...(existingSessionTouch || {}), ...touchPoint } : existingSessionTouch;

  const fbp = getCookie("_fbp") || "";
  const existingFbc = getCookie("_fbc") || "";
  const derivedFbc = query.fbclid ? "fb.1." + now + "." + query.fbclid : "";
  if (!existingFbc && derivedFbc) setCookie("_fbc", derivedFbc, 7776000);
  const fbc = existingFbc || derivedFbc || sessionTouch?.fbc || lastTouch?.fbc || firstTouch?.fbc || "";
  if (fbc) {
    lastTouch.fbc = fbc;
    sessionTouch.fbc = fbc;
  }

  safeWrite(localStorage, firstTouchKey, firstTouch);
  safeWrite(localStorage, lastTouchKey, lastTouch);
  safeWrite(sessionStorage, sessionTouchKey, sessionTouch);

  const attribution = sanitize({
    utm_source: query.utm_source || sessionTouch?.utm_source || lastTouch?.utm_source || firstTouch?.utm_source || "",
    utm_medium: query.utm_medium || sessionTouch?.utm_medium || lastTouch?.utm_medium || firstTouch?.utm_medium || "",
    utm_campaign: query.utm_campaign || sessionTouch?.utm_campaign || lastTouch?.utm_campaign || firstTouch?.utm_campaign || "",
    utm_content: query.utm_content || sessionTouch?.utm_content || lastTouch?.utm_content || firstTouch?.utm_content || "",
    utm_term: query.utm_term || sessionTouch?.utm_term || lastTouch?.utm_term || firstTouch?.utm_term || "",
    fbclid: query.fbclid || sessionTouch?.fbclid || lastTouch?.fbclid || firstTouch?.fbclid || "",
    ctwa_clid: query.ctwa_clid || sessionTouch?.ctwa_clid || lastTouch?.ctwa_clid || firstTouch?.ctwa_clid || "",
    source_id: query.source_id || sessionTouch?.source_id || lastTouch?.source_id || firstTouch?.source_id || "",
    source_type: query.source_type || sessionTouch?.source_type || lastTouch?.source_type || firstTouch?.source_type || "",
    source_url: query.source_url || sessionTouch?.source_url || lastTouch?.source_url || firstTouch?.source_url || "",
    ad_id: query.ad_id || sessionTouch?.ad_id || lastTouch?.ad_id || firstTouch?.ad_id || "",
    adset_id: query.adset_id || sessionTouch?.adset_id || lastTouch?.adset_id || firstTouch?.adset_id || "",
    campaign_id: query.campaign_id || sessionTouch?.campaign_id || lastTouch?.campaign_id || firstTouch?.campaign_id || "",
    placement: query.placement || sessionTouch?.placement || lastTouch?.placement || firstTouch?.placement || "",
    site_source_name: query.site_source_name || sessionTouch?.site_source_name || lastTouch?.site_source_name || firstTouch?.site_source_name || "",
    url_query_params: Object.keys(allQueryParams).length ? allQueryParams : sessionTouch?.url_query_params || lastTouch?.url_query_params || firstTouch?.url_query_params || "",
    meta_query_params: Object.keys(metaQueryParams).length ? metaQueryParams : sessionTouch?.meta_query_params || lastTouch?.meta_query_params || firstTouch?.meta_query_params || "",
    fbp,
    fbc,
    referrer_host: sessionTouch?.referrer_host || lastTouch?.referrer_host || firstTouch?.referrer_host || referrerHost,
    landing_page: firstTouch?.landing_page || window.location.pathname,
    first_touch_source: firstTouch?.utm_source || firstTouch?.referrer_host || "(direct)",
    first_touch_campaign: firstTouch?.utm_campaign || "",
  });

  window.NUANCE_TRACKING = {
    pixelId: PIXEL_ID,
    gaId: GA_ID,
    pageType: window.location.pathname.startsWith("/quiz") ? "quiz" : "landing",
    whatsappNumber: "${brand.whatsappNumber}",
    attribution,
    sanitize,
    getEventProps(extra) {
      return sanitize({
        page_type: this.pageType,
        page_path: window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
        ...this.attribution,
        fbp: getCookie("_fbp") || this.attribution.fbp || "",
        fbc: getCookie("_fbc") || this.attribution.fbc || "",
        ...extra,
      });
    },
    buildEventId(prefix) {
      return [prefix, this.pageType, Date.now(), Math.random().toString(36).slice(2, 10)].join("_");
    },
    sendServerEvent(payload) {
      const body = JSON.stringify(payload);
      const url = "/api/meta-events";
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
        return;
      }
      fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    },
  };
})();
`;

const handlers = `
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function trackMetaCustom(name, props, options) {
    if (typeof fbq === "undefined" || !window.NUANCE_TRACKING) return;
    fbq("trackCustom", name, window.NUANCE_TRACKING.getEventProps(props || {}), options || {});
  }
  function trackMetaStandard(name, props, options) {
    if (typeof fbq === "undefined" || !window.NUANCE_TRACKING) return;
    fbq("track", name, window.NUANCE_TRACKING.getEventProps(props || {}), options || {});
  }
  function trackGaEvent(name, props) {
    if (typeof gtag === "undefined" || !window.NUANCE_TRACKING) return;
    gtag("event", name, window.NUANCE_TRACKING.getEventProps(props || {}));
  }
  function sendMetaServerEvent(eventName, eventId, customData) {
    const tracking = window.NUANCE_TRACKING;
    if (!tracking) return;
    tracking.sendServerEvent({
      event_name: eventName,
      event_id: eventId,
      action_source: "website",
      event_source_url: window.location.href,
      page_type: tracking.pageType,
      user_data: {
        fbp: tracking.attribution.fbp || "",
        fbc: tracking.attribution.fbc || "",
      },
      custom_data: tracking.getEventProps(customData || {}),
    });
  }
  function trackWA(origin) {
    const tracking = window.NUANCE_TRACKING;
    if (!tracking) return;
    const eventId = tracking.buildEventId("whatsapp");
    const props = {
      content_name: tracking.pageType === "quiz" ? "quiz_whatsapp" : "whatsapp_click",
      content_category: "advogados",
      cta_source: origin,
      conversion_target: "whatsapp",
      lead_stage: "click_to_whatsapp",
    };
    trackMetaCustom("whatsapp_click", props, { eventID: eventId });
    trackMetaStandard("AddToCart", props, { eventID: eventId });
    trackGaEvent("whatsapp_click", props);
    sendMetaServerEvent("AddToCart", eventId, props);
  }
  ready(function () {
    const tracking = window.NUANCE_TRACKING;
    if (!tracking) return;
    const viewProps = {
      page_group: tracking.pageType === "quiz" ? "quiz" : "sales",
      entry_channel: tracking.attribution.utm_source || tracking.attribution.referrer_host || "(direct)",
    };
    trackMetaCustom(tracking.pageType === "quiz" ? "quiz_viewed" : "landing_viewed", viewProps);
    trackGaEvent(tracking.pageType === "quiz" ? "quiz_viewed" : "landing_viewed", viewProps);

    document.querySelectorAll("[data-wa-source]").forEach(function (link) {
      link.addEventListener("click", function () {
        trackWA(link.getAttribute("data-wa-source"));
      });
    });

    const progress = document.getElementById("progressBar");
    if (progress) {
      window.addEventListener("scroll", function () {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        progress.style.width = pct + "%";
      });
    }

    const priceSection = document.querySelector(".price-section");
    if (priceSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          trackMetaCustom("pricing_section_view", { section_name: "pricing", visibility_threshold: "0.45" });
          trackGaEvent("pricing_section_view", { section_name: "pricing", visibility_threshold: "0.45" });
          observer.disconnect();
        });
      }, { threshold: 0.45 });
      observer.observe(priceSection);
    }
  });
})();
`;

export function TrackingScripts() {
  return (
    <>
      <Script id="nuance-tracking-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: bootstrap }} />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${brand.gaId}`} strategy="afterInteractive" />
      <Script
        id="ga4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${brand.gaId}');
          `,
        }}
      />
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${brand.pixelId}');
            fbq('track', 'PageView', window.NUANCE_TRACKING ? window.NUANCE_TRACKING.getEventProps({page_group: window.NUANCE_TRACKING.pageType === "quiz" ? "quiz" : "sales"}) : {});
          `,
        }}
      />
      <Script id="nuance-event-handlers" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: handlers }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${brand.pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
