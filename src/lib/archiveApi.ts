/**
 * Thoughts + Writing archive client helpers.
 */

import { askShirleyEndpointBase } from "@/lib/askShirleyOwnerApi";

async function archiveFetch<T>(path: string, init?: RequestInit): Promise<T> {
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

export type PublicThought = {
  id: string;
  text: string;
  title: string | null;
  type: string;
  visibility: string;
  created_at: number;
  pinned?: boolean;
};

export type OwnerThought = PublicThought & {
  owner_id?: string;
  original_text?: string;
  edited_text?: string | null;
  display_text?: string;
  public_encounter_count?: number;
  last_surfaced_at?: number | null;
  expires_at?: number | null;
  max_public_encounters?: number | null;
  resurface_after_days?: number | null;
  per_visitor_once?: number;
  manual_weight?: number;
  tags?: string[];
  updated_at?: number;
  behavior_json?: string | null;
};

export type WritingIndexItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  type: string;
  excerpt: string | null;
  published_at: number | null;
  updated_at: number;
  reading_minutes?: number;
  status?: string;
};

export type WritingAnnotation = {
  id: string;
  writing_id: string;
  block_id: string | null;
  text_anchor: string | null;
  body: string;
  visibility: string;
  created_at: number;
};

const ENCOUNTER_KEY = "sz_thought_encounters";

export function getEncounteredThoughtIds(): string[] {
  try {
    const raw = localStorage.getItem(ENCOUNTER_KEY);
    if (!raw) return [];
    const map = JSON.parse(raw) as Record<string, { at: number; count: number }>;
    const now = Date.now();
    // Allow resurface after 30 days by default on client
    return Object.entries(map)
      .filter(([, v]) => now - v.at < 30 * 86_400_000)
      .map(([id]) => id);
  } catch {
    return [];
  }
}

