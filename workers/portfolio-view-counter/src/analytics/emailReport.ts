/** Rich portfolio activity email summaries (every N human views). */

import { newId } from "../lib/crypto";

type StatsRow = { total: number; last_notified: number };

export type EmailEnv = {
  DB: D1Database;
  RESEND_API_KEY: string;
  EMAIL_TO: string;
  EMAIL_FROM: string;
};

async function buildSummarySnapshot(db: D1Database): Promise<Record<string, unknown>> {
  const since = Date.now() - 7 * 86_400_000;
  const totals = await db
    .prepare(
      `SELECT
         COALESCE(SUM(human_views),0) as views,
         COALESCE(SUM(human_sessions),0) as sessions,
         COALESCE(SUM(chat_messages),0) as chat_messages,
         COALESCE(SUM(model_requests),0) as model_requests,
         COALESCE(SUM(input_tokens + output_tokens),0) as tokens,
         COALESCE(SUM(estimated_cost_usd),0) as cost
       FROM analytics_daily_totals
       WHERE day >= ?`,
    )
    .bind(new Date(since).toISOString().slice(0, 10))
    .first<{
      views: number;
      sessions: number;
      chat_messages: number;
      model_requests: number;
      tokens: number;
      cost: number;
    }>();

  const topPage = await db
    .prepare(
      `SELECT page_path, SUM(views) as v FROM analytics_daily_pages
       WHERE day >= ? GROUP BY page_path ORDER BY v DESC LIMIT 1`,
    )
    .bind(new Date(since).toISOString().slice(0, 10))
    .first<{ page_path: string; v: number }>();

  const topSource = await db
    .prepare(
      `SELECT acquisition, SUM(views) as v FROM analytics_daily_sources
       WHERE day >= ? GROUP BY acquisition ORDER BY v DESC LIMIT 1`,
    )
    .bind(new Date(since).toISOString().slice(0, 10))
    .first<{ acquisition: string; v: number }>();

  const topLoc = await db
    .prepare(
      `SELECT country, region, SUM(views) as v FROM analytics_daily_locations
       WHERE day >= ? AND country != '' GROUP BY country, region ORDER BY v DESC LIMIT 3`,
    )
    .bind(new Date(since).toISOString().slice(0, 10))
    .all<{ country: string; region: string; v: number }>();

  return {
    weekViews: totals?.views ?? 0,
    weekSessions: totals?.sessions ?? 0,
    chatMessages: totals?.chat_messages ?? 0,
    modelRequests: totals?.model_requests ?? 0,
    tokens: totals?.tokens ?? 0,
    estimatedCost: totals?.cost ?? 0,
    topPage: topPage?.page_path ?? "(none yet)",
    topSource: topSource?.acquisition ?? "Direct",
    locations: (topLoc.results || [])
      .filter((r) => r.v >= 2)
      .map((r) => [r.region, r.country].filter(Boolean).join(", ") || r.country),
  };
}

function formatEmail(threshold: number, snap: Record<string, unknown>): { subject: string; text: string } {
  const locs = Array.isArray(snap.locations) ? (snap.locations as string[]).join("; ") : "n/a";
  const cost =
    typeof snap.estimatedCost === "number" ? snap.estimatedCost.toFixed(4) : "0";
  const text = `Portfolio activity summary

Reached ${threshold} estimated human sessions (threshold report).

Recent week (approx):
- Views: ${snap.weekViews}
- Sessions: ${snap.weekSessions}
- Most viewed page: ${snap.topPage}
- Top source: ${snap.topSource}
- Locations (min 2 views): ${locs || "n/a"}
- Chatbot messages: ${snap.chatMessages}
- GPT requests: ${snap.modelRequests}
- Tokens: ${snap.tokens}
- Estimated chatbot cost: $${cost}

Open owner Insights on the site for details.
Location is approximate (edge metadata). Costs are local estimates, not invoices.
`.trim();

  return {
    subject: `Portfolio activity — ${threshold} visits`,
    text,
  };
}

/**
 * Called after a human session/view increment.
 * Uses visit_stats atomic claim (same pattern as before) with richer body.
 */
export async function maybeSendThresholdEmail(
  env: EmailEnv,
  incremented: StatsRow,
): Promise<void> {
  const settings = await env.DB.prepare(
    "SELECT email_every_n_views, email_mode FROM analytics_settings WHERE id = 1",
  ).first<{ email_every_n_views: number; email_mode: string }>();

  const everyN = settings?.email_every_n_views ?? 5;
  const mode = settings?.email_mode ?? "every_n_views";
  if (mode === "no_emails" || everyN <= 0) return;

  const threshold = Math.floor(incremented.total / everyN) * everyN;
  if (threshold <= 0 || threshold <= incremented.last_notified) return;

  const claim = await env.DB.prepare(
    "UPDATE visit_stats SET last_notified = ? WHERE id = 1 AND last_notified < ?",
  )
    .bind(threshold, threshold)
    .run();

  if (!claim.meta.changes) return;

  const reportId = newId("emr");
  const now = Date.now();
  let snap: Record<string, unknown> = {};
  try {
    snap = await buildSummarySnapshot(env.DB);
  } catch {
    snap = {};
  }

  const { subject, text } = formatEmail(threshold, snap);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [env.EMAIL_TO],
        subject,
        text,
      }),
    });

    if (!res.ok) {
      throw new Error(`resend_${res.status}`);
    }

    await env.DB.prepare(
      `INSERT INTO email_report_history
       (id, trigger_type, period_start, period_end, view_threshold, delivery_status, sent_at, summary_json, created_at)
       VALUES (?, 'every_n_views', NULL, ?, ?, 'sent', ?, ?, ?)`,
    )
      .bind(reportId, now, threshold, now, JSON.stringify(snap), now)
      .run();
  } catch (err) {
    await env.DB.prepare(
      "UPDATE visit_stats SET last_notified = ? WHERE id = 1 AND last_notified = ?",
    )
      .bind(incremented.last_notified, threshold)
      .run();
    await env.DB.prepare(
      `INSERT INTO email_report_history
       (id, trigger_type, period_start, period_end, view_threshold, delivery_status, sent_at, summary_json, created_at)
       VALUES (?, 'every_n_views', NULL, ?, ?, 'failed', NULL, ?, ?)`,
    )
      .bind(reportId, now, threshold, JSON.stringify({ error: "delivery_failed" }), now)
      .run();
    console.error("threshold_email_failed");
    throw err;
  }
}
