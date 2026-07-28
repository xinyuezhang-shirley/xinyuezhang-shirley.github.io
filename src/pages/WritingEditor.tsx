import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useOwnerSession } from "@/hooks/useOwnerSession";
import { DocRenderer } from "@/work/archive/DocRenderer";
import {
  archiveOwnerWriting,
  createWritingAnnotation,
  getOwnerWriting,
  patchOwnerWriting,
  publishOwnerWriting,
  tearOutThought,
  unpublishOwnerWriting,
} from "@/lib/archiveApi";
import "@/work/archive/writing-archive.css";

type SaveState = "idle" | "saving" | "saved" | "failed";

const EMPTY_DOC = { type: "doc", content: [{ type: "paragraph" }] };

export default function WritingEditor() {
  const { id = "" } = useParams();
  const { ownerMode } = useOwnerSession();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState("draft");
  const [slug, setSlug] = useState("");
  const [showOrigin, setShowOrigin] = useState(false);
  const [origin, setOrigin] = useState<Array<Record<string, unknown>>>([]);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [preview, setPreview] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [annBody, setAnnBody] = useState("");
  const dirtyRef = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistRef = useRef<() => Promise<void>>(async () => undefined);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExt.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false }),
      Placeholder.configure({
        placeholder: "Begin on the page…",
      }),
    ],
    content: EMPTY_DOC,
    onUpdate: () => {
      dirtyRef.current = true;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        void persistRef.current();
      }, 2000);
    },
  });

  const persist = useCallback(async () => {
    if (!editor || !id || !ownerMode) return;
    setSaveState("saving");
    try {
      await patchOwnerWriting(id, {
        title,
        subtitle: subtitle || null,
        structuredContent: editor.getJSON(),
        showOrigin,
      });
      dirtyRef.current = false;
      setSaveState("saved");
    } catch {
      setSaveState("failed");
    }
  }, [editor, id, ownerMode, title, subtitle, showOrigin]);

  useEffect(() => {
    persistRef.current = persist;
  }, [persist]);

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void persistRef.current();
    }, 2000);
  }, []);

  useEffect(() => {
    if (!ownerMode) return;
    let cancelled = false;
    void getOwnerWriting(id)
      .then((data) => {
        if (cancelled) return;
        setTitle(data.writing.title);
        setSubtitle(data.writing.subtitle || "");
        setStatus(data.writing.status);
        setSlug(data.writing.slug);
        setShowOrigin(data.writing.show_origin === 1);
        setOrigin(data.origin || []);
        editor?.commands.setContent(
          data.writing.structured_content || EMPTY_DOC,
        );
        setLoaded(true);
        setSaveState("saved");
      })
      .catch(() => {
        if (!cancelled) navigate("/thoughts/longer");
      });
    return () => {
      cancelled = true;
    };
  }, [id, ownerMode, editor, navigate]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  if (!ownerMode) {
    return (
      <div className="writing-archive">
        <div className="writing-inner">
          <p className="writing-subtitle">Owner session required.</p>
          <Link to="/thoughts/longer" className="writing-btn">
            ← Longer thoughts
          </Link>
        </div>
      </div>
    );
  }

  if (!loaded || !editor) {
    return (
      <div className="writing-archive">
        <div className="writing-inner">
          <p className="writing-subtitle">Opening draft…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="writing-archive">
      <div className="writing-inner writing-inner--wide">
        <div className="writing-editor">
          <div className="writing-editor__top">
            <span>
              {status} · {new Date().toLocaleDateString()}
            </span>
            <Link to="/thoughts/longer">← Longer thoughts</Link>
          </div>

          <input
            className="writing-editor__title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              dirtyRef.current = true;
              scheduleSave();
            }}
            aria-label="Title"
          />
          <input
            className="writing-editor__subtitle"
            value={subtitle}
            onChange={(e) => {
              setSubtitle(e.target.value);
              dirtyRef.current = true;
              scheduleSave();
            }}
            placeholder="Subtitle (optional)"
            aria-label="Subtitle"
          />

          {!preview && (
            <>
              <div className="writing-editor__toolbar" role="toolbar">
                <button
                  type="button"
                  className={editor.isActive("bold") ? "is-active" : ""}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className={editor.isActive("italic") ? "is-active" : ""}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  Heading
                </button>
                <button
                  type="button"
                  className={editor.isActive("blockquote") ? "is-active" : ""}
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                >
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                  Divider
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = window.prompt("Image URL");
                    if (url && (/^https?:\/\//i.test(url) || url.startsWith("/"))) {
                      editor.chain().focus().setImage({ src: url }).run();
                    }
                  }}
                >
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = window.prompt("Link URL");
                    if (!url) return;
                    if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) return;
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                  }}
                >
                  Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const { from, to } = editor.state.selection;
                    const text = editor.state.doc.textBetween(from, to, " ");
                    if (!text.trim()) {
                      window.alert("Select text to tear out as a thought.");
                      return;
                    }
                    void tearOutThought(id, text.trim(), "private").then(() => {
                      window.alert("Torn out as a private thought.");
                    });
                  }}
                >
                  Tear out as thought
                </button>
              </div>
              <EditorContent editor={editor} />
            </>
          )}

          {preview && (
            <article className="writing-article" style={{ border: 0, padding: 0 }}>
              <h1 className="writing-title">{title}</h1>
              {subtitle ? <p className="writing-subtitle">{subtitle}</p> : null}
              <DocRenderer doc={editor.getJSON()} />
            </article>
          )}

          <div className="writing-editor__footer">
            <span className="writing-editor__status">
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && "Saved"}
              {saveState === "failed" && "Save failed"}
              {saveState === "idle" && "—"}
            </span>
            <label
              style={{
                fontFamily: "var(--font-wr-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--wr-muted)",
                display: "flex",
                gap: "0.4rem",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={showOrigin}
                onChange={(e) => {
                  setShowOrigin(e.target.checked);
                  dirtyRef.current = true;
                  scheduleSave();
                }}
              />
              Show origin
            </label>
            <button
              type="button"
              className="writing-btn"
              onClick={() => setPreview((p) => !p)}
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              type="button"
              className="writing-btn"
              onClick={() => void persist()}
            >
              Save now
            </button>
            {status === "public" ? (
              <button
                type="button"
                className="writing-btn"
                onClick={() => {
                  void unpublishOwnerWriting(id).then(() => setStatus("private"));
                }}
              >
                Unpublish
              </button>
            ) : (
              <button
                type="button"
                className="writing-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      `Publish “${title}” to the public archive?`,
                    )
                  ) {
                    void persist().then(() =>
                      publishOwnerWriting(id).then(() => {
                        setStatus("public");
                        navigate(`/writing/${slug}`);
                      }),
                    );
                  }
                }}
              >
                Publish
              </button>
            )}
            <button
              type="button"
              className="writing-btn"
              onClick={() => {
                void archiveOwnerWriting(id).then(() => navigate("/thoughts/longer"));
              }}
            >
              Archive
            </button>
            {status === "public" && (
              <Link className="writing-btn" to={`/writing/${slug}`}>
                View public
              </Link>
            )}
          </div>

          {origin.length > 0 && (
            <div className="writing-origin-panel">
              <p className="writing-eyebrow">Linked thoughts</p>
              {origin.map((o) => (
                <p key={String(o.id)} className="writing-origin__step">
                  {String(o.visibility)} — “
                  {String(o.edited_text || o.text || "")}”
                </p>
              ))}
            </div>
          )}

          <div className="writing-origin-panel">
            <p className="writing-eyebrow">Add marginalia</p>
            <textarea
              value={annBody}
              onChange={(e) => setAnnBody(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                fontFamily: "var(--font-wr-body)",
                border: "1px solid var(--wr-line)",
                padding: "0.5rem",
                marginBottom: "0.5rem",
              }}
              placeholder="A later note on this piece…"
            />
            <button
              type="button"
              className="writing-btn"
              onClick={() => {
                if (!annBody.trim()) return;
                void createWritingAnnotation(id, {
                  body: annBody.trim(),
                  visibility: "public",
                }).then(() => setAnnBody(""));
              }}
            >
              Publish margin note
            </button>
            <button
              type="button"
              className="writing-btn"
              onClick={() => {
                if (!annBody.trim()) return;
                void createWritingAnnotation(id, {
                  body: annBody.trim(),
                  visibility: "private",
                }).then(() => setAnnBody(""));
              }}
            >
              Private note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