export function markThoughtEncountered(id: string) {
  try {
    const raw = localStorage.getItem(ENCOUNTER_KEY);
    const map = raw
      ? (JSON.parse(raw) as Record<string, { at: number; count: number }>)
      : {};
    const prev = map[id];
    map[id] = { at: Date.now(), count: (prev?.count || 0) + 1 };
    localStorage.setItem(ENCOUNTER_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export async function fetchPublicThoughts(opts?: {
  limit?: number;
  context?: string;
}): Promise<PublicThought[]> {
  const base = askShirleyEndpointBase();
  if (!base) return [];
  const exclude = getEncounteredThoughtIds();
  const params = new URLSearchParams();
  params.set("limit", String(opts?.limit ?? 5));
  if (opts?.context) params.set("context", opts.context);
  if (exclude.length) params.set("exclude", exclude.join(","));
  try {
    const res = await fetch(`${base}/api/thoughts/public?${params}`, {
      mode: "cors",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { items: PublicThought[] };
    return data.items || [];
  } catch {
    return [];
  }
}

export async function reportThoughtEncounter(id: string) {
  const base = askShirleyEndpointBase();
  if (!base) return;
  try {
    await fetch(`${base}/api/thoughts/encounter`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  } catch {
    /* ignore */
  }
}

export async function listOwnerThoughts(opts?: {
  visibility?: string;
  q?: string;
}) {
  const params = new URLSearchParams();
  if (opts?.visibility) params.set("visibility", opts.visibility);
  if (opts?.q) params.set("q", opts.q);
  return archiveFetch<{ items: OwnerThought[] }>(
    `/api/owner/thoughts?${params}`,
  );
}

export async function createOwnerThought(body: {
  text: string;
  visibility?: string;
  type?: string;
  title?: string;
  tags?: string[];
  perVisitorOnce?: boolean;
}) {
  return archiveFetch<{ ok: boolean; thought: OwnerThought }>(
    "/api/owner/thoughts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function patchOwnerThought(
  id: string,
  body: Record<string, unknown>,
) {
  return archiveFetch<{ ok: boolean; thought: OwnerThought }>(
    `/api/owner/thoughts/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function thoughtVisibilityAction(
  id: string,
  action:
    | "private"
    | "passing"
    | "publish"
    | "permanent"
    | "dormant"
    | "archive"
    | "resurface"
    | "delete",
  extra?: Record<string, unknown>,
) {
  return archiveFetch<{ ok: boolean; thought?: OwnerThought }>(
    `/api/owner/thoughts/${encodeURIComponent(id)}/${action}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extra || {}),
    },
  );
}

export async function fetchPublicWritingIndex() {
  const base = askShirleyEndpointBase();
  if (!base) return { items: [] as WritingIndexItem[] };
  try {
    const res = await fetch(`${base}/api/writing`, { mode: "cors" });
    if (!res.ok) return { items: [] as WritingIndexItem[] };
    return (await res.json()) as { items: WritingIndexItem[] };
  } catch {
    return { items: [] as WritingIndexItem[] };
  }
}

export async function fetchPublicWriting(slug: string) {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const res = await fetch(`${base}/api/writing/${encodeURIComponent(slug)}`, {
    mode: "cors",
  });
  if (!res.ok) throw new Error("not_found");
  return (await res.json()) as {
    item: {
      id: string;
      slug: string;
      title: string;
      subtitle: string | null;
      type: string;
      excerpt: string | null;
      structured_content: unknown;
      published_at: number | null;
      show_origin: boolean;
      annotations: WritingAnnotation[];
    };
    origin: Array<{
      id: string;
      text: string;
      created_at: number;
      relationship_type: string;
    }>;
  };
}

export async function listOwnerWriting(status = "all") {
  return archiveFetch<{ items: Array<WritingIndexItem & { status: string }> }>(
    `/api/owner/writing?status=${encodeURIComponent(status)}`,
  );
}

export async function createOwnerWriting(body: {
  title?: string;
  type?: string;
  thoughtIds?: string[];
  structuredContent?: unknown;
}) {
  return archiveFetch<{
    ok: boolean;
    writing: { id: string; slug: string; title: string; status: string };
  }>("/api/owner/writing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function getOwnerWriting(id: string) {
  return archiveFetch<{
    writing: {
      id: string;
      slug: string;
      title: string;
      subtitle: string | null;
      type: string;
      status: string;
      excerpt: string | null;
      structured_content: unknown;
      show_origin: number;
      updated_at: number;
    };
    annotations: WritingAnnotation[];
    origin: Array<Record<string, unknown>>;
  }>(`/api/owner/writing/${encodeURIComponent(id)}`);
}

export async function patchOwnerWriting(
  id: string,
  body: Record<string, unknown>,
) {
  return archiveFetch<{ ok: boolean; writing: Record<string, unknown> }>(
    `/api/owner/writing/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function publishOwnerWriting(id: string) {
  return archiveFetch(`/api/owner/writing/${encodeURIComponent(id)}/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ confirm: true }),
  });
}

export async function unpublishOwnerWriting(id: string) {
  return archiveFetch(
    `/api/owner/writing/${encodeURIComponent(id)}/unpublish`,
    { method: "POST" },
  );
}

export async function archiveOwnerWriting(id: string) {
  return archiveFetch(`/api/owner/writing/${encodeURIComponent(id)}/archive`, {
    method: "POST",
  });
}

export async function createWritingAnnotation(
  writingId: string,
  body: {
    body: string;
    blockId?: string;
    textAnchor?: string;
    visibility?: "private" | "public";
  },
) {
  return archiveFetch(
    `/api/owner/writing/${encodeURIComponent(writingId)}/annotations`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

export async function tearOutThought(
  writingId: string,
  text: string,
  visibility = "private",
) {
  return archiveFetch(
    `/api/owner/writing/${encodeURIComponent(writingId)}/thoughts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, visibility }),
    },
  );
}

export async function linkThoughtWriting(
  thoughtId: string,
  writingId: string,
  relationshipType = "seed",
) {
  return archiveFetch("/api/owner/thought-writing-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ thoughtId, writingId, relationshipType }),
  });
}
