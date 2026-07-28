/**
 * Analytics event ingestion + lightweight aggregate updates.
 * Failures must never break the site — callers catch errors.
 */

import { newId } from "../lib/crypto";
import {
  browserFamily,
  classifyAcquisition,
  deviceCategory,
  isLikelyBot,
  referrerDomainFrom,
} from "./classify";
import { geoFromRequest } from "./geo";
import {
  isAllowedEventName,
  MAX_EVENTS_PER_BATCH,
  MAX_PATH_CHARS,
  MAX_TITLE_CHARS,
  sanitizeMetadata,
} from "./schema";

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

export type IncomingEvent = {
  eventName?: unknown;
  anonymousVisitorId?: unknown;
  sessionId?: unknown;
  pagePath?: unknown;
  pageTitle?: unknown;
  referrer?: unknown;
  timestamp?: unknown;
  metadata?: unknown;
};

export async function ingestAnalyticsBatch(
  db: D1Database,
  request: Request,
  events: IncomingEvent[],
): Promise<{ accepted: number; rejected: number }> {
  if (!Array.isArray(events) || events.length === 0) {
    return { accepted: 0, rejected: 0 };
  }

  const slice = events.slice(0, MAX_EVENTS_PER_BATCH);
  const ua = request.headers.get("User-Agent") || "";
  const bot = isLikelyBot(ua) ? 1 : 0;
  const device = deviceCategory(ua);
  const browser = browserFamily(ua);
  const geo = geoFromRequest(request);

  let accepted = 0;
  let rejected = 0;

  for (const raw of slice) {
    try {
      if (typeof raw.eventName !== "string" || !isAllowedEventName(raw.eventName)) {
        rejected++;
        continue;
      }
      // Never accept owner auth credential content via analytics.
      if (raw.eventName === "chat_message_sent") {
        const label = (raw.metadata as { label?: unknown } | undefined)?.label;
        if (typeof label === "string" && /^\/owner\b/i.test(label)) {
          rejected++;
          continue;
        }
      }

      const sessionId =
        typeof raw.sessionId === "string" && raw.sessionId.length >= 8
          ? raw.sessionId.slice(0, 80)
          : null;
      if (!sessionId) {
        rejected++;
        continue;
      }

      const pagePath =
        typeof raw.pagePath === "string" && raw.pagePath.startsWith("/")
          ? raw.pagePath.slice(0, MAX_PATH_CHARS)
          : "/";
      const pageTitle =
        typeof raw.pageTitle === "string" ? raw.pageTitle.slice(0, MAX_TITLE_CHARS) : null;
      const visitorId =
        typeof raw.anonymousVisitorId === "string"
          ? raw.anonymousVisitorId.slice(0, 80)
          : null;
      const referrerDomain = referrerDomainFrom(
        typeof raw.referrer === "string" ? raw.referrer : null,
      );
      const meta = sanitizeMetadata(raw.metadata);
      const utmSource =
        meta && typeof meta.utmSource === "string" ? meta.utmSource : null;
      const acquisition = classifyAcquisition({ referrerDomain, utmSource });
      const createdAt =
        typeof raw.timestamp === "string"
          ? Date.parse(raw.timestamp) || Date.now()
          : typeof raw.timestamp === "number"
            ? raw.timestamp
            : Date.now();

      const id = newId("aev");
      await db
        .prepare(
          `INSERT INTO analytics_events
           (id, event_name, anonymous_visitor_id, session_id, page_path, page_title,
            referrer_domain, acquisition, country, region, city, timezone,
            device_category, browser_family, is_bot, metadata, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          raw.eventName,
          visitorId,
          sessionId,
          pagePath,
          pageTitle,
          referrerDomain,
          acquisition,
          geo.country,
          geo.region,
          geo.city,
          geo.timezone,
          device,
          browser,
          bot,
          meta ? JSON.stringify(meta) : null,
          createdAt,
        )
        .run();

      await upsertSession(db, {
        sessionId,
        visitorId,
        createdAt,
        pagePath,
        referrerDomain,
        acquisition,
        country: geo.country,
        region: geo.region,
        city: geo.city,
        device,
        browser,
        bot,
        eventName: raw.eventName,
        activeMs: typeof meta?.activeMs === "number" ? meta.activeMs : 0,
      });

      await bumpDailyAggregates(db, {
        day: dayKey(createdAt),
        eventName: raw.eventName,
        pagePath,
        acquisition,
        referrerDomain: referrerDomain || "",
        country: geo.country || "",
        region: geo.region || "",
        bot,
        activeMs: typeof meta?.activeMs === "number" ? meta.activeMs : 0,
        analyticsId: typeof meta?.analyticsId === "string" ? meta.analyticsId : null,
        category: typeof meta?.category === "string" ? meta.category : "",
        label: typeof meta?.label === "string" ? meta.label : "",
      });

      accepted++;
    } catch {
      rejected++;
    }
  }

  return { accepted, rejected };
}

async function upsertSession(
  db: D1Database,
  args: {
    sessionId: string;
    visitorId: string | null;
    createdAt: number;
    pagePath: string;
    referrerDomain: string | null;
    acquisition: string;
    country: string | null;
    region: string | null;
    city: string | null;
    device: string;
    browser: string;
    bot: number;
    eventName: string;
    activeMs: number;
  },
): Promise<void> {
  const existing = await db
    .prepare("SELECT session_id, page_count, active_ms FROM analytics_sessions WHERE session_id = ?")
    .bind(args.sessionId)
    .first<{ session_id: string; page_count: number; active_ms: number }>();

  if (!existing) {
    await db
      .prepare(
        `INSERT INTO analytics_sessions
         (session_id, anonymous_visitor_id, started_at, ended_at, landing_path, exit_path,
          referrer_domain, acquisition, country, region, city, device_category, browser_family,
          is_bot, page_count, active_ms, engaged)
         VALUES (?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        args.sessionId,
        args.visitorId,
        args.createdAt,
        args.pagePath,
        args.pagePath,
        args.referrerDomain,
        args.acquisition,
        args.country,
        args.region,
        args.city,
        args.device,
        args.browser,
        args.bot,
        args.eventName === "page_viewed" ? 1 : 0,
        Math.max(0, args.activeMs),
        args.activeMs >= 10000 ? 1 : 0,
      )
      .run();
    return;
  }

  const pageInc = args.eventName === "page_viewed" ? 1 : 0;
  const active = existing.active_ms + Math.max(0, args.activeMs);
  await db
    .prepare(
      `UPDATE analytics_sessions SET
         exit_path = ?,
         page_count = page_count + ?,
         active_ms = ?,
         engaged = CASE WHEN ? >= 10000 THEN 1 ELSE engaged END,
         ended_at = CASE WHEN ? IN ('session_ended', 'page_exited') THEN ? ELSE ended_at END
       WHERE session_id = ?`,
    )
    .bind(
      args.pagePath,
      pageInc,
      active,
      active,
      args.eventName,
      args.createdAt,
      args.sessionId,
    )
    .run();
}

async function bumpDailyAggregates(
  db: D1Database,
  args: {
    day: string;
    eventName: string;
    pagePath: string;
    acquisition: string;
    referrerDomain: string;
    country: string;
    region: string;
    bot: number;
    activeMs: number;
    analyticsId: string | null;
    category: string;
    label: string;
  },
): Promise<void> {
  if (args.eventName === "page_viewed") {
    await db
      .prepare(
        `INSERT INTO analytics_daily_totals (day, human_views, bot_views)
         VALUES (?, ?, ?)
         ON CONFLICT(day) DO UPDATE SET
           human_views = human_views + excluded.human_views,
           bot_views = bot_views + excluded.bot_views`,
      )
      .bind(args.day, args.bot ? 0 : 1, args.bot ? 1 : 0)
      .run();

    await db
      .prepare(
        `INSERT INTO analytics_daily_pages (day, page_path, views, sessions, active_ms_total, entries, exits)
         VALUES (?, ?, 1, 0, 0, 0, 0)
         ON CONFLICT(day, page_path) DO UPDATE SET views = views + 1`,
      )
      .bind(args.day, args.pagePath)
      .run();

    await db
      .prepare(
        `INSERT INTO analytics_daily_sources (day, acquisition, referrer_domain, sessions, views)
         VALUES (?, ?, ?, 0, 1)
         ON CONFLICT(day, acquisition, referrer_domain) DO UPDATE SET views = views + 1`,
      )
      .bind(args.day, args.acquisition, args.referrerDomain)
      .run();

    await db
      .prepare(
        `INSERT INTO analytics_daily_locations (day, country, region, sessions, views)
         VALUES (?, ?, ?, 0, 1)
         ON CONFLICT(day, country, region) DO UPDATE SET views = views + 1`,
      )
      .bind(args.day, args.country, args.region)
      .run();
  }

  if (args.eventName === "engagement_heartbeat" || args.eventName === "page_exited") {
    if (args.activeMs > 0) {
      await db
        .prepare(
          `INSERT INTO analytics_daily_pages (day, page_path, views, sessions, active_ms_total, entries, exits)
           VALUES (?, ?, 0, 0, ?, 0, ?)
           ON CONFLICT(day, page_path) DO UPDATE SET
             active_ms_total = active_ms_total + excluded.active_ms_total,
             exits = exits + excluded.exits`,
        )
        .bind(args.day, args.pagePath, args.activeMs, args.eventName === "page_exited" ? 1 : 0)
        .run();

      await db
        .prepare(
          `INSERT INTO analytics_daily_totals (day, active_ms_total)
           VALUES (?, ?)
           ON CONFLICT(day) DO UPDATE SET active_ms_total = active_ms_total + excluded.active_ms_total`,
        )
        .bind(args.day, args.activeMs)
        .run();
    }
  }

  if (
    args.analyticsId &&
    (args.eventName === "button_clicked" ||
      args.eventName === "link_clicked" ||
      args.eventName === "project_opened" ||
      args.eventName === "file_downloaded" ||
      args.eventName === "external_link_opened")
  ) {
    await db
      .prepare(
        `INSERT INTO analytics_daily_interactions (day, analytics_id, category, label, clicks)
         VALUES (?, ?, ?, ?, 1)
         ON CONFLICT(day, analytics_id, category, label) DO UPDATE SET clicks = clicks + 1`,
      )
      .bind(args.day, args.analyticsId.slice(0, 80), args.category.slice(0, 40), args.label.slice(0, 80))
      .run();
  }

  if (args.eventName === "chat_opened") {
    await db
      .prepare(
        `INSERT INTO analytics_daily_totals (day, chat_opens)
         VALUES (?, 1)
         ON CONFLICT(day) DO UPDATE SET chat_opens = chat_opens + 1`,
      )
      .bind(args.day)
      .run();
  }
  if (args.eventName === "chat_message_sent") {
    await db
      .prepare(
        `INSERT INTO analytics_daily_totals (day, chat_messages)
         VALUES (?, 1)
         ON CONFLICT(day) DO UPDATE SET chat_messages = chat_messages + 1`,
      )
      .bind(args.day)
      .run();
  }
}
