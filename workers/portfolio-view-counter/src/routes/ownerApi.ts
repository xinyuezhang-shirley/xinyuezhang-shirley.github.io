/**
 * Owner auth + private resource routes.
 * Every handler re-validates the session from the HttpOnly cookie.
 */

import {
  authenticateOwner,
  logoutOwner,
  resolveIdentity,
  revokeAllOwnerSessions,
  type TrustedIdentity,
} from "../lib/auth";
import * as memories from "../owner/memories";
import * as notes from "../owner/notes";
import * as conversations from "../owner/conversations";
import {
  activatePersonaVersion,
  clearPersonaLearning,
  createPersonaVersion,
  listPersonaObservations,
  listPersonaVersions,
  updatePersonaObservation,
} from "../owner/persona";
import { allowRequest } from "../lib/rateLimit";

export type OwnerApiEnv = {
  DB: D1Database;
  ALLOWED_ORIGIN: string;
  OWNER_PASSWORD_HASH?: string;
};

type JsonFn = (
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
  extraHeaders?: HeadersInit,
) => Response;

async function requireOwner(
  env: OwnerApiEnv,
  request: Request,
  json: JsonFn,
): Promise<{ identity: TrustedIdentity } | Response> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;
  const identity = await resolveIdentity(env, request);
  if (identity.role !== "owner" || !identity.userId) {
    return json(
      { error: "Owner session required.", code: "unauthorized" },
      401,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }
  return { identity };
}

export async function handleOwnerAuthRoutes(
  request: Request,
  env: OwnerApiEnv,
  json: JsonFn,
  pathname: string,
): Promise<Response | null> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  if (pathname === "/api/auth/session" && request.method === "GET") {
    const identity = await resolveIdentity(env, request);
    return json(
      {
        role: identity.role,
        userId: identity.role === "owner" ? identity.username : null,
        ownerMode: identity.role === "owner",
      },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    const { clearCookie } = await logoutOwner(env, request);
    return json(
      { ok: true, ownerMode: false },
      200,
      origin,
      allowed,
      { "Set-Cookie": clearCookie, "Cache-Control": "no-store" },
    );
  }

  if (pathname === "/api/auth/owner" && request.method === "POST") {
    if (!(await allowRequest(env, request, { prefix: "owner_auth_api", max: 10, windowMs: 60_000 }))) {
      return json({ error: "Too many requests.", code: "rate_limit" }, 429, origin, allowed);
    }
    let body: { credential?: unknown } = {};
    try {
      body = (await request.json()) as { credential?: unknown };
    } catch {
      return json({ error: "Invalid JSON.", code: "invalid_json" }, 400, origin, allowed);
    }
    if (typeof body.credential !== "string" || !body.credential.trim()) {
      return json({ error: "Credential required.", code: "missing" }, 400, origin, allowed);
    }
    const auth = await authenticateOwner(env, request, body.credential);
    if (!auth.ok) {
      return json(
        {
          ok: false,
          ownerMode: false,
          code: auth.reason === "locked" ? "locked" : "invalid",
        },
        auth.reason === "locked" ? 429 : 401,
        origin,
        allowed,
        { "Cache-Control": "no-store" },
      );
    }
    return json(
      { ok: true, ownerMode: true, role: "owner", userId: "shirley" },
      200,
      origin,
      allowed,
      { "Set-Cookie": auth.setCookie, "Cache-Control": "no-store" },
    );
  }

  return null;
}

