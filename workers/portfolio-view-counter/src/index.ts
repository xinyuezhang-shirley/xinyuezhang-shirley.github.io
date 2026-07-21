import { allowRequest } from "./lib/rateLimit";
import { handleAskShirley } from "./routes/askShirley";

export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  EMAIL_TO: string;
  EMAIL_FROM: string;
  ALLOWED_ORIGIN: string;
  ALLOW_DEV_RESET?: string;
  DEV_RESET_SECRET?: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  ASK_SHIRLEY_RATE_MAX?: string;
}

type StatsRow = { total: number; last_notified: number };

/** Comma-separated ALLOWED_ORIGIN secret → list of exact origins. */
function parseAllowedOrigins(allowed: string): string[] {
  return allowed
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

function isOriginAllowed(origin: string | null, allowed: string): boolean {
  if (!origin) return false;
  return parseAllowedOrigins(allowed).includes(origin);
}

function corsHeaders(origin: string | null, allowed: string): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Dev-Reset-Secret",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && isOriginAllowed(origin, allowed)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin, allowed),
    },
  });
}

async function sendThresholdEmail(env: Env, count: number): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [env.EMAIL_TO],
      subject: `Portfolio reached ${count} visits`,
      text: `Your portfolio has recorded ${count} browser sessions.`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${detail.slice(0, 200)}`);
  }
}

async function handleView(env: Env): Promise<void> {
  const incremented = await env.DB.prepare(
    "UPDATE visit_stats SET total = total + 1 WHERE id = 1 RETURNING total, last_notified",
  ).first<StatsRow>();

  if (!incremented) {
    throw new Error("visit_stats missing — run schema.sql");
  }

  const threshold = Math.floor(incremented.total / 5) * 5;
  if (threshold <= 0 || threshold <= incremented.last_notified) {
    return;
  }

  const claim = await env.DB.prepare(
    "UPDATE visit_stats SET last_notified = ? WHERE id = 1 AND last_notified < ?",
  )
    .bind(threshold, threshold)
    .run();

  if (!claim.meta.changes) {
    return;
  }

  try {
    await sendThresholdEmail(env, threshold);
  } catch (err) {
    await env.DB.prepare(
      "UPDATE visit_stats SET last_notified = ? WHERE id = 1 AND last_notified = ?",
    )
      .bind(incremented.last_notified, threshold)
      .run();
    console.error("threshold_email_failed");
    throw err;
  }
}

async function handleDevReset(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  if (env.ALLOW_DEV_RESET !== "true") {
    return json({ ok: false }, 404, origin, allowed);
  }

  const secret = request.headers.get("X-Dev-Reset-Secret");
  if (!env.DEV_RESET_SECRET || secret !== env.DEV_RESET_SECRET) {
    return json({ ok: false }, 401, origin, allowed);
  }

  await env.DB.prepare(
    "UPDATE visit_stats SET total = 0, last_notified = 0 WHERE id = 1",
  ).run();
  await env.DB.prepare("DELETE FROM rate_limits").run();

  return json({ ok: true, total: 0, last_notified: 0 }, 200, origin, allowed);
}

async function handleDevStatus(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  if (env.ALLOW_DEV_RESET !== "true") {
    return json({ ok: false }, 404, origin, allowed);
  }

  const secret = request.headers.get("X-Dev-Reset-Secret");
  if (!env.DEV_RESET_SECRET || secret !== env.DEV_RESET_SECRET) {
    return json({ ok: false }, 401, origin, allowed);
  }

  const row = await env.DB.prepare(
    "SELECT total, last_notified FROM visit_stats WHERE id = 1",
  ).first<StatsRow>();

  return json(
    { ok: true, total: row?.total ?? 0, last_notified: row?.last_notified ?? 0 },
    200,
    origin,
    allowed,
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = env.ALLOWED_ORIGIN;
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!isOriginAllowed(origin, allowed)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
    }

    try {
      if (url.pathname === "/dev/reset" && request.method === "POST") {
        return await handleDevReset(request, env);
      }
      if (url.pathname === "/dev/status" && request.method === "GET") {
        return await handleDevStatus(request, env);
      }

      if (!isOriginAllowed(origin, allowed)) {
        return json({ ok: false }, 403, origin, allowed);
      }

      // Ask Shirley — own rate-limit bucket inside the route handler.
      if (
        (url.pathname === "/api/ask-shirley" || url.pathname === "/ask-shirley") &&
        request.method === "POST"
      ) {
        return await handleAskShirley(
          request,
          {
            DB: env.DB,
            ALLOWED_ORIGIN: env.ALLOWED_ORIGIN,
            OPENAI_API_KEY: env.OPENAI_API_KEY || "",
            OPENAI_MODEL: env.OPENAI_MODEL || "gpt-4.1-mini",
            ASK_SHIRLEY_RATE_MAX: env.ASK_SHIRLEY_RATE_MAX,
          },
          json,
        );
      }

      if (!(await allowRequest(env, request, { prefix: "rl", max: 12, windowMs: 60_000 }))) {
        return json({ ok: false }, 429, origin, allowed);
      }

      if (url.pathname === "/view" && request.method === "POST") {
        await handleView(env);
        return json({ ok: true }, 200, origin, allowed);
      }

      return json({ ok: false }, 404, origin, allowed);
    } catch {
      console.error("worker_error");
      return json({ ok: false }, 500, origin, allowed);
    }
  },
};
