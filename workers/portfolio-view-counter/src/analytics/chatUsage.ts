/** Record chatbot model usage + optional visitor transcripts. */

import { newId } from "../lib/crypto";
import { looksLikeAuthMessage, redactVisitorText } from "./redact";
import { estimateCostUsd, type UsageTokens } from "./pricing";

function dayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

export async function recordChatUsage(
  db: D1Database,
  args: {
    conversationId: string | null;
    anonymousVisitorId?: string | null;
    sessionId?: string | null;
    mode: "public" | "owner";
    model: string;
    status: "ok" | "error";
    latencyMs: number;
    usage: UsageTokens;
    tools: string[];
    usedWebSearch: boolean;
    usedPortfolio: boolean;
    pagePath?: string | null;
  },
): Promise<void> {
  const now = Date.now();
  const total =
    args.usage.inputTokens + args.usage.outputTokens;
  const estimated = await estimateCostUsd(db, {
    provider: "openai",
    model: args.model,
    at: now,
    usage: args.usage,
  });

  await db
    .prepare(
      `INSERT INTO chat_usage_events
       (id, conversation_id, anonymous_visitor_id, session_id, mode, model, status,
        latency_ms, input_tokens, output_tokens, cached_tokens, total_tokens,
        estimated_cost_usd, tools_json, used_web_search, used_portfolio, page_path, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      newId("cus"),
      args.conversationId,
      args.anonymousVisitorId ?? null,
      args.sessionId ?? null,
      args.mode,
      args.model,
      args.status,
      args.latencyMs,
      args.usage.inputTokens,
      args.usage.outputTokens,
      args.usage.cachedTokens,
      total,
      estimated,
      JSON.stringify(args.tools.slice(0, 12)),
      args.usedWebSearch ? 1 : 0,
      args.usedPortfolio ? 1 : 0,
      args.pagePath ?? null,
      now,
    )
    .run();

  await db
    .prepare(
      `INSERT INTO analytics_daily_totals
       (day, model_requests, input_tokens, output_tokens, estimated_cost_usd)
       VALUES (?, 1, ?, ?, ?)
       ON CONFLICT(day) DO UPDATE SET
         model_requests = model_requests + 1,
         input_tokens = input_tokens + excluded.input_tokens,
         output_tokens = output_tokens + excluded.output_tokens,
         estimated_cost_usd = estimated_cost_usd + excluded.estimated_cost_usd`,
    )
    .bind(dayKey(now), args.usage.inputTokens, args.usage.outputTokens, estimated)
    .run();
}

export async function storeVisitorChatMessage(
  db: D1Database,
  args: {
    conversationId: string;
    role: "user" | "assistant";
    content: string;
    anonymousVisitorId?: string | null;
    sessionId?: string | null;
    pagePath?: string | null;
  },
): Promise<void> {
  if (looksLikeAuthMessage(args.content)) return;

  const settings = await db
    .prepare("SELECT store_visitor_transcripts FROM analytics_settings WHERE id = 1")
    .first<{ store_visitor_transcripts: number }>();
  if (settings && settings.store_visitor_transcripts === 0) return;

  const redacted = redactVisitorText(args.content);
  if (!redacted) return;

  await db
    .prepare(
      `INSERT INTO visitor_chat_messages
       (id, conversation_id, anonymous_visitor_id, session_id, role, content_redacted, page_path, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      newId("vcm"),
      args.conversationId,
      args.anonymousVisitorId ?? null,
      args.sessionId ?? null,
      args.role,
      redacted.slice(0, 4000),
      args.pagePath ?? null,
      Date.now(),
    )
    .run();
}

export async function cleanupExpiredAnalytics(db: D1Database): Promise<{
  eventsDeleted: number;
  transcriptsDeleted: number;
}> {
  const settings = await db
    .prepare(
      "SELECT raw_event_retention_days, transcript_retention_days FROM analytics_settings WHERE id = 1",
    )
    .first<{ raw_event_retention_days: number; transcript_retention_days: number }>();

  const eventDays = settings?.raw_event_retention_days ?? 90;
  const transcriptDays = settings?.transcript_retention_days ?? 30;
  const now = Date.now();
  const eventCutoff = now - eventDays * 86_400_000;
  const transcriptCutoff = now - transcriptDays * 86_400_000;

  const e = await db
    .prepare("DELETE FROM analytics_events WHERE created_at < ?")
    .bind(eventCutoff)
    .run();
  const t = await db
    .prepare("DELETE FROM visitor_chat_messages WHERE created_at < ?")
    .bind(transcriptCutoff)
    .run();

  return {
    eventsDeleted: e.meta.changes ?? 0,
    transcriptsDeleted: t.meta.changes ?? 0,
  };
}
