/**
 * Owner content CMS routes: uploads, drafts, publish, media, public reads.
 */

import { resolveIdentity } from "../lib/auth";
import { allowRequest } from "../lib/rateLimit";
import {
  createDraft,
  getDraft,
  listChanges,
  listDrafts,
  getChange,
  markChangeReverted,
  parseProposed,
  updateDraft,
  recordChange,
} from "../content/drafts";
import {
  createUploadSession,
  getUploadObject,
  listSessionUploads,
  storeUploadObject,
  type MediaBucket,
} from "../content/uploads";
import {
  createArtworkFromDraft,
  createDream,
  createPhotoCollectionFromDraft,
  listOwnerArtworks,
  listPublishedArtworks,
  listPublishedCollections,
  proposeAtlasChanges,
  reorderArtworks,
  setArtworkStatus,
} from "../content/entities";

export type ContentEnv = {
  DB: D1Database;
  ALLOWED_ORIGIN: string;
  PRIVATE_MEDIA?: R2Bucket;
  PUBLIC_MEDIA?: R2Bucket;
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

async function requireOwner(env: ContentEnv, request: Request, json: JsonFn): Promise<OwnerGate> {
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

export async function handleContentRoutes(
  request: Request,
  env: ContentEnv,
  json: JsonFn,
  pathname: string,
): Promise<Response | null> {
  const origin = request.headers.get("Origin");
  const allowed = env.ALLOWED_ORIGIN;

  // Public published content (no private fields)
  if (pathname === "/api/content/artworks" && request.method === "GET") {
    const items = await listPublishedArtworks(env.DB);
    return json({ items }, 200, origin, allowed);
  }
  if (pathname === "/api/content/photo-collections" && request.method === "GET") {
    const items = await listPublishedCollections(env.DB);
    return json({ items }, 200, origin, allowed);
  }

  // Public media streaming from R2
  if (pathname.startsWith("/api/media/public/") && request.method === "GET") {
    if (!env.PUBLIC_MEDIA) return json({ error: "media_unavailable" }, 503, origin, allowed);
    const key = decodeURIComponent(pathname.replace("/api/media/public/", ""));
    if (!key.startsWith("public/") || key.includes("..")) {
      return json({ error: "forbidden" }, 403, origin, allowed);
    }
    const obj = await env.PUBLIC_MEDIA.get(key);
    if (!obj) return json({ error: "not_found" }, 404, origin, allowed);
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("Cache-Control", "public, max-age=86400");
    return new Response(obj.body, { status: 200, headers });
  }

  if (!pathname.startsWith("/api/owner/")) return null;

  // Owner media peek (private)
  if (pathname.startsWith("/api/owner/media/") && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    if (!env.PRIVATE_MEDIA) return json({ error: "r2_unavailable" }, 503, origin, allowed);
    const fileId = pathname.replace("/api/owner/media/", "");
    const upload = await getUploadObject(env.DB, gate.identity.userId!, fileId);
    if (!upload) return json({ error: "not_found" }, 404, origin, allowed);
    const obj = await env.PRIVATE_MEDIA.get(upload.storage_key);
    if (!obj) return json({ error: "not_found" }, 404, origin, allowed);
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("Cache-Control", "private, max-age=60");
    return new Response(obj.body, { status: 200, headers });
  }

  if (pathname === "/api/owner/uploads/session" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    if (!(await allowRequest(env, request, { prefix: "upl", max: 30, windowMs: 60_000 }))) {
      return json({ error: "rate_limit" }, 429, origin, allowed);
    }
    let body: { conversationId?: string } = {};
    try {
      body = (await request.json()) as { conversationId?: string };
    } catch {
      /* empty */
    }
    const session = await createUploadSession(
      env.DB,
      gate.identity.userId!,
      body.conversationId ?? null,
    );
    return json({ ok: true, ...session }, 200, origin, allowed, {
      "Cache-Control": "no-store",
    });
  }

  if (pathname === "/api/owner/uploads" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    if (!(await allowRequest(env, request, { prefix: "uplfile", max: 40, windowMs: 60_000 }))) {
      return json({ error: "rate_limit" }, 429, origin, allowed);
    }
    const ct = request.headers.get("content-type") || "";
    if (!ct.includes("multipart/form-data")) {
      return json({ error: "expected_multipart" }, 400, origin, allowed);
    }
    const form = await request.formData();
    const sessionId = String(form.get("sessionId") || "");
    const file = form.get("file");
    const isUploadBlob =
      typeof file === "object" &&
      file !== null &&
      typeof (file as { arrayBuffer?: unknown }).arrayBuffer === "function";
    if (!sessionId || !isUploadBlob) {
      return json({ error: "invalid_form" }, 400, origin, allowed);
    }
    try {
      const blob = file as {
        arrayBuffer: () => Promise<ArrayBuffer>;
        type?: string;
        name?: string;
      };
      const buf = new Uint8Array(await blob.arrayBuffer());
      const filename =
        typeof blob.name === "string" && blob.name.trim()
          ? blob.name
          : "upload.bin";
      const stored = await storeUploadObject({
        db: env.DB,
        privateBucket: env.PRIVATE_MEDIA as MediaBucket | undefined,
        ownerId: gate.identity.userId!,
        sessionId,
        filename,
        bytes: buf,
        claimedMime: blob.type || null,
        caption: form.get("caption") ? String(form.get("caption")) : null,
        displayOrder: form.get("displayOrder")
          ? Number(form.get("displayOrder"))
          : 0,
      });
      return json({ ok: true, file: stored }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    } catch (err) {
      const code = err instanceof Error ? err.message : "upload_failed";
      return json({ error: code }, 400, origin, allowed);
    }
  }

  if (pathname.startsWith("/api/owner/uploads/session/") && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const sessionId = pathname.replace("/api/owner/uploads/session/", "");
    const files = await listSessionUploads(env.DB, gate.identity.userId!, sessionId);
    return json({ files }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }

  if (pathname === "/api/owner/drafts" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const drafts = await listDrafts(env.DB, gate.identity.userId!);
    return json({
      drafts: drafts.map((d) => ({
        ...d,
        proposed: parseProposed(d),
      })),
    }, 200, origin, allowed, { "Cache-Control": "no-store" });
  }

  if (pathname === "/api/owner/drafts" && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const body = (await request.json()) as {
      contentType: "artwork" | "photo_collection" | "dream" | "atlas_change";
      operationType: string;
      proposedData: unknown;
      targetContentId?: string;
      conversationId?: string;
    };
    const draft = await createDraft(env.DB, {
      ownerId: gate.identity.userId!,
      contentType: body.contentType,
      operationType: body.operationType || "create",
      proposedData: body.proposedData,
      targetContentId: body.targetContentId,
      conversationId: body.conversationId,
    });
    await updateDraft(env.DB, gate.identity.userId!, draft.id, {
      validationStatus: "valid",
      previewStatus: "ready",
    });
    return json({ ok: true, draft }, 200, origin, allowed, {
      "Cache-Control": "no-store",
    });
  }

  const draftMatch = pathname.match(/^\/api\/owner\/drafts\/([^/]+)(?:\/(publish|discard|preview))?$/);
  if (draftMatch) {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const draftId = draftMatch[1]!;
    const action = draftMatch[2];

    if (request.method === "GET" && !action) {
      const draft = await getDraft(env.DB, gate.identity.userId!, draftId);
      if (!draft) return json({ error: "not_found" }, 404, origin, allowed);
      return json({ draft: { ...draft, proposed: parseProposed(draft) } }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }

    if (request.method === "POST" && action === "discard") {
      await updateDraft(env.DB, gate.identity.userId!, draftId, { status: "discarded" });
      return json({ ok: true }, 200, origin, allowed);
    }

    if (request.method === "POST" && action === "preview") {
      const draft = await getDraft(env.DB, gate.identity.userId!, draftId);
      if (!draft) return json({ error: "not_found" }, 404, origin, allowed);
      await updateDraft(env.DB, gate.identity.userId!, draftId, { previewStatus: "ready" });
      return json(
        {
          ok: true,
          preview: {
            contentType: draft.content_type,
            operation: draft.operation_type,
            proposed: parseProposed(draft),
          },
        },
        200,
        origin,
        allowed,
        { "Cache-Control": "no-store" },
      );
    }

    if (request.method === "POST" && action === "publish") {
      const draft = await getDraft(env.DB, gate.identity.userId!, draftId);
      if (!draft || draft.status !== "open") {
        return json({ error: "draft_unavailable" }, 400, origin, allowed);
      }
      const proposed = parseProposed<Record<string, unknown>>(draft);
      const confirm = (await request.json().catch(() => ({}))) as { confirm?: boolean };
      if (!confirm.confirm) {
        return json(
          { error: "confirmation_required", message: "Pass { confirm: true } to publish." },
          400,
          origin,
          allowed,
        );
      }

      let result: unknown = null;
      try {
        if (draft.content_type === "artwork" && draft.operation_type === "create") {
          result = await createArtworkFromDraft(
            env.DB,
            gate.identity.userId!,
            {
              title: String(proposed.title || "Untitled"),
              description: (proposed.description as string) || null,
              medium: (proposed.medium as string) || null,
              dimensions: (proposed.dimensions as string) || null,
              completedAt: (proposed.completedAt as string) || null,
              year: typeof proposed.year === "number" ? proposed.year : null,
              section: (proposed.section as string) || "Recent Work",
              tags: Array.isArray(proposed.tags) ? (proposed.tags as string[]) : [],
              altText: (proposed.altText as string) || null,
              uploadObjectIds: Array.isArray(proposed.uploadObjectIds)
                ? (proposed.uploadObjectIds as string[])
                : [],
              displayOrder: typeof proposed.displayOrder === "number" ? proposed.displayOrder : 0,
              status: "published",
            },
            {
              conversationId: draft.source_conversation_id,
              draftId: draft.id,
              privateBucket: env.PRIVATE_MEDIA,
              publicBucket: env.PUBLIC_MEDIA,
            },
          );
        } else if (draft.content_type === "photo_collection" && draft.operation_type === "create") {
          result = await createPhotoCollectionFromDraft(
            env.DB,
            gate.identity.userId!,
            {
              title: String(proposed.title || "Untitled collection"),
              description: (proposed.description as string) || null,
              capturedAt: (proposed.capturedAt as string) || null,
              locationLabel: (proposed.locationLabel as string) || null,
              uploadObjectIds: Array.isArray(proposed.uploadObjectIds)
                ? (proposed.uploadObjectIds as string[])
                : [],
              coverUploadObjectId: (proposed.coverUploadObjectId as string) || null,
              status: "published",
            },
            {
              conversationId: draft.source_conversation_id,
              draftId: draft.id,
              privateBucket: env.PRIVATE_MEDIA,
              publicBucket: env.PUBLIC_MEDIA,
            },
          );
        } else if (draft.content_type === "dream") {
          result = await createDream(
            env.DB,
            gate.identity.userId!,
            {
              rawPrivateText: String(proposed.rawPrivateText || proposed.text || ""),
              title: (proposed.title as string) || null,
              dreamDate: (proposed.dreamDate as string) || null,
              ownerNotes: (proposed.ownerNotes as string) || null,
              publicExcerpt: (proposed.publicExcerpt as string) || null,
              visibility:
                (proposed.visibility as
                  | "full_private"
                  | "private_with_public_excerpt"
                  | "fully_public") || "full_private",
            },
            { conversationId: draft.source_conversation_id, draftId: draft.id },
          );
        } else {
          return json({ error: "unsupported_publish" }, 400, origin, allowed);
        }
      } catch (err) {
        const code = err instanceof Error ? err.message : "publish_failed";
        return json({ error: code }, 500, origin, allowed);
      }

      await updateDraft(env.DB, gate.identity.userId!, draftId, { status: "published" });
      return json({ ok: true, result }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    }
  }

  if (pathname === "/api/owner/artworks" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    return json(
      { items: await listOwnerArtworks(env.DB, gate.identity.userId!) },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }

  if (pathname === "/api/owner/content-changes" && request.method === "GET") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    return json(
      { changes: await listChanges(env.DB, gate.identity.userId!) },
      200,
      origin,
      allowed,
      { "Cache-Control": "no-store" },
    );
  }

  const rollbackMatch = pathname.match(/^\/api\/owner\/content-changes\/([^/]+)\/rollback$/);
  if (rollbackMatch && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const body = (await request.json().catch(() => ({}))) as { confirm?: boolean };
    if (!body.confirm) {
      return json({ error: "confirmation_required" }, 400, origin, allowed);
    }
    const changeId = rollbackMatch[1]!;
    const change = await getChange(env.DB, gate.identity.userId!, changeId);
    if (!change || !change.before_snapshot) {
      return json({ error: "not_revertable" }, 400, origin, allowed);
    }
    const before = JSON.parse(change.before_snapshot) as unknown;
    // Minimal rollback: artwork status / reorder snapshots
    if (change.content_type === "artwork" && change.operation.startsWith("status_") && change.content_id) {
      const prev = before as { status?: string };
      if (prev.status) {
        await setArtworkStatus(
          env.DB,
          gate.identity.userId!,
          change.content_id,
          prev.status as "draft" | "published" | "hidden" | "archived",
        );
      }
    } else if (change.content_type === "artwork" && change.operation === "reorder") {
      const prev = before as Array<{ id: string }>;
      if (Array.isArray(prev)) {
        await reorderArtworks(
          env.DB,
          gate.identity.userId!,
          prev.map((p) => p.id),
        );
      }
    } else {
      return json({ error: "rollback_unsupported" }, 400, origin, allowed);
    }
    await markChangeReverted(env.DB, gate.identity.userId!, changeId);
    await recordChange(env.DB, {
      ownerId: gate.identity.userId!,
      contentType: change.content_type,
      contentId: change.content_id,
      operation: "rollback",
      before: change.after_snapshot ? JSON.parse(change.after_snapshot) : null,
      after: before,
    });
    return json({ ok: true }, 200, origin, allowed);
  }

  if (pathname.match(/^\/api\/owner\/dreams\/[^/]+\/atlas-preview$/) && request.method === "POST") {
    const gate = await requireOwner(env, request, json);
    if (!gate.ok) return gate.response;
    const dreamId = pathname.split("/")[4]!;
    try {
      const proposal = await proposeAtlasChanges(env.DB, gate.identity.userId!, dreamId);
      return json({ ok: true, ...proposal }, 200, origin, allowed, {
        "Cache-Control": "no-store",
      });
    } catch {
      return json({ error: "dream_not_found" }, 404, origin, allowed);
    }
  }

  return null;
}
