import { allowRequest } from "./lib/rateLimit";
import { corsHeaders, isOriginAllowed, jsonResponse } from "./lib/cors";
import { handleAskShirley } from "./routes/askShirley";
import { handleOwnerAuthRoutes, handleOwnerDataRoutes } from "./routes/ownerApi";
import { maybeSendThresholdEmail } from "./analytics/emailReport";
import {
  handleAnalyticsPublicRoutes,
  handleOwnerAnalyticsRoutes,
} from "./analytics/routes";
import { handleContentRoutes } from "./content/routes";

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
  ASK_SHIRLEY_DEBUG?: string;
  OWNER_PASSWORD_HASH?: string;
  SEARCH_API_KEY?: string;
  SEARCH_PROVIDER?: string;
  PRIVATE_MEDIA?: R2Bucket;
  PUBLIC_MEDIA?: R2Bucket;
}

type StatsRow = { total: number; last_notified: number };

function json(
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
  extraHeaders?: HeadersInit,
): Response {
  return jsonResponse(body, status, origin, allowed, extraHeaders);
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

async function handleView(request: Request, env: Env): Promise<void> {
  const ua = request.headers.get("User-Agent") || "";
  const isBot = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|wget|curl|python-requests/i.test(
    ua,
  );

  const incremented = await env.DB.prepare(
    "UPDATE visit_stats SET total = total + 1 WHERE id = 1 RETURNING total, last_notified",
  ).first<StatsRow>();

  if (!incremented) {
    throw new Error("visit_stats missing — run schema.sql");
  }

  if (isBot) return;

  await maybeSendThresholdEmail(env, incremented);
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

      // Public CMS reads + media may arrive without Origin (img tags / curl).
      if (
        url.pathname.startsWith("/api/media/public/") ||
        url.pathname === "/api/content/artworks" ||
        url.pathname === "/api/content/photo-collections"
      ) {
        const contentEarly = await handleContentRoutes(request, env, json, url.pathname);
        if (contentEarly) return contentEarly;
      }

      if (!isOriginAllowed(origin, allowed)) {
        return json({ ok: false }, 403, origin, allowed);
      }

      const ownerAuth = await handleOwnerAuthRoutes(request, env, json, url.pathname);
      if (ownerAuth) return ownerAuth;

      const ownerData = await handleOwnerDataRoutes(request, env, json, url.pathname);
      if (ownerData) return ownerData;

      const ownerAnalytics = await handleOwnerAnalyticsRoutes(
        request,
        env,
        json,
        url.pathname,
      );
      if (ownerAnalytics) return ownerAnalytics;

      const content = await handleContentRoutes(request, env, json, url.pathname);
      if (content) return content;

      const publicAnalytics = await handleAnalyticsPublicRoutes(
        request,
        env,
        json,
        url.pathname,
      );
      if (publicAnalytics) return publicAnalytics;

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
            ASK_SHIRLEY_DEBUG: env.ASK_SHIRLEY_DEBUG,
            OWNER_PASSWORD_HASH: env.OWNER_PASSWORD_HASH,
            SEARCH_API_KEY: env.SEARCH_API_KEY,
            SEARCH_PROVIDER: env.SEARCH_PROVIDER,
            PRIVATE_MEDIA: env.PRIVATE_MEDIA,
            PUBLIC_MEDIA: env.PUBLIC_MEDIA,
          },
          json,
        );
      }

      if (!(await allowRequest(env, request, { prefix: "rl", max: 12, windowMs: 60_000 }))) {
        return json({ ok: false }, 429, origin, allowed);
      }

      if (url.pathname === "/event" && request.method === "POST") {
        await handleEvent(request, env);
        return json({ ok: true }, 200, origin, allowed);
      }

      if (url.pathname === "/view" && request.method === "POST") {
        await handleView(request, env);
        return json({ ok: true }, 200, origin, allowed);
      }

      return json({ ok: false }, 404, origin, allowed);
    } catch {
      console.error("worker_error");
      return json({ ok: false }, 500, origin, allowed);
    }
  },
};
