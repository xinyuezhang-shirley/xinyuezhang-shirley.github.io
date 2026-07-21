/**
 * Ask Shirley chat client.
 * Prefer the real Worker API; optional labeled local fallback only when unset.
 */

import type {
  AskShirleyApiResponse,
  AskShirleyChatMessage,
  GroundingLevel,
} from "@/ask-shirley/types";
import { craftLocalAskShirleyReply } from "@/lib/askShirleyLocalFallback";

export type { AskShirleyChatMessage, GroundingLevel };

export type AskShirleyRespondArgs = {
  messages: AskShirleyChatMessage[];
  signal?: AbortSignal;
};

export type AskShirleyReply = {
  answer: string;
  messages: string[];
  grounding: GroundingLevel;
  relatedTopics: string[];
  source: "api" | "local-fallback";
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

function endpointBase(): string | null {
  const raw = import.meta.env.VITE_ASK_SHIRLEY_ENDPOINT;
  if (typeof raw === "string" && raw.trim()) return raw.replace(/\/$/, "");
  const shared = import.meta.env.VITE_VIEW_COUNTER_ENDPOINT;
  if (typeof shared === "string" && shared.trim()) return shared.replace(/\/$/, "");
  return null;
}

function historyForApi(messages: AskShirleyChatMessage[]): Array<{
  role: "user" | "assistant";
  content: string;
}> {
  const turns = messages
    .filter((m) => m.id !== "welcome")
    .filter((m) => m.role === "user" || m.role === "assistant")
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

async function callAskShirleyApi(
  args: AskShirleyRespondArgs,
  base: string,
): Promise<AskShirleyReply> {
  const lastUser = [...args.messages].reverse().find((m) => m.role === "user");
  const message = lastUser?.content?.trim() || "";
  if (!message) {
    throw new Error("empty_message");
  }

  const res = await fetch(`${base}/api/ask-shirley`, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    signal: args.signal,
    body: JSON.stringify({
      message,
      history: historyForApi(args.messages),
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

  return {
    answer: messages.join("\n\n"),
    messages,
    grounding,
    relatedTopics: Array.isArray(data.relatedTopics)
      ? data.relatedTopics.filter((t) => typeof t === "string")
      : [],
    source: "api",
  };
}

export async function respondAskShirley(
  args: AskShirleyRespondArgs,
): Promise<AskShirleyReply> {
  const base = endpointBase();
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
