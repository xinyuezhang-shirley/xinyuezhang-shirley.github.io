import { useCallback, useEffect, useRef, useState } from "react";
import {
  getWelcomeMessage,
  respondAskShirley,
  type AskShirleyChatMessage,
} from "@/lib/askShirleyResponder";

const STORAGE_KEY = "ask-shirley:v4:messages";
const MAX_STORED_MESSAGES = 50;
const MAX_STORAGE_CHARS = 100_000;

function uid(): string {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = window.setTimeout(() => resolve(), ms);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function pruneMessages(messages: AskShirleyChatMessage[]): AskShirleyChatMessage[] {
  let next = messages;
  if (next.length > MAX_STORED_MESSAGES) {
    const welcome = next.find((m) => m.id === "welcome");
    const tail = next.slice(-MAX_STORED_MESSAGES + (welcome ? 1 : 0));
    next = welcome && !tail.some((m) => m.id === "welcome") ? [welcome, ...tail] : tail;
  }

  let serialized = JSON.stringify(next);
  while (serialized.length > MAX_STORAGE_CHARS && next.length > 2) {
    const idx = next.findIndex((m) => m.id !== "welcome");
    if (idx < 0) break;
    next = [...next.slice(0, idx), ...next.slice(idx + 1)];
    serialized = JSON.stringify(next);
  }
  return next;
}

function loadMessages(): AskShirleyChatMessage[] {
  if (typeof window === "undefined") return [getWelcomeMessage()];
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem("ask-shirley:v3:messages");
    if (!raw) return [getWelcomeMessage()];
    const parsed = JSON.parse(raw) as AskShirleyChatMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [getWelcomeMessage()];
    return pruneMessages(parsed);
  } catch {
    return [getWelcomeMessage()];
  }
}

export function useAskShirleyChat() {
  const [messages, setMessages] = useState<AskShirleyChatMessage[]>(() => loadMessages());
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sendingRef = useRef(false);
  const hydrated = useRef(false);

  useEffect(() => {
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      const pruned = pruneMessages(messages);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
    } catch {
      /* ignore */
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    sendingRef.current = false;
    setIsTyping(false);
    setError(null);
    setMessages([getWelcomeMessage()]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("ask-shirley:v3:messages");
    } catch {
      /* ignore */
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sendingRef.current) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    sendingRef.current = true;
    setError(null);

    const userMsg: AskShirleyChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed.slice(0, 1500),
      createdAt: Date.now(),
    };

    let nextMessages: AskShirleyChatMessage[] = [];
    setMessages((prev) => {
      nextMessages = pruneMessages([...prev, userMsg]);
      return nextMessages;
    });
    setIsTyping(true);

    try {
      const reply = await respondAskShirley({
        messages: nextMessages,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;

      const bubbles = reply.messages.length > 0 ? reply.messages : [reply.answer];
      for (let i = 0; i < bubbles.length; i++) {
        if (controller.signal.aborted) return;
        if (i > 0) {
          // Small sequencing delay between Shirley bubbles (not fake long typing).
          await sleep(250 + Math.floor(Math.random() * 450), controller.signal);
        }
        const assistantMsg: AskShirleyChatMessage = {
          id: uid(),
          role: "assistant",
          content: bubbles[i]!,
          createdAt: Date.now(),
          grounding: reply.grounding,
          relatedTopics: i === 0 ? reply.relatedTopics : [],
        };
        setMessages((prev) => pruneMessages([...prev, assistantMsg]));
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Couldn't send — try again?");
    } finally {
      if (abortRef.current === controller) {
        setIsTyping(false);
        abortRef.current = null;
      }
      sendingRef.current = false;
    }
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
  };
}