export async function handleOwnerDataRoutes(
  request: Request,
  env: OwnerApiEnv,
  json: JsonFn,
  pathname: string,
): Promise<Response | null> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  const privatePrefixes = [
    "/api/memories",
    "/api/notes",
    "/api/conversations",
    "/api/persona",
  ];
  if (!privatePrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  const gate = await requireOwner(env, request, json);
  if (gate instanceof Response) return gate;
  const userId = gate.identity.userId!;

  // --- Memories ---
  if (pathname === "/api/memories" && request.method === "GET") {
    const rows = await memories.listMemories(env.DB, userId, { limit: 100 });
    return json({ memories: rows }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/memories" && request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      content?: string;
      category?: string;
      importance?: number;
    };
    if (!body.content?.trim()) {
      return json({ error: "content required" }, 400, origin, allowed);
    }
    const row = await memories.createMemory(env.DB, userId, {
      content: body.content,
      category: body.category,
      importance: body.importance,
    });
    return json({ memory: row }, 201, origin, allowed, { "Cache-Control": "no-store" });
  }
  const memMatch = pathname.match(/^\/api\/memories\/([^/]+)$/);
  if (memMatch) {
    const id = memMatch[1]!;
    if (request.method === "PATCH") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const row = await memories.updateMemory(env.DB, userId, id, {
        content: typeof body.content === "string" ? body.content : undefined,
        category: typeof body.category === "string" ? body.category : undefined,
        importance: typeof body.importance === "number" ? body.importance : undefined,
        archived: typeof body.archived === "boolean" ? body.archived : undefined,
      });
      if (!row) return json({ error: "Not found" }, 404, origin, allowed);
      return json({ memory: row }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }
    if (request.method === "DELETE") {
      const ok = await memories.deleteMemory(env.DB, userId, id);
      if (!ok) return json({ error: "Not found" }, 404, origin, allowed);
      return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }
  }

  // --- Notes ---
  if (pathname === "/api/notes" && request.method === "GET") {
    const rows = await notes.listNotes(env.DB, userId, { limit: 100 });
    return json(
      {
        notes: rows.map((n) => ({
          ...n,
          tags: notes.parseTags(n.tags),
        })),
      },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }
  if (pathname === "/api/notes" && request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      title?: string;
      body?: string;
      tags?: string[];
    };
    if (!body.title?.trim() || typeof body.body !== "string") {
      return json({ error: "title and body required" }, 400, origin, allowed);
    }
    const row = await notes.createNote(env.DB, userId, {
      title: body.title,
      body: body.body,
      tags: body.tags,
    });
    return json({ note: row }, 201, origin, allowed, { "Cache-Control": "no-store" });
  }
  const noteMatch = pathname.match(/^\/api\/notes\/([^/]+)$/);
  if (noteMatch) {
    const id = noteMatch[1]!;
    if (request.method === "PATCH") {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      const row = await notes.updateNote(env.DB, userId, id, {
        title: typeof body.title === "string" ? body.title : undefined,
        body: typeof body.body === "string" ? body.body : undefined,
        appendBody: typeof body.appendBody === "string" ? body.appendBody : undefined,
        tags: Array.isArray(body.tags) ? (body.tags as string[]) : undefined,
        archived: typeof body.archived === "boolean" ? body.archived : undefined,
      });
      if (!row) return json({ error: "Not found" }, 404, origin, allowed);
      return json({ note: row }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }
    if (request.method === "DELETE") {
      const ok = await notes.deleteNote(env.DB, userId, id);
      if (!ok) return json({ error: "Not found" }, 404, origin, allowed);
      return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }
  }

  // --- Conversations ---
  if (pathname === "/api/conversations" && request.method === "GET") {
    const rows = await conversations.listOwnerConversations(env.DB, userId);
    return json({ conversations: rows }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  const convMatch = pathname.match(/^\/api\/conversations\/([^/]+)$/);
  if (convMatch) {
    const id = convMatch[1]!;
    if (request.method === "GET") {
      const conv = await conversations.getConversationForOwner(env.DB, userId, id);
      if (!conv) return json({ error: "Not found" }, 404, origin, allowed);
      const msgs = await conversations.listMessages(env.DB, id);
      return json({ conversation: conv, messages: msgs }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }
    if (request.method === "DELETE") {
      const ok = await conversations.deleteOwnerConversation(env.DB, userId, id);
      if (!ok) return json({ error: "Not found" }, 404, origin, allowed);
      return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }
  }

  // --- Persona ---
  if (pathname === "/api/persona/observations" && request.method === "GET") {
    const rows = await listPersonaObservations(env.DB, userId);
    return json({ observations: rows }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  const obsMatch = pathname.match(/^\/api\/persona\/observations\/([^/]+)$/);
  if (obsMatch && request.method === "PATCH") {
    const body = (await request.json().catch(() => ({}))) as {
      status?: "candidate" | "approved" | "rejected" | "archived";
      observation?: string;
    };
    const row = await updatePersonaObservation(env.DB, userId, obsMatch[1]!, body);
    if (!row) return json({ error: "Not found" }, 404, origin, allowed);
    return json({ observation: row }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/persona/versions" && request.method === "GET") {
    const rows = await listPersonaVersions(env.DB, userId);
    return json({ versions: rows }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/persona/versions" && request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      profile?: Record<string, unknown>;
      changeSummary?: string;
      sourceObservationIds?: string[];
      activate?: boolean;
    };
    if (!body.profile || typeof body.profile !== "object") {
      return json({ error: "profile required" }, 400, origin, allowed);
    }
    const row = await createPersonaVersion(env.DB, userId, {
      profile: body.profile,
      changeSummary: body.changeSummary,
      sourceObservationIds: body.sourceObservationIds,
      activate: body.activate === true,
    });
    return json({ version: row }, 201, origin, allowed, { "Cache-Control": "no-store" });
  }
  const verAct = pathname.match(/^\/api\/persona\/versions\/([^/]+)\/activate$/);
  if (verAct && request.method === "POST") {
    const ok = await activatePersonaVersion(env.DB, userId, verAct[1]!);
    if (!ok) return json({ error: "Not found" }, 404, origin, allowed);
    return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/persona/clear" && request.method === "POST") {
    await clearPersonaLearning(env.DB, userId);
    return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/sessions/revoke-all" && request.method === "POST") {
    const n = await revokeAllOwnerSessions(env, userId);
    return json({ revoked: n }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }
  if (pathname === "/api/export" && request.method === "GET") {
    const [mems, nts, convs, obs] = await Promise.all([
      memories.listMemories(env.DB, userId, { includeArchived: true, limit: 100 }),
      notes.listNotes(env.DB, userId, { includeArchived: true, limit: 100 }),
      conversations.listOwnerConversations(env.DB, userId, 50),
      listPersonaObservations(env.DB, userId, { limit: 100 }),
    ]);
    return json(
      { exportedAt: Date.now(), memories: mems, notes: nts, conversations: convs, observations: obs },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }

  return json({ error: "Not found" }, 404, origin, allowed);
}
