/**
 * Owner Studio / conversational CMS client helpers.
 */

import { askShirleyEndpointBase } from "@/lib/askShirleyOwnerApi";

async function studioFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const res = await fetch(`${base}${path}`, {
    ...init,
    mode: "cors",
    credentials: "include",
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `http_${res.status}`);
  }
  return (await res.json()) as T;
}

export async function createUploadSession(conversationId?: string | null) {
  return studioFetch<{ ok: boolean; id: string; expiresAt: number }>(
    "/api/owner/uploads/session",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: conversationId ?? null }),
    },
  );
}

export async function uploadStudioFile(args: {
  sessionId: string;
  file: File;
  caption?: string;
  displayOrder?: number;
}) {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const form = new FormData();
  form.set("sessionId", args.sessionId);
  form.set("file", args.file);
  if (args.caption) form.set("caption", args.caption);
  if (typeof args.displayOrder === "number") {
    form.set("displayOrder", String(args.displayOrder));
  }
  const res = await fetch(`${base}/api/owner/uploads`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `upload_${res.status}`);
  }
  return (await res.json()) as {
    ok: boolean;
    file: { id: string; mimeType: string; byteSize: number; width: number | null; height: number | null };
  };
}

export async function listStudioDrafts() {
  return studioFetch<{
    drafts: Array<{
      id: string;
      content_type: string;
      operation_type: string;
      status: string;
      proposed: Record<string, unknown>;
      updated_at: number;
    }>;
  }>("/api/owner/drafts");
}

export async function publishStudioDraft(draftId: string) {
  return studioFetch<{ ok: boolean; result: unknown }>(
    `/api/owner/drafts/${encodeURIComponent(draftId)}/publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirm: true }),
    },
  );
}

export async function discardStudioDraft(draftId: string) {
  return studioFetch<{ ok: boolean }>(
    `/api/owner/drafts/${encodeURIComponent(draftId)}/discard`,
    { method: "POST" },
  );
}

export async function listStudioChanges() {
  return studioFetch<{
    changes: Array<{
      id: string;
      content_type: string;
      operation: string;
      status: string;
      created_at: number;
    }>;
  }>("/api/owner/content-changes");
}

export async function fetchPublishedArtworks() {
  const base = askShirleyEndpointBase();
  if (!base) return { items: [] as PublishedArtwork[] };
  try {
    const res = await fetch(`${base}/api/content/artworks`, { mode: "cors" });
    if (!res.ok) return { items: [] as PublishedArtwork[] };
    const data = (await res.json()) as { items: PublishedArtwork[] };
    return {
      items: (data.items || []).map((item) => ({
        ...item,
        image_url: resolveStudioMediaUrl(item.image_url),
      })),
    };
  } catch {
    return { items: [] as PublishedArtwork[] };
  }
}

export async function fetchPublishedPhotoCollections() {
  const base = askShirleyEndpointBase();
  if (!base) return { items: [] as PublishedPhotoCollection[] };
  try {
    const res = await fetch(`${base}/api/content/photo-collections`, {
      mode: "cors",
    });
    if (!res.ok) return { items: [] as PublishedPhotoCollection[] };
    const data = (await res.json()) as { items: PublishedPhotoCollection[] };
    return {
      items: (data.items || []).map((col) => ({
        ...col,
        photos: (col.photos || []).map((p) => ({
          ...p,
          optimized_url: resolveStudioMediaUrl(p.optimized_url),
          thumbnail_url: resolveStudioMediaUrl(p.thumbnail_url),
        })),
      })),
    };
  } catch {
    return { items: [] as PublishedPhotoCollection[] };
  }
}

/** Resolve Worker-relative media paths against the Ask Shirley API host. */
export function resolveStudioMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = askShirleyEndpointBase();
  if (!base) return path;
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`;
}

export type PublishedArtwork = {
  id: string;
  slug: string;
  title: string;
  medium?: string | null;
  description?: string | null;
  year?: number | string | null;
  image_url?: string | null;
  width?: number | null;
  height?: number | null;
  published_at?: number | null;
};

export type PublishedPhotoCollection = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  photos: Array<{
    id: string;
    optimized_url?: string | null;
    thumbnail_url?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
  }>;
};

export type PendingAttachment = {
  localId: string;
  file: File;
  previewUrl: string;
  caption: string;
  uploadId?: string;
  status: "pending" | "uploading" | "ready" | "error";
  error?: string;
};
