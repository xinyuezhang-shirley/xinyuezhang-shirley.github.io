export interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  EMAIL_TO: string;
  EMAIL_FROM: string;
  ALLOWED_ORIGIN: string;
  ALLOW_DEV_RESET?: string;
  DEV_RESET_SECRET?: string;
}

const RATE_LIMIT_MAX = 12;
const RATE_WINDOW_MS = 60_000;

type StatsRow = { total: number; last_notified: number };

function corsHeaders(origin: string | null, allowed: string): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Dev-Reset-Secret",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin && origin === allowed) {
    headers["Access-Control-Allow-Origin"] = allowed;
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

async function hashBucket(request: Request): Promise<string> {
  // Hash CF-Connecting-IP for rate limiting without storing or logging the raw IP.
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const data = new TextEncoder().encode(`rl:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  let hex = "";
  for (let i = 0; i < 16; i++) hex += bytes[i]!.toString(16).padStart(2, "0");
  return hex;
}

async function allowRequest(env: Env, request: Request): Promise<boolean> {
  const bucket = await hashBucket(request);
  const now = Date.now();
  const row = await env.DB.prepare(
    "SELECT hits, window_start FROM rate_limits WHERE bucket = ?",
  )
    .bind(bucket)
    .first<{ hits: number; window_start: number }>();

  if (!row || now - row.window_start >= RATE_WINDOW_MS) {
    await env.DB.prepare(
      "INSERT INTO rate_limits (bucket, hits, window_start) VALUES (?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET hits = 1, window_start = excluded.window_start",
    )
      .bind(bucket, now)
      .run();
    return true;
  }

  if (row.hits >= RATE_LIMIT_MAX) {
    return false;
  }

  await env.DB.prepare("UPDATE rate_limits SET hits = hits + 1 WHERE bucket = ?")
    .bind(bucket)
    .run();
  return true;
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

async function handleEvent(request: Request, env: Env): Promise<void> {
  let body: { event?: unknown; type?: unknown } = {};
  try {
    body = (await request.json()) as { event?: unknown; type?: unknown };
  } catch {
    return;
  }

  if (body.event !== "contact_reveal") return;
  if (body.type !== "email" && body.type !== "phone") return;

  // Best-effort store — never fail the request if the table is missing.
  try {
    await env.DB.prepare(
      "INSERT INTO events (event, type, created_at) VALUES (?, ?, ?)",
    )
      .bind("contact_reveal", body.type, Date.now())
      .run();
  } catch {
    console.error("event_store_failed");
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

  // Claim this threshold atomically so concurrent requests send only one email.
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
    // Do not permanently mark the threshold if delivery failed.
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

  // Dev-only response may include totals for local testing.
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
      if (origin !== allowed) {
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

      if (!origin || origin !== allowed) {
        return json({ ok: false }, 403, origin, allowed);
      }

      if (!(await allowRequest(env, request))) {
        return json({ ok: false }, 429, origin, allowed);
      }

      if (url.pathname === "/event" && request.method === "POST") {
        await handleEvent(request, env);
        return json({ ok: true }, 200, origin, allowed);
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
