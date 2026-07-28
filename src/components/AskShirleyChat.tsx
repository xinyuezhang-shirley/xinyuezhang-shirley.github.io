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
  onSend: (text: string, meta?: { uploadObjectIds?: string[] }) => void;
  disabled?: boolean;
  placeholder?: string;
  large?: boolean;
  diagonal?: boolean;
  /** Owner-mode attachments */
  allowAttachments?: boolean;
};

export function AskComposer({
  onSend,
  disabled,
  placeholder = "say something...",
  large,
  diagonal,
  allowAttachments = false,
}: InputProps) {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<
    Array<{
      localId: string;
      file: File;
      previewUrl: string;
      status: "pending" | "uploading" | "ready" | "error";
      uploadId?: string;
      error?: string;
    }>
  >([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      for (const a of attachments) URL.revokeObjectURL(a.previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addFiles(files: FileList | File[]) {
    const next = [...files].filter((f) => f.type.startsWith("image/")).slice(0, 12);
    setAttachments((prev) => [
      ...prev,
      ...next.map((file) => ({
        localId: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: "pending" as const,
      })),
    ]);
  }

  async function ensureUploaded(): Promise<string[]> {
    if (!allowAttachments || attachments.length === 0) return [];
    setUploading(true);
    try {
      const { createUploadSession, uploadStudioFile } = await import("@/lib/studioApi");
      const session = await createUploadSession();
      const ids: string[] = [];
      for (let i = 0; i < attachments.length; i++) {
        const a = attachments[i]!;
        if (a.uploadId) {
          ids.push(a.uploadId);
          continue;
        }
        setAttachments((prev) =>
          prev.map((x) => (x.localId === a.localId ? { ...x, status: "uploading" } : x)),
        );
        try {
          const res = await uploadStudioFile({
            sessionId: session.id,
            file: a.file,
            displayOrder: i,
          });
          ids.push(res.file.id);
          setAttachments((prev) =>
            prev.map((x) =>
              x.localId === a.localId
                ? { ...x, status: "ready", uploadId: res.file.id }
                : x,
            ),
          );
        } catch (err) {
          setAttachments((prev) =>
            prev.map((x) =>
              x.localId === a.localId
                ? {
                    ...x,
                    status: "error",
                    error: err instanceof Error ? err.message : "upload_failed",
                  }
                : x,
            ),
          );
          throw err;
        }
      }
      return ids;
    } finally {
      setUploading(false);
    }
  }

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    const next = value.trim();
    if ((!next && attachments.length === 0) || disabled || uploading) return;
    try {
      const uploadObjectIds = await ensureUploaded();
      const text =
        next ||
        (uploadObjectIds.length
          ? `Add these ${uploadObjectIds.length} images to my site.`
          : "");
      if (!text) return;
      onSend(text, uploadObjectIds.length ? { uploadObjectIds } : undefined);
      setValue("");
      for (const a of attachments) URL.revokeObjectURL(a.previewUrl);
      setAttachments([]);
    } catch {
      /* keep attachments for retry */
    }
  }

  const canSend =
    !disabled &&
    !uploading &&
    (value.trim().length > 0 || attachments.some((a) => a.status !== "error"));

  const attachUi = allowAttachments ? (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {attachments.length > 0 && (
        <ul className="ask-attach-list" aria-label="Attachments">
          {attachments.map((a, idx) => (
            <li key={a.localId} className={`ask-attach-item status-${a.status}`}>
              <img src={a.previewUrl} alt="" />
              <span className="ask-attach-meta">
                {idx + 1}
                {a.status === "uploading" ? "…" : a.status === "error" ? "!" : ""}
              </span>
              <button
                type="button"
                className="ask-attach-remove"
                aria-label="Remove attachment"
                onClick={() => {
                  URL.revokeObjectURL(a.previewUrl);
                  setAttachments((prev) => prev.filter((x) => x.localId !== a.localId));
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  ) : null;

  if (large) {
    return (
      <form
        className="ask-composer-large"
        onSubmit={(e) => void submit(e)}
        onDragOver={(e) => {
          if (!allowAttachments) return;
          e.preventDefault();
        }}
        onDrop={(e) => {
          if (!allowAttachments) return;
          e.preventDefault();
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
      >
        {attachUi}
        <label className="sr-only" htmlFor="ask-shirley-input-large">
          Message
        </label>
        <textarea
          id="ask-shirley-input-large"
          rows={3}
          value={value}
          disabled={disabled || uploading}
          placeholder={placeholder}
          maxLength={1500}
          onChange={(e) => setValue(e.target.value)}
          onPaste={(e) => {
            if (!allowAttachments) return;
            const items = e.clipboardData?.files;
            if (items?.length) {
              e.preventDefault();
              addFiles(items);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
        />
        <div className="ask-composer-actions">
          {allowAttachments && (
            <button
              type="button"
              className="ask-attach-btn"
              aria-label="Attach images"
              disabled={disabled || uploading}
              onClick={() => fileRef.current?.click()}
            >
              +
            </button>
          )}
          <button
            type="submit"
            className={`ask-send${diagonal ? " ask-send--diag" : ""}`}
            disabled={!canSend}
            aria-label="Send message"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 14 L14 2 M6 2 H14 V10" />
            </svg>
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="ask-input-row" onSubmit={(e) => void submit(e)}>
      {attachUi}
      {allowAttachments && (
        <button
          type="button"
          className="ask-attach-btn"
          aria-label="Attach images"
          disabled={disabled || uploading}
          onClick={() => fileRef.current?.click()}
        >
          +
        </button>
      )}
      <label className="sr-only" htmlFor="ask-shirley-input">
        Message
      </label>
      <input
        id="ask-shirley-input"
        type="text"
        value={value}
        disabled={disabled || uploading}
        placeholder={placeholder}
        autoComplete="off"
        maxLength={1500}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="ask-send"
        disabled={!canSend}
        aria-label="Send message"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 8 H13 M9 3 L14 8 L9 13" />
        </svg>
      </button>
    </form>
  );
}

