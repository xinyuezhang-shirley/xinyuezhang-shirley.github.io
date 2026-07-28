/**
 * Thoughts + Writing HTTP routes.
 */

import { resolveIdentity } from "../lib/auth";
import { allowRequest } from "../lib/rateLimit";
import {
  createThought,
  deleteThought,
  listOwnerThoughts,
  recordEncounter,
  resurfaceThought,
  selectPublicThoughts,
  updateThought,
  connectThoughts,
  getThoughtTags,
  type ThoughtType,
  type ThoughtVisibility,
} from "./thoughts";
import {
  archiveWriting,
  createAnnotation,
  createWriting,
  getOwnerOriginTrail,
  getPublicOriginTrail,
  getWriting,
  getWritingBySlug,
  linkThoughtToWriting,
  listAnnotations,
  listOwnerWriting,
  listPublicWriting,
  listVersions,
  publishWriting,
  rollbackWriting,
  toPublicWriting,
  unpublishWriting,
  updateWriting,
} from "./writing";

export type ArchiveEnv = {
  DB: D1Database;
  ALLOWED_ORIGIN: string;
};

type JsonFn = (
  body: unknown,
  status: number,
  origin: string | null,
  allowed: string,
  extraHeaders?: HeadersInit,
) => Response;

type OwnerGate =
  | { ok: true; identity: Awaited<ReturnType<typeof resolveIdentity>> }
  | { ok: false; response: Response };

async function requireOwner(
  env: ArchiveEnv,
  request: Request,
  json: JsonFn,
): Promise<OwnerGate> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;
  const identity = await resolveIdentity(env, request);
  if (identity.role !== "owner" || !identity.userId) {
    return {
      ok: false,
      response: json(
        { error: "Owner session required.", code: "unauthorized" },
        401,
        origin,
        allowed,
        { "Cache-Control": "no-store" },
      ),
    };
  }
  return { ok: true, identity };
}

