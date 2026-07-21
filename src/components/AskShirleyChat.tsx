import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AskShirleyChatMessage } from "@/ask-shirley/types";

function formatTime(ts: number): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(ts));
  } catch {
    return "";
  }
}

export function AskMark({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span className={`ask-mark${size === "sm" ? " ask-mark--sm" : ""}`} aria-hidden="true">
      <span className="ask-mark__box" />
    </span>
  );
}

type MessageListProps = {
  messages: AskShirleyChatMessage[];
  isTyping: boolean;
  compact?: boolean;
};

export function AskMessageList({ messages, isTyping, compact }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div
      className={compact ? "ask-popup-log" : "ask-log"}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((m) => (
        <article
          key={m.id}
          className={`ask-msg ask-msg--${m.role}`}
          aria-label={m.role === "user" ? "You" : "Ask Shirley"}
        >
          <div className="ask-msg__meta">
            {m.role === "assistant" ? (
              <>
                <AskMark size="sm" />
                <span>Shirley</span>
              </>
            ) : (
              <span>You</span>
            )}
            <span aria-hidden="true">{formatTime(m.createdAt)}</span>
          </div>
          <div className="ask-msg__bubble">{m.content}</div>
        </article>
      ))}
      {isTyping && (
        <div className="ask-typing" aria-label="Shirley is typing">
          <AskMark size="sm" />
          <span className="ask-typing__label">typing</span>
          <span className="ask-typing__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

type InputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  large?: boolean;
  diagonal?: boolean;
};

export function AskComposer({
  onSend,
  disabled,
  placeholder = "say something...",
  large,
  diagonal,
}: InputProps) {
  const [value, setValue] = useState("");

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const next = value.trim();
    if (!next || disabled) return;
    onSend(next);
    setValue("");
  }

  if (large) {
    return (
      <form className="ask-composer-large" onSubmit={submit}>
        <label className="sr-only" htmlFor="ask-shirley-input-large">
          Message
        </label>
        <textarea
          id="ask-shirley-input-large"
          rows={3}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={1500}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          type="submit"
          className={`ask-send${diagonal ? " ask-send--diag" : ""}`}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 14 L14 2 M6 2 H14 V10" />
          </svg>
        </button>
      </form>
    );
  }

  return (
    <form className="ask-input-row" onSubmit={submit}>
      <label className="sr-only" htmlFor="ask-shirley-input">
        Message
      </label>
      <input
        id="ask-shirley-input"
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        maxLength={1500}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="ask-send"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 8 H13 M9 3 L14 8 L9 13" />
        </svg>
      </button>
    </form>
  );
}
