import { useEffect, useId, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "@/styles/ask-shirley.css";
import { useAskShirleyChat } from "@/hooks/useAskShirleyChat";
import {
  AskComposer,
  AskMark,
  AskMessageList,
  AskQuickQuestions,
} from "@/components/AskShirleyChat";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function AskShirleyPopup({ open, onOpen, onClose }: Props) {
  const location = useLocation();
  const { messages, isTyping, error, sendMessage, clearChat } = useAskShirleyChat();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const hideOnAskPage =
    location.pathname === "/ask" || location.pathname.startsWith("/ask-shirley");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const btn = panelRef.current?.querySelector<HTMLElement>("button, input, textarea, a");
      btn?.focus();
    }
  }, [open]);

  if (hideOnAskPage) return null;

  if (!open) {
    return (
      <button type="button" className="ask-launch ask-shirley" onClick={onOpen} aria-haspopup="dialog">
        <AskMark size="sm" />
        <span className="ask-launch__label">Ask Shirley</span>
      </button>
    );
  }

  const showQuick = messages.length <= 1 && !isTyping;

  return (
    <div
      ref={panelRef}
      className="ask-popup-root ask-shirley"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
    >
      <div className="ask-popup-root__scan" aria-hidden="true" />
      <div className="ask-noise" aria-hidden="true" />

      <header className="ask-popup__header">
        <div className="ask-popup__brand">
          <AskMark />
          <div>
            <h2 id={titleId} className="ask-popup__title">
              Ask Shirley
            </h2>
            <p className="ask-popup__subtitle">digital conversation interface</p>
          </div>
        </div>
        <div className="ask-popup__actions">
          <button
            type="button"
            className="ask-icon-btn"
            aria-label="Reset conversation"
            title="Reset conversation"
            onClick={clearChat}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3 H13 V13 H3 Z" fill="none" />
              <path d="M5 8 H11 M8 5 L11 8 L8 11" />
            </svg>
          </button>
          <Link
            to="/ask"
            className="ask-icon-btn"
            aria-label="Open in full window"
            title="Open in full window"
            onClick={onClose}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="2" y="4" width="9" height="9" />
              <path d="M6 2 H14 V10" />
              <path d="M8 8 L14 2" />
            </svg>
          </Link>
          <button type="button" className="ask-icon-btn" aria-label="Close chat" onClick={onClose}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 3 L13 13 M13 3 L3 13" />
            </svg>
          </button>
        </div>
      </header>

      <div className="ask-popup__body">
        <AskMessageList messages={messages} isTyping={isTyping} compact />
        {showQuick && <AskQuickQuestions onSelect={sendMessage} limit={3} />}
        {error && <p className="ask-error" role="alert">{error}</p>}
      </div>

      <div className="ask-popup__footer">
        <AskComposer onSend={sendMessage} disabled={isTyping} />
        <p className="ask-popup__disclaimer">AI interpretation — not actually Shirley</p>
      </div>
    </div>
  );
}
