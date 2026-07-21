/**
 * Dev-only authoring tool for Ask Shirley example answers.
 * Not linked from production navigation. Production builds redirect away
 * unless VITE_ASK_SHIRLEY_AUTHOR=true (explicit opt-in).
 */

import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { examples as seedExamples } from "@/ask-shirley/examples";
import { ASK_SHIRLEY_QUESTIONS } from "@/ask-shirley/questions";
import {
  isPlaceholderAnswer,
  type ShirleyExample,
} from "@/ask-shirley/types";
import { AskMark } from "@/components/AskShirleyChat";
import "@/styles/ask-shirley.css";

const DRAFT_KEY = "ask-shirley:author:drafts:v1";

function authoringEnabled(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_ASK_SHIRLEY_AUTHOR === "true";
}

function loadDrafts(): Record<string, string> {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export default function AskShirleyAuthor() {
  const enabled = authoringEnabled();
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    enabled ? loadDrafts() : {},
  );
  const [filter, setFilter] = useState<"all" | "incomplete" | "complete">("all");
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
    } catch {
      /* ignore */
    }
  }, [drafts, enabled]);

  const rows = useMemo(() => {
    return ASK_SHIRLEY_QUESTIONS.map((q) => {
      const seed = seedExamples.find((e) => e.id === q.id);
      const seedAnswer = seed?.answer ?? "";
      const draft = drafts[q.id];
      const answer = draft !== undefined ? draft : seedAnswer;
      const complete = answer.trim().length > 0 && !isPlaceholderAnswer(answer);
      return {
        question: q,
        seed,
        answer,
        complete,
        category: seed?.category ?? q.category,
        relatedKnowledgeIds: seed?.relatedKnowledgeIds ?? [],
      };
    });
  }, [drafts]);

  if (!enabled) {
    return <Navigate to="/ask" replace />;
  }

  const visible = rows.filter((r) => {
    if (filter === "incomplete") return !r.complete;
    if (filter === "complete") return r.complete;
    return true;
  });

  const completedCount = rows.filter((r) => r.complete).length;
  const preview = previewId ? rows.find((r) => r.question.id === previewId) : null;

  function setAnswer(id: string, value: string) {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  }

  function exportJson() {
    const payload: ShirleyExample[] = rows.map((r) => ({
      id: r.question.id,
      category: r.category,
      question: r.question.text,
      answer: r.answer.trim(),
      relatedKnowledgeIds: r.relatedKnowledgeIds,
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ask-shirley-examples-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="ask-author ask-shirley">
      <header className="ask-author__header">
        <div className="ask-author__brand">
          <AskMark />
          <div>
            <h1 className="ask-author__title">Ask Shirley · Author</h1>
            <p className="ask-author__subtitle">
              Dev-only · {completedCount}/{rows.length} complete · drafts stay in this browser
            </p>
          </div>
        </div>
        <div className="ask-author__actions">
          <Link to="/ask" className="ask-text-btn">
            Open chat
          </Link>
          <button type="button" className="ask-text-btn" onClick={exportJson}>
            Export JSON
          </button>
        </div>
      </header>

      <div className="ask-author__filters" role="group" aria-label="Filter questions">
        {(["all", "incomplete", "complete"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`ask-cats__btn${filter === f ? " is-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="ask-author__layout">
        <ul className="ask-author__list" role="list">
          {visible.map((row) => (
            <li key={row.question.id} className="ask-author__item">
              <div className="ask-author__item-top">
                <span className="ask-author__num">{row.question.number}</span>
                <span className="ask-author__cat">{row.category}</span>
                <span
                  className={`ask-author__status${row.complete ? " is-complete" : " is-incomplete"}`}
                >
                  {row.complete ? "complete" : "incomplete"}
                </span>
              </div>
              <p className="ask-author__q">{row.question.text}</p>
              <label className="sr-only" htmlFor={`author-${row.question.id}`}>
                Answer for {row.question.text}
              </label>
              <textarea
                id={`author-${row.question.id}`}
                className="ask-author__textarea"
                rows={6}
                value={row.answer}
                onChange={(e) => setAnswer(row.question.id, e.target.value)}
                onFocus={() => setPreviewId(row.question.id)}
              />
              <div className="ask-author__meta">
                <span>{row.answer.trim().length} chars</span>
                <button
                  type="button"
                  className="ask-text-btn"
                  onClick={() => setPreviewId(row.question.id)}
                >
                  Preview
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="ask-author__preview" aria-label="Chat preview">
          <p className="ask-author__preview-label">Chat preview</p>
          {preview ? (
            <article className="ask-msg ask-msg--assistant">
              <div className="ask-msg__meta">
                <AskMark size="sm" />
                <span>Ask Shirley</span>
              </div>
              <p className="ask-author__preview-q">{preview.question.text}</p>
              <div className="ask-msg__bubble">{preview.answer}</div>
            </article>
          ) : (
            <p className="ask-author__preview-empty">Select a question to preview.</p>
          )}
          <p className="ask-author__hint">
            After exporting, paste completed answers into{" "}
            <code>src/ask-shirley/examples.ts</code> (or merge by id).
          </p>
        </aside>
      </div>
    </div>
  );
}