export async function handleArchiveRoutes(
  request: Request,
  env: ArchiveEnv,
  json: JsonFn,
  pathname: string,
): Promise<Response | null> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;
  const url = new URL(request.url);

  // —— Public thoughts ——
  if (pathname === "/api/thoughts/public" && request.method === "GET") {
    const limit = Number(url.searchParams.get("limit") || "5");
    const context = url.searchParams.get("context");
    const exclude = (url.searchParams.get("exclude") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 80);
    const items = await selectPublicThoughts(env.DB, {
      limit: Number.isFinite(limit) ? limit : 5,
      excludeIds: exclude,
      context,
    });
    return json({ items }, 200, origin, allowed, {
      "Cache-Control": "public, max-age=30",
    });
  }

  if (pathname === "/api/thoughts/encounter" && request.method === "POST") {
    if (!(await allowRequest(env, request, { prefix: "thenc", max: 60, windowMs: 60_000 }))) {
      return json({ error: "rate_limit" }, 429, origin, allowed);
    }
    let body: { id?: string } = {};
    try {
      body = (await request.json()) as { id?: string };
    } catch {
      return json({ error: "invalid_json" }, 400, origin, allowed);
    }
    if (!body.id) return json({ error: "id_required" }, 400, origin, allowed);
    const result = await recordEncounter(env.DB, body.id);
    return json(result, result.ok ? 200 : 404, origin, allowed);
  }

  // —— Public writing ——
  if (pathname === "/api/writing" && request.method === "GET") {
    const items = await listPublicWriting(env.DB);
    return json({ items }, 200, origin, allowed, {
      "Cache-Control": "public, max-age=60",
    });
  }

  const publicWritingMatch = pathname.match(/^\/api\/writing\/([^/]+)$/);
  if (publicWritingMatch && request.method === "GET") {
    const slug = decodeURIComponent(publicWritingMatch[1]!);
    const row = await getWritingBySlug(env.DB, slug, { publicOnly: true });
    if (!row) return json({ error: "not_found" }, 404, origin, allowed);
    const annotations = await listAnnotations(env.DB, row.id, { publicOnly: true });
    const originTrail = row.show_origin
      ? await getPublicOriginTrail(env.DB, row.id)
      : [];
    return json(
      {
        item: toPublicWriting(row, annotations),
        origin: originTrail,
      },
      200,
      origin,
      allowed,
      { "Cache-Control": "public, max-age=60" },
    );
  }

  if (!pathname.startsWith("/api/owner/")) return null;

  // —— Owner thoughts ——
  if (pathname === "/api/owner/thoughts" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const visibility = url.searchParams.get("visibility") || "all";
    const query = url.searchParams.get("q") || undefined;
    const items = await listOwnerThoughts(env.DB, gate.identity.userId!, {
      visibility,
      query,
      limit: Number(url.searchParams.get("limit") || "100"),
    });
    const withTags = [];
    for (const item of items.slice(0, 80)) {
      withTags.push({
        ...item,
        tags: await getThoughtTags(env.DB, item.id),
        display_text: item.edited_text || item.text,
      });
    }
    return json({ items: withTags }, 200, origin, allowed, {
      "Cache-Control": "no-store",
    });
  }

  if (pathname === "/api/owner/thoughts" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    if (!(await allowRequest(env, request, { prefix: "thcreate", max: 40, windowMs: 60_000 }))) {
      return json({ error: "rate_limit" }, 429, origin, allowed);
    }
    const body = (await request.json()) as {
      text?: string;
      title?: string;
      type?: ThoughtType;
      visibility?: ThoughtVisibility;
      tags?: string[];
      perVisitorOnce?: boolean;
      manualWeight?: number;
      pinned?: boolean;
      expiresAt?: number | null;
      maxPublicEncounters?: number | null;
      resurfaceAfterDays?: number | null;
      behavior?: Record<string, unknown>;
    };
    if (!body.text?.trim()) return json({ error: "text_required" }, 400, origin, allowed);
    const row = await createThought(env.DB, gate.identity.userId!, {
      text: body.text,
      title: body.title,
      type: body.type,
      visibility: body.visibility,
      tags: body.tags,
      perVisitorOnce: body.perVisitorOnce,
      manualWeight: body.manualWeight,
      pinned: body.pinned,
      expiresAt: body.expiresAt,
      maxPublicEncounters: body.maxPublicEncounters,
      resurfaceAfterDays: body.resurfaceAfterDays,
      behavior: body.behavior,
    });
    return json({ ok: true, thought: row }, 200, origin, allowed, {
      "Cache-Control": "no-store",
    });
  }

  const thoughtAction = pathname.match(
    /^\/api\/owner\/thoughts\/([^/]+)(?:\/(publish|private|passing|permanent|dormant|archive|resurface|delete))?$/,
  );
  if (thoughtAction) {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const thoughtId = decodeURIComponent(thoughtAction[1]!);
    const action = thoughtAction[2];

    if (request.method === "PATCH" && !action) {
      const body = (await request.json()) as Record<string, unknown>;
      try {
        const thought = await updateThought(env.DB, gate.identity.userId!, thoughtId, {
          text: typeof body.text === "string" ? body.text : undefined,
          title: body.title === null ? null : typeof body.title === "string" ? body.title : undefined,
          type: body.type as ThoughtType | undefined,
          visibility: body.visibility as ThoughtVisibility | undefined,
          tags: Array.isArray(body.tags) ? (body.tags as string[]) : undefined,
          perVisitorOnce:
            typeof body.perVisitorOnce === "boolean" ? body.perVisitorOnce : undefined,
          manualWeight:
            typeof body.manualWeight === "number" ? body.manualWeight : undefined,
          pinned: typeof body.pinned === "boolean" ? body.pinned : undefined,
          expiresAt:
            body.expiresAt === null
              ? null
              : typeof body.expiresAt === "number"
                ? body.expiresAt
                : undefined,
          maxPublicEncounters:
            body.maxPublicEncounters === null
              ? null
              : typeof body.maxPublicEncounters === "number"
                ? body.maxPublicEncounters
                : undefined,
          resurfaceAfterDays:
            body.resurfaceAfterDays === null
              ? null
              : typeof body.resurfaceAfterDays === "number"
                ? body.resurfaceAfterDays
                : undefined,
          behavior:
            body.behavior === null
              ? null
              : typeof body.behavior === "object"
                ? (body.behavior as Record<string, unknown>)
                : undefined,
        });
        return json({ ok: true, thought }, 200, origin, allowed, {
          "Cache-Control": "no-store",
        });
      } catch (err) {
        const code = err instanceof Error ? err.message : "update_failed";
        return json({ error: code }, 400, origin, allowed);
      }
    }

    if (request.method === "POST" && action === "delete") {
      const body = (await request.json().catch(() => ({}))) as { confirm?: boolean };
      if (!body.confirm) {
        return json({ error: "confirmation_required" }, 400, origin, allowed);
      }
      await deleteThought(env.DB, gate.identity.userId!, thoughtId);
      return json({ ok: true }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }

    if (request.method === "POST" && action) {
      const visMap: Record<string, ThoughtVisibility> = {
        private: "private",
        passing: "passing",
        permanent: "permanent",
        dormant: "dormant",
        archive: "archived",
        publish: "public",
      };
      try {
        if (action === "resurface") {
          const body = (await request.json().catch(() => ({}))) as {
            visibility?: ThoughtVisibility;
          };
          const thought = await resurfaceThought(
            env.DB,
            gate.identity.userId!,
            thoughtId,
            body.visibility || "passing",
          );
          return json({ ok: true, thought }, 200, origin, allowed, {
            "Cache-Control": "no-store",
          });
        }
        const visibility = visMap[action];
        if (!visibility) return json({ error: "unknown_action" }, 400, origin, allowed);
        const thought = await updateThought(env.DB, gate.identity.userId!, thoughtId, {
          visibility,
        });
        return json({ ok: true, thought }, 200, origin, allowed, {
          "Cache-Control": "no-store",
        });
      } catch (err) {
        const code = err instanceof Error ? err.message : "action_failed";
        return json({ error: code }, 400, origin, allowed);
      }
    }
  }

  if (pathname === "/api/owner/thought-relationships" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const body = (await request.json()) as {
      fromId?: string;
      toId?: string;
      relationshipType?: string;
    };
    if (!body.fromId || !body.toId || !body.relationshipType) {
      return json({ error: "invalid_body" }, 400, origin, allowed);
    }
    const link = await connectThoughts(
      env.DB,
      gate.identity.userId!,
      body.fromId,
      body.toId,
      body.relationshipType,
    );
    return json({ ok: true, link }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }

  // —— Owner writing ——
  if (pathname === "/api/owner/writing" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const status = url.searchParams.get("status") || "all";
    const items = await listOwnerWriting(env.DB, gate.identity.userId!, { status });
    return json({ items }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }

  if (pathname === "/api/owner/writing" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const body = (await request.json()) as {
      title?: string;
      subtitle?: string;
      type?: string;
      structuredContent?: unknown;
      thoughtIds?: string[];
    };
    const piece = await createWriting(env.DB, gate.identity.userId!, body);
    return json({ ok: true, writing: piece }, 200, origin, allowed, {
      "Cache-Control": "no-store",
    });
  }

  const writingMatch = pathname.match(
    /^\/api\/owner\/writing\/([^/]+)(?:\/(publish|unpublish|archive|versions|rollback|annotations|thoughts|origin))?$/,
  );
  if (writingMatch) {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const writingId = decodeURIComponent(writingMatch[1]!);
    const action = writingMatch[2];

    if (request.method === "GET" && !action) {
      const piece = await getWriting(env.DB, gate.identity.userId!, writingId);
      if (!piece) return json({ error: "not_found" }, 404, origin, allowed);
      const annotations = await listAnnotations(env.DB, writingId);
      const originTrail = await getOwnerOriginTrail(
        env.DB,
        gate.identity.userId!,
        writingId,
      );
      return json(
        {
          writing: {
            ...piece,
            structured_content: JSON.parse(piece.structured_content || "{}"),
          },
          annotations,
          origin: originTrail,
        },
        200,
        origin,
        allowed,
        { "Cache-Control": "no-store" },
      );
    }

    if (request.method === "PATCH" && !action) {
      const body = (await request.json()) as Record<string, unknown>;
      try {
        const writing = await updateWriting(env.DB, gate.identity.userId!, writingId, {
          title: typeof body.title === "string" ? body.title : undefined,
          subtitle:
            body.subtitle === null
              ? null
              : typeof body.subtitle === "string"
                ? body.subtitle
                : undefined,
          type: typeof body.type === "string" ? body.type : undefined,
          excerpt:
            body.excerpt === null
              ? null
              : typeof body.excerpt === "string"
                ? body.excerpt
                : undefined,
          structuredContent: body.structuredContent,
          showOrigin:
            typeof body.showOrigin === "boolean" ? body.showOrigin : undefined,
          coverImageId:
            body.coverImageId === null
              ? null
              : typeof body.coverImageId === "string"
                ? body.coverImageId
                : undefined,
          slug: typeof body.slug === "string" ? body.slug : undefined,
        });
        return json(
          {
            ok: true,
            writing: {
              ...writing,
              structured_content: JSON.parse(writing.structured_content || "{}"),
            },
          },
          200,
          origin,
          allowed,
          { "Cache-Control": "no-store" },
        );
      } catch (err) {
        const code = err instanceof Error ? err.message : "update_failed";
        return json({ error: code }, 400, origin, allowed);
      }
    }

    if (request.method === "POST" && action === "publish") {
      const body = (await request.json().catch(() => ({}))) as { confirm?: boolean };
      if (!body.confirm) {
        return json({ error: "confirmation_required" }, 400, origin, allowed);
      }
      try {
        const writing = await publishWriting(env.DB, gate.identity.userId!, writingId);
        return json({ ok: true, writing }, 200, origin, allowed, {
          "Cache-Control": "no-store",
        });
      } catch (err) {
        const code = err instanceof Error ? err.message : "publish_failed";
        return json({ error: code }, 400, origin, allowed);
      }
    }

    if (request.method === "POST" && action === "unpublish") {
      const writing = await unpublishWriting(env.DB, gate.identity.userId!, writingId);
      return json({ ok: true, writing }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "POST" && action === "archive") {
      const writing = await archiveWriting(env.DB, gate.identity.userId!, writingId);
      return json({ ok: true, writing }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "GET" && action === "versions") {
      const piece = await getWriting(env.DB, gate.identity.userId!, writingId);
      if (!piece) return json({ error: "not_found" }, 404, origin, allowed);
      const versions = await listVersions(env.DB, writingId);
      return json({ versions }, 200, origin, allowed, { "Cache-Control": "no-store" });
    }

    if (request.method === "POST" && action === "rollback") {
      const body = (await request.json()) as { versionId?: string; confirm?: boolean };
      if (!body.confirm || !body.versionId) {
        return json({ error: "confirmation_required" }, 400, origin, allowed);
      }
      const writing = await rollbackWriting(
        env.DB,
        gate.identity.userId!,
        writingId,
        body.versionId,
      );
      return json({ ok: true, writing }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "POST" && action === "annotations") {
      const body = (await request.json()) as {
        body?: string;
        blockId?: string;
        textAnchor?: string;
        visibility?: "private" | "public";
      };
      if (!body.body?.trim()) return json({ error: "body_required" }, 400, origin, allowed);
      const ann = await createAnnotation(env.DB, gate.identity.userId!, writingId, {
        body: body.body,
        blockId: body.blockId,
        textAnchor: body.textAnchor,
        visibility: body.visibility,
      });
      return json({ ok: true, annotation: ann }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "POST" && action === "thoughts") {
      // Tear out selected text as a thought
      const body = (await request.json()) as {
        text?: string;
        visibility?: ThoughtVisibility;
        relationshipType?: string;
      };
      if (!body.text?.trim()) return json({ error: "text_required" }, 400, origin, allowed);
      const thought = await createThought(env.DB, gate.identity.userId!, {
        text: body.text,
        type: "fragment",
        visibility: body.visibility || "private",
      });
      await linkThoughtToWriting(
        env.DB,
        gate.identity.userId!,
        thought.id,
        writingId,
        body.relationshipType || "derived_from",
      );
      return json({ ok: true, thought }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "GET" && action === "origin") {
      const originTrail = await getOwnerOriginTrail(
        env.DB,
        gate.identity.userId!,
        writingId,
      );
      return json({ origin: originTrail }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }
  }

  if (pathname === "/api/owner/thought-writing-links" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const body = (await request.json()) as {
      thoughtId?: string;
      writingId?: string;
      relationshipType?: string;
    };
    if (!body.thoughtId || !body.writingId) {
      return json({ error: "invalid_body" }, 400, origin, allowed);
    }
    const link = await linkThoughtToWriting(
      env.DB,
      gate.identity.userId!,
      body.thoughtId,
      body.writingId,
      body.relationshipType || "seed",
    );
    return json({ ok: true, link }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }

  // Export
  if (pathname === "/api/owner/archive/export" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const thoughts = await listOwnerThoughts(env.DB, gate.identity.userId!, {
      limit: 500,
    });
    const writing = await listOwnerWriting(env.DB, gate.identity.userId!, {
      limit: 200,
    });
    return json(
      {
        exportedAt: Date.now(),
        thoughts,
        writing: writing.map((w) => ({
          ...w,
          structured_content: JSON.parse(w.structured_content || "{}"),
        })),
      },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }

  return null;
}
