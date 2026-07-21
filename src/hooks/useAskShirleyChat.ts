import { useCallback, useEffect, useRef, useState } from "react";
import {
  getWelcomeMessage,
  respondAskShirley,
  type AskShirleyChatMessage,
} from "@/lib/askShirleyResponder";

const STORAGE_KEY = "ask-shirley:v1:messages";

function loadMessages(): AskShirleyChatMessage[] {
  if (typeof window === "undefined") return [getWelcomeMessage()];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [getWelcomeMessage()];
    const parsed = JSON.parse(raw) as AskShirleyChatMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [getWelcomeMessage()];
    return parsed;
  } catch {
    return [getWelcomeMessage()];
  }
}

function uid(): string {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAskShirleyChat() {
  const [messages, setMessages] = useState<AskShirleyChatMessage[]>(() => loadMessages());
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore quota / private mode failures.
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsTyping(false);
    setError(null);
    setMessages([getWelcomeMessage()]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setError(null);

    const userMsg: AskShirleyChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };

    let nextMessages: AskShirleyChatMessage[] = [];
    setMessages((prev) => {
      nextMessages = [...prev, userMsg];
      return nextMessages;
    });
    setIsTyping(true);

    try {
      const reply = await respondAskShirley({
        messages: nextMessages,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const assistantMsg: AskShirleyChatMessage = {
        id: uid(),
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Signal lost. Try again.");
    } finally {
      if (abortRef.current === controller) {
        setIsTyping(false);
        abortRef.current = null;
      }
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
