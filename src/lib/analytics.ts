/**
 * First-party analytics client.
 * Pseudonymous visitor/session IDs — never owner auth tokens.
 * Failures never break the site.
 */

import { askShirleyEndpointBase } from "@/lib/askShirleyOwnerApi";

const VISITOR_KEY = "sz_analytics_vid";
const SESSION_KEY = "sz_analytics_sid";
const SESSION_TOUCH_KEY = "sz_analytics_sid_touch";
const SESSION_INACTIVITY_MS = 30 * 60 * 1000;

type AnalyticsEventName =
  | "session_started"
  | "session_ended"
  | "page_viewed"
  | "page_exited"
  | "page_visibility_changed"
  | "engagement_heartbeat"
  | "button_clicked"
  | "link_clicked"
  | "project_opened"
  | "project_interacted"
  | "file_downloaded"
  | "external_link_opened"
  | "chat_opened"
  | "chat_message_sent"
  | "chat_response_received"
  | "chat_tool_used"
  | "chat_error"
  | "owner_authenticated"
  | "owner_logged_out";

type Meta = Record<string, string | number | boolean | string[] | undefined>;

type QueuedEvent = {
  eventName: AnalyticsEventName;
  anonymousVisitorId: string;
  sessionId: string;
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  timestamp: string;
  metadata?: Meta;
};

function shouldSkip(): boolean {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1") return true;
  const nav = window.navigator as Navigator & { webdriver?: boolean };
  if (nav.webdriver) return true;
  return false;
}

function randomId(prefix: string): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id || id.length < 8) {
      id = randomId("vid");
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return randomId("vid");
  }
}

function getSessionId(): string {
  try {
    const now = Date.now();
    const touch = Number(sessionStorage.getItem(SESSION_TOUCH_KEY) || 0);
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid || now - touch > SESSION_INACTIVITY_MS) {
      sid = randomId("asid");
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    sessionStorage.setItem(SESSION_TOUCH_KEY, String(now));
    return sid;
  } catch {
    return randomId("asid");
  }
}

export function getAnalyticsIds(): { visitorId: string; sessionId: string } {
  return { visitorId: getVisitorId(), sessionId: getSessionId() };
}

function endpoint(): string | null {
  return askShirleyEndpointBase();
}

function utmMeta(): Meta {
  try {
    const sp = new URLSearchParams(window.location.search);
    return {
      utmSource: sp.get("utm_source") || undefined,
      utmMedium: sp.get("utm_medium") || undefined,
      utmCampaign: sp.get("utm_campaign") || undefined,
      language: navigator.language,
      screenCategory:
        window.innerWidth < 640 ? "sm" : window.innerWidth < 1024 ? "md" : "lg",
    };
  } catch {
    return {};
  }
}

const queue: QueuedEvent[] = [];
let flushTimer: number | null = null;
let lastPagePath: string | null = null;
let pageActiveMs = 0;
let pageActiveStarted = 0;
let pageVisible = true;
let lastInteraction = Date.now();
const INACTIVITY_CUTOFF_MS = 45_000;
let startedSession = false;
let routeHookInstalled = false;

function touchActivity(): void {
  lastInteraction = Date.now();
  getSessionId();
}

function accumulateActive(): void {
  if (!pageVisible) return;
  if (Date.now() - lastInteraction > INACTIVITY_CUTOFF_MS) return;
  if (pageActiveStarted > 0) {
    pageActiveMs += Date.now() - pageActiveStarted;
  }
  pageActiveStarted = Date.now();
}

function flush(beacon = false): void {
  if (!queue.length || shouldSkip()) {
    queue.length = 0;
    return;
  }
  const base = endpoint();
  if (!base) {
    queue.length = 0;
    return;
  }
  const batch = queue.splice(0, 25);
  const body = JSON.stringify({ events: batch });
  const url = `${base}/api/analytics/events`;
  try {
    if (beacon && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
    void fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {
      /* ignore */
    });
  } catch {
    /* ignore */
  }
}

function scheduleFlush(): void {
  if (flushTimer != null) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    flush(false);
  }, 1200);
}

