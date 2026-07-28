/**
 * Ask Shirley chat client.
 * Prefer the real Worker API; optional labeled local fallback only when unset.
 * Uses credentials:include so owner HttpOnly cookies work cross-origin.
 */

import type {
  AskShirleyApiResponse,
  AskShirleyChatMessage,
  AskShirleyCitation,
  GroundingLevel,
} from "@/ask-shirley/types";
import { craftLocalAskShirleyReply } from "@/lib/askShirleyLocalFallback";
import {
  askShirleyEndpointBase,
  getOwnerConversationId,
  setOwnerConversationId,
} from "@/lib/askShirleyOwnerApi";
import { getAnalyticsIds, trackEvent } from "@/lib/analytics";

export type { AskShirleyChatMessage, GroundingLevel };

export type AskShirleyRespondArgs = {
  messages: AskShirleyChatMessage[];
  signal?: AbortSignal;
  /** When true, do not persist the last user bubble (auth interception). */
  omitLastUserFromHistory?: boolean;
};

export type AskShirleyReply = {
  answer: string;
  messages: string[];
  grounding: GroundingLevel;
  relatedTopics: string[];
  source: "api" | "local-fallback";
  ownerMode?: boolean;
  authEvent?: string;
  citations?: AskShirleyCitation[];
  /** True when the user message was an auth attempt and must not stay in the transcript. */
  suppressUserMessage?: boolean;
};

const WELCOME =
  "hey :)\n\nask me whatever you're curious about — design, people, tech, books, whatever's on your mind.";

export function getWelcomeMessage(): AskShirleyChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME,
    createdAt: Date.now(),
    relatedTopics: [],
  };
}

function historyForApi(messages: AskShirleyChatMessage[]): Array<{
  role: "user" | "assistant";
  content: string;
}> {
  const turns = messages
    .filter((m) => m.id !== "welcome")
    .filter((m) => m.role === "user" || m.role === "assistant")
    .filter((m) => !/^\/owner\b/i.test(m.content.trim()))
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .filter((m) => m.content);
  if (turns.length && turns[turns.length - 1]?.role === "user") {
    turns.pop();
  }
  return turns.slice(-28);
}

function normalizeMessages(data: AskShirleyApiResponse): string[] {
  if (Array.isArray(data.messages) && data.messages.length > 0) {
    return data.messages
      .filter((m): m is string => typeof m === "string")
      .map((m) => m.trim())
      .filter(Boolean)
      .slice(0, 3);
  }
  if (typeof data.answer === "string" && data.answer.trim()) {
    return [data.answer.trim()];
  }
  return [];
}

function looksLikeOwnerAuthCommand(text: string): boolean {
  return /^\/owner\b/i.test(text.trim());
}

async function callAskShirleyApi(
  args: AskShirleyRespondArgs,
  base: string,
): Promise<AskShirleyReply> {
  const lastUser = [...args.messages].reverse().find((m) => m.role === "user");
  const message = lastUser?.content?.trim() || "";
  if (!message) {
    throw new Error("empty_message");
  }

  const isAuthCommand = looksLikeOwnerAuthCommand(message);

  const res = await fetch(`${base}/api/ask-shirley`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    signal: args.signal,
    body: JSON.stringify({
      message,
      history: isAuthCommand ? [] : historyForApi(args.messages),
      conversationId: getOwnerConversationId(),
      analyticsVisitorId: getAnalyticsIds().visitorId,
      analyticsSessionId: getAnalyticsIds().sessionId,
      pagePath: typeof window !== "undefined" ? window.location.pathname : null,
    }),
  });

  if (!res.ok) {
    let code = `http_${res.status}`;
    try {
      const errBody = (await res.json()) as { code?: string; error?: string };
      if (errBody.code) code = errBody.code;
    } catch {
      /* ignore */
    }
    throw new Error(code);
  }

  const data = (await res.json()) as AskShirleyApiResponse;
  const messages = normalizeMessages(data);
  if (messages.length === 0) {
    throw new Error("invalid_response");
  }

  const grounding: GroundingLevel =
    data.grounding === "documented" ||
    data.grounding === "interpretive" ||
    data.grounding === "unknown"
      ? data.grounding
      : "unknown";

  if (typeof data.conversationId === "string" && data.conversationId) {
    setOwnerConversationId(data.conversationId);
  }

  const authEvent = typeof data.authEvent === "string" ? data.authEvent : undefined;
  const suppressUserMessage =
    isAuthCommand ||
    authEvent === "owner_login" ||
    authEvent === "owner_login_failed" ||
    authEvent === "owner_locked";

  if (authEvent === "owner_login") {
    trackEvent("owner_authenticated");
  }

  return {
    answer: messages.join("\n\n"),
    messages,
    grounding,
    relatedTopics: Array.isArray(data.relatedTopics)
      ? data.relatedTopics.filter((t) => typeof t === "string")
      : [],
    source: "api",
    ownerMode: data.ownerMode === true,
    authEvent,
    citations: Array.isArray(data.citations) ? data.citations : [],
    suppressUserMessage,
  };
}

export async function respondAskShirley(
  args: AskShirleyRespondArgs,
): Promise<AskShirleyReply> {
  const base = askShirleyEndpointBase();
  if (base) {
    return callAskShirleyApi(args, base);
  }

  const lastUser = [...args.messages].reverse().find((m) => m.role === "user");
  const text = lastUser?.content?.trim() || "";

  await new Promise<void>((resolve, reject) => {
    const t = window.setTimeout(() => resolve(), 320 + Math.random() * 280);
    args.signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });

  if (args.signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  const local = craftLocalAskShirleyReply(text);
  return {
    answer: `${local}\n\n—\nLocal fallback (API endpoint not configured).`,
    messages: [`${local}\n\n—\nLocal fallback (API endpoint not configured).`],
    grounding: "unknown",
    relatedTopics: [],
    source: "local-fallback",
  };
}
