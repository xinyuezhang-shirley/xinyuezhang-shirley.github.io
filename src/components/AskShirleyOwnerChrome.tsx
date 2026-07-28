/**
 * Subtle owner-mode chrome: indicator + private tools drawer.
 * Chat remains the primary interface.
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearPersonaLearning,
  deleteOwnerConversation,
  deleteOwnerMemory,
  deleteOwnerNote,
  exportOwnerData,
  listOwnerConversations,
  listOwnerMemories,
  listOwnerNotes,
  listPersonaObservations,
  patchPersonaObservation,
  updateOwnerMemory,
  updateOwnerNote,
  type OwnerConversation,
  type OwnerMemory,
  type OwnerNote,
  type PersonaObservation,
} from "@/lib/askShirleyOwnerApi";
import {
  discardStudioDraft,
  listStudioChanges,
  listStudioDrafts,
  publishStudioDraft,
} from "@/lib/studioApi";

type Tab = "studio" | "memories" | "notes" | "chats" | "traits" | "tools";

type Props = {
  ownerMode: boolean;
  onEndSession: () => void;
};

export function AskShirleyOwnerChrome({ ownerMode, onEndSession }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("studio");
  const [memories, setMemories] = useState<OwnerMemory[]>([]);
  const [notes, setNotes] = useState<OwnerNote[]>([]);
  const [chats, setChats] = useState<OwnerConversation[]>([]);
  const [traits, setTraits] = useState<PersonaObservation[]>([]);
  const [drafts, setDrafts] = useState<
    Array<{ id: string; content_type: string; operation_type: string; proposed: Record<string, unknown>; updated_at: number }>
  >([]);
  const [changes, setChanges] = useState<
    Array<{ id: string; content_type: string; operation: string; status: string; created_at: number }>
  >([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const load = useCallback(async () => {
    if (!ownerMode) return;
    setBusy(true);
    setError(null);
    try {
      const [m, n, c, t, studioDrafts, studioChanges] = await Promise.all([
        listOwnerMemories(),
        listOwnerNotes(),
        listOwnerConversations(),
        listPersonaObservations(),
        listStudioDrafts().catch(() => ({ drafts: [] })),
        listStudioChanges().catch(() => ({ changes: [] })),
      ]);
      setMemories(m);
      setNotes(n);
      setChats(c);
      setTraits(t);
      setDrafts(studioDrafts.drafts || []);
      setChanges(studioChanges.changes || []);
    } catch {
      setError("Couldn’t load private tools.");
    } finally {
      setBusy(false);
    }
  }, [ownerMode]);

  useEffect(() => {
    if (open && ownerMode) void load();
  }, [open, ownerMode, load]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!ownerMode) return null;

  return (
    <div className="ask-owner">
      <div className="ask-owner__bar" role="status" aria-live="polite">
        <span className="ask-owner__badge" title="Private owner session active">
          Owner mode
        </span>
        <button
          type="button"
          className="ask-text-btn ask-text-btn--subtle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          Private tools
        </button>
        <button
          type="button"
          className="ask-text-btn ask-text-btn--subtle"
          onClick={() => {
            if (window.confirm("End owner session on this device?")) onEndSession();
          }}
        >
          End session
        </button>
      </div>

      {open && (
        <div
          id={panelId}
          className="ask-owner__drawer"
          role="dialog"
          aria-label="Owner private tools"
        >
          <div className="ask-owner__drawer-head">
            <p className="ask-owner__drawer-title">Private</p>
            <button
              ref={closeRef}
              type="button"
              className="ask-icon-btn"
              aria-label="Close private tools"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="ask-owner__tabs" role="tablist" aria-label="Owner sections">
            {(
              [
                ["studio", "Studio"],
                ["memories", "Memories"],
                ["notes", "Notes"],
                ["chats", "Past chats"],
                ["traits", "Learned traits"],
                ["tools", "Session"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={`ask-owner__tab${tab === id ? " is-active" : ""}`}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ask-owner__body" role="tabpanel">
            {busy && <p className="ask-owner__muted">Loading…</p>}
            {error && (
              <p className="ask-error" role="alert">
                {error}
              </p>
            )}

            {tab === "studio" && !busy && (
              <div className="ask-owner__list">
                <p className="ask-owner__muted">
                  Chat is the primary CMS. Drafts stay private until you publish.
                </p>
                <p className="ask-owner__item-actions">
                  <Link to="/thoughts" className="ask-text-btn" onClick={() => setOpen(false)}>
                    Thoughts archive →
                  </Link>
                  <Link to="/writing" className="ask-text-btn" onClick={() => setOpen(false)}>
                    Writing archive →
                  </Link>
                </p>
                <h3 className="ask-owner__drawer-title">Open drafts</h3>
                {drafts.length === 0 && (
                  <p className="ask-owner__muted">No open drafts.</p>
                )}
                <ul className="ask-owner__list">
                  {drafts.map((d) => (
                    <li key={d.id} className="ask-owner__item">
                      <p>
                        <strong>{d.content_type}</strong> · {d.operation_type}
                        <br />
                        <span className="ask-owner__muted">{d.id}</span>
                        <br />
                        {String((d.proposed as { title?: string }).title || "")}
                      </p>
                      <div className="ask-owner__item-actions">
                        <button
                          type="button"
                          className="ask-text-btn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Publish this draft to the public site? This is irreversible without rollback.",
                              )
                            ) {
                              void publishStudioDraft(d.id)
                                .then(load)
                                .catch(() => setError("Publish failed."));
                            }
                          }}
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="ask-text-btn ask-text-btn--subtle"
                          onClick={() => {
                            void discardStudioDraft(d.id).then(load);
                          }}
                        >
                          Discard
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="ask-owner__drawer-title">Recent changes</h3>
                <ul className="ask-owner__list">
                  {changes.slice(0, 12).map((c) => (
                    <li key={c.id} className="ask-owner__muted">
                      {new Date(c.created_at).toLocaleString()} — {c.content_type}{" "}
                      {c.operation} ({c.status})
                    </li>
                  ))}
                  {changes.length === 0 && (
                    <li className="ask-owner__muted">No content changes yet.</li>
                  )}
                </ul>
              </div>
            )}

            {tab === "memories" && !busy && (
              <ul className="ask-owner__list">
                {memories.length === 0 && (
                  <li className="ask-owner__muted">No memories yet. Say “remember that…”</li>
                )}
                {memories.map((m) => (
                  <li key={m.id} className="ask-owner__item">
                    <textarea
                      className="ask-owner__edit"
                      aria-label="Memory content"
                      defaultValue={m.content}
                      onBlur={(e) => {
                        const next = e.target.value.trim();
                        if (next && next !== m.content) {
                          void updateOwnerMemory(m.id, { content: next }).then(load);
                        }
                      }}
                    />
                    <div className="ask-owner__item-actions">
                      <button
                        type="button"
                        className="ask-text-btn ask-text-btn--subtle"
                        onClick={() => {
                          if (window.confirm("Delete this memory?")) {
                            void deleteOwnerMemory(m.id).then(load);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {tab === "notes" && !busy && (
              <ul className="ask-owner__list">
                {notes.length === 0 && (
                  <li className="ask-owner__muted">No notes yet. Ask to create one in chat.</li>
                )}
                {notes.map((n) => (
                  <li key={n.id} className="ask-owner__item">
                    <input
                      className="ask-owner__title-input"
                      aria-label="Note title"
                      defaultValue={n.title}
                      onBlur={(e) => {
                        const title = e.target.value.trim();
                        if (title && title !== n.title) {
                          void updateOwnerNote(n.id, { title }).then(load);
                        }
                      }}
                    />
                    <textarea
                      className="ask-owner__edit ask-owner__edit--tall"
                      aria-label="Note body"
                      defaultValue={n.body}
                      onBlur={(e) => {
                        if (e.target.value !== n.body) {
                          void updateOwnerNote(n.id, { body: e.target.value }).then(load);
                        }
                      }}
                    />
                    <div className="ask-owner__item-actions">
                      <button
                        type="button"
                        className="ask-text-btn ask-text-btn--subtle"
                        onClick={() => {
                          if (window.confirm("Delete this note?")) {
                            void deleteOwnerNote(n.id).then(load);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {tab === "chats" && !busy && (
              <ul className="ask-owner__list">
                {chats.length === 0 && (
                  <li className="ask-owner__muted">No saved owner chats yet.</li>
                )}
                {chats.map((c) => (
                  <li key={c.id} className="ask-owner__item">
                    <strong>{c.title || "Untitled"}</strong>
                    <p className="ask-owner__muted">{(c.summary || "").slice(0, 280)}</p>
                    <button
                      type="button"
                      className="ask-text-btn ask-text-btn--subtle"
                      onClick={() => {
                        if (window.confirm("Delete this conversation?")) {
                          void deleteOwnerConversation(c.id).then(load);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {tab === "traits" && !busy && (
              <ul className="ask-owner__list">
                {traits.length === 0 && (
                  <li className="ask-owner__muted">No learned trait candidates yet.</li>
                )}
                {traits.map((t) => (
                  <li key={t.id} className="ask-owner__item">
                    <span className="ask-owner__pill">{t.status}</span>
                    <p>{t.observation}</p>
                    {t.status === "candidate" && (
                      <div className="ask-owner__item-actions">
                        <button
                          type="button"
                          className="ask-text-btn"
                          onClick={() =>
                            void patchPersonaObservation(t.id, { status: "approved" }).then(load)
                          }
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="ask-text-btn ask-text-btn--subtle"
                          onClick={() =>
                            void patchPersonaObservation(t.id, { status: "rejected" }).then(load)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </li>
                ))}
                {traits.length > 0 && (
                  <li>
                    <button
                      type="button"
                      className="ask-text-btn ask-text-btn--subtle"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Clear all learned persona data? Notes and memories stay.",
                          )
                        ) {
                          void clearPersonaLearning().then(load);
                        }
                      }}
                    >
                      Clear learned persona data
                    </button>
                  </li>
                )}
              </ul>
            )}

            {tab === "tools" && (
              <div className="ask-owner__list">
                <p className="ask-owner__muted">
                  Connected tools: memories, notes, conversations, web search, portfolio search.
                  Future adapters (Drive, Gmail, Calendar…) plug into the Worker tool registry.
                </p>
                <Link className="ask-text-btn" to="/insights">
                  Open Site Insights
                </Link>
                <button
                  type="button"
                  className="ask-text-btn"
                  onClick={async () => {
                    try {
                      const data = await exportOwnerData();
                      const blob = new Blob([JSON.stringify(data, null, 2)], {
                        type: "application/json",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `shirley-owner-export-${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    } catch {
                      setError("Export failed.");
                    }
                  }}
                >
                  Export private data
                </button>
                <button
                  type="button"
                  className="ask-text-btn ask-text-btn--subtle"
                  onClick={() => {
                    if (window.confirm("End owner session on this device?")) onEndSession();
                  }}
                >
                  End owner session
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
