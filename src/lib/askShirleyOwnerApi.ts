/**
 * Ask Shirley API helpers — credentials:include for owner session cookie.
 */

const OWNER_CONV_KEY = "ask-shirley:owner:conversationId";

export function askShirleyEndpointBase(): string | null {
  const raw = import.meta.env.VITE_ASK_SHIRLEY_ENDPOINT;
  if (typeof raw === "string" && raw.trim()) return raw.replace(/\/$/, "");
  const shared = import.meta.env.VITE_VIEW_COUNTER_ENDPOINT;
  if (typeof shared === "string" && shared.trim()) return shared.replace(/\/$/, "");
  return null;
}

export type OwnerSessionState = {
  ownerMode: boolean;
  role: "public" | "owner";
  userId: string | null;
};

export async function fetchOwnerSession(signal?: AbortSignal): Promise<OwnerSessionState> {
  const base = askShirleyEndpointBase();
  if (!base) return { ownerMode: false, role: "public", userId: null };
  try {
    const res = await fetch(`${base}/api/auth/session`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      signal,
    });
    if (!res.ok) return { ownerMode: false, role: "public", userId: null };
    const data = (await res.json()) as {
      ownerMode?: boolean;
      role?: string;
      userId?: string | null;
    };
    return {
      ownerMode: data.ownerMode === true || data.role === "owner",
      role: data.role === "owner" ? "owner" : "public",
      userId: typeof data.userId === "string" ? data.userId : null,
    };
  } catch {
    return { ownerMode: false, role: "public", userId: null };
  }
}

export async function logoutOwnerSession(): Promise<void> {
  const base = askShirleyEndpointBase();
  if (!base) return;
  try {
    await fetch(`${base}/api/auth/logout`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  } catch {
    /* ignore */
  }
  try {
    window.localStorage.removeItem(OWNER_CONV_KEY);
  } catch {
    /* ignore */
  }
}

export function getOwnerConversationId(): string | null {
  try {
    return window.localStorage.getItem(OWNER_CONV_KEY);
  } catch {
    return null;
  }
}

export function setOwnerConversationId(id: string | null): void {
  try {
    if (!id) window.localStorage.removeItem(OWNER_CONV_KEY);
    else window.localStorage.setItem(OWNER_CONV_KEY, id);
  } catch {
    /* ignore */
  }
}

export type OwnerMemory = {
  id: string;
  content: string;
  category: string | null;
  importance: number;
  updated_at: number;
};

export type OwnerNote = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  updated_at: number;
};

export type OwnerConversation = {
  id: string;
  title: string | null;
  summary: string | null;
  updated_at: number;
};

export type PersonaObservation = {
  id: string;
  observation: string;
  category: string | null;
  confidence: number;
  status: string;
  created_at: number;
};

async function ownerFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = askShirleyEndpointBase();
  if (!base) throw new Error("no_endpoint");
  const res = await fetch(`${base}${path}`, {
    ...init,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`http_${res.status}`);
  return (await res.json()) as T;
}

export async function listOwnerMemories(): Promise<OwnerMemory[]> {
  const data = await ownerFetch<{ memories: OwnerMemory[] }>("/api/memories");
  return data.memories || [];
}

export async function updateOwnerMemory(
  id: string,
  patch: { content?: string; archived?: boolean },
): Promise<void> {
  await ownerFetch(`/api/memories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteOwnerMemory(id: string): Promise<void> {
  await ownerFetch(`/api/memories/${id}`, { method: "DELETE" });
}

export async function listOwnerNotes(): Promise<OwnerNote[]> {
  const data = await ownerFetch<{ notes: OwnerNote[] }>("/api/notes");
  return data.notes || [];
}

export async function updateOwnerNote(
  id: string,
  patch: { title?: string; body?: string },
): Promise<void> {
  await ownerFetch(`/api/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteOwnerNote(id: string): Promise<void> {
  await ownerFetch(`/api/notes/${id}`, { method: "DELETE" });
}

export async function listOwnerConversations(): Promise<OwnerConversation[]> {
  const data = await ownerFetch<{ conversations: OwnerConversation[] }>("/api/conversations");
  return data.conversations || [];
}

export async function deleteOwnerConversation(id: string): Promise<void> {
  await ownerFetch(`/api/conversations/${id}`, { method: "DELETE" });
}

export async function listPersonaObservations(): Promise<PersonaObservation[]> {
  const data = await ownerFetch<{ observations: PersonaObservation[] }>(
    "/api/persona/observations",
  );
  return data.observations || [];
}

export async function patchPersonaObservation(
  id: string,
  patch: { status?: string; observation?: string },
): Promise<void> {
  await ownerFetch(`/api/persona/observations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function clearPersonaLearning(): Promise<void> {
  await ownerFetch("/api/persona/clear", { method: "POST", body: "{}" });
}

export async function exportOwnerData(): Promise<unknown> {
  return ownerFetch("/api/export");
}