export function trackEvent(
  eventName: AnalyticsEventName,
  metadata?: Meta,
  pathOverride?: string,
): void {
  try {
    if (shouldSkip()) return;
    if (eventName === "chat_message_sent") {
      const label = metadata?.label;
      if (typeof label === "string" && /^\/owner\b/i.test(label)) return;
    }
    const path = pathOverride || window.location.pathname + window.location.search;
    queue.push({
      eventName,
      anonymousVisitorId: getVisitorId(),
      sessionId: getSessionId(),
      pagePath: path.slice(0, 200),
      pageTitle: document.title.slice(0, 200),
      referrer: document.referrer || undefined,
      timestamp: new Date().toISOString(),
      metadata: { ...utmMeta(), ...metadata },
    });
    scheduleFlush();
  } catch {
    /* ignore */
  }
}

function endPage(path: string): void {
  accumulateActive();
  const activeMs = pageActiveMs;
  pageActiveMs = 0;
  pageActiveStarted = 0;
  trackEvent("page_exited", { activeMs, previousPath: path }, path);
}

export function trackPageView(path?: string): void {
  try {
    if (shouldSkip()) return;
    const next = path || window.location.pathname + window.location.search;
    if (lastPagePath === next) return; // de-dupe remounts / StrictMode
    if (lastPagePath) endPage(lastPagePath);
    lastPagePath = next;
    pageActiveMs = 0;
    pageActiveStarted = Date.now();
    pageVisible = document.visibilityState === "visible";
    if (!startedSession) {
      startedSession = true;
      trackEvent("session_started", {}, next);
    }
    trackEvent(
      "page_viewed",
      { previousPath: lastPagePath === next ? undefined : lastPagePath || undefined },
      next,
    );
  } catch {
    /* ignore */
  }
}

function onVisibility(): void {
  if (document.visibilityState === "hidden") {
    accumulateActive();
    pageVisible = false;
    pageActiveStarted = 0;
    trackEvent("page_visibility_changed", { visible: false, activeMs: pageActiveMs });
    flush(true);
  } else {
    pageVisible = true;
    pageActiveStarted = Date.now();
    touchActivity();
    trackEvent("page_visibility_changed", { visible: true });
  }
}

function heartbeat(): void {
  if (!pageVisible) return;
  if (Date.now() - lastInteraction > INACTIVITY_CUTOFF_MS) {
    pageActiveStarted = 0;
    return;
  }
  accumulateActive();
  if (pageActiveMs >= 5000) {
    trackEvent("engagement_heartbeat", { activeMs: Math.min(pageActiveMs, 60_000) });
    pageActiveMs = 0;
  }
}

function onClickCapture(e: MouseEvent): void {
  try {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const el = target.closest<HTMLElement>("[data-analytics-id]");
    if (!el) return;
    touchActivity();
    const analyticsId = el.getAttribute("data-analytics-id") || "";
    const category = el.getAttribute("data-analytics-category") || "ui";
    const label = el.getAttribute("data-analytics-label") || analyticsId;
    const href = el.getAttribute("href");
    let destinationDomain: string | undefined;
    let destinationPath: string | undefined;
    if (href) {
      try {
        const u = new URL(href, window.location.origin);
        if (u.origin === window.location.origin) destinationPath = u.pathname;
        else destinationDomain = u.hostname;
      } catch {
        /* ignore */
      }
    }
    const eventName =
      category === "project"
        ? "project_opened"
        : href && destinationDomain
          ? "external_link_opened"
          : category === "download"
            ? "file_downloaded"
            : href
              ? "link_clicked"
              : "button_clicked";
    trackEvent(eventName as AnalyticsEventName, {
      analyticsId,
      category,
      label,
      destinationPath,
      destinationDomain,
    });
  } catch {
    /* ignore */
  }
}

export function initAnalytics(): void {
  if (typeof window === "undefined" || routeHookInstalled) return;
  routeHookInstalled = true;
  if (shouldSkip()) return;

  trackPageView();

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", () => {
    if (lastPagePath) endPage(lastPagePath);
    trackEvent("session_ended", { activeMs: pageActiveMs });
    flush(true);
  });
  document.addEventListener("click", onClickCapture, true);
  ["mousemove", "scroll", "keydown", "touchstart"].forEach((evt) => {
    window.addEventListener(
      evt,
      () => {
        touchActivity();
        if (pageVisible && pageActiveStarted === 0) pageActiveStarted = Date.now();
      },
      { passive: true },
    );
  });
  window.setInterval(heartbeat, 15_000);
}

/** Call on React Router location changes. */
export function onAnalyticsRouteChange(pathname: string, search = ""): void {
  trackPageView(pathname + search);
}
