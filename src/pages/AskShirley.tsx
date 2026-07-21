import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/ask-shirley.css";
import { useAskShirleyChat } from "@/hooks/useAskShirleyChat";
import {
  ASK_SHIRLEY_CATEGORIES,
  questionsForCategory,
  type AskShirleyCategory,
} from "@/ask-shirley/questions";
import {
  AskComposer,
  AskMark,
  AskMessageList,
} from "@/components/AskShirleyChat";

export default function AskShirley() {
  const { messages, isTyping, error, sendMessage, clearChat } = useAskShirleyChat();
  const [category, setCategory] = useState<AskShirleyCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const questions = useMemo(() => questionsForCategory(category), [category]);
  const visible = showAll ? questions : questions.slice(0, 7);
  const remaining = Math.max(0, questions.length - visible.length);

  function pickQuestion(text: string) {
    setSidebarOpen(false);
    void sendMessage(text);
  }

  return (
    <div className="ask-page ask-shirley">
      <div className="ask-page__noise-corner ask-page__noise-corner--tl" aria-hidden="true" />
      <div className="ask-page__noise-corner ask-page__noise-corner--br" aria-hidden="true" />
      <div className="ask-scanlines" aria-hidden="true" />
      <div className="ask-noise" aria-hidden="true" />

      {sidebarOpen && (
        <button
          type="button"
          className="ask-sidebar-backdrop"
          aria-label="Close suggested questions"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`ask-sidebar${sidebarOpen ? " is-open" : ""}`}
        aria-label="Ask Shirley navigation"
      >
        <div className="ask-sidebar__brand">
          <AskMark />
          <div>
            <h1 className="ask-sidebar__title">Ask Shirley</h1>
            <p className="ask-sidebar__subtitle">digital conversation interface</p>
          </div>
        </div>

        <ul className="ask-cats" role="list">
          {ASK_SHIRLEY_CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={`ask-cats__btn${category === cat.id ? " is-active" : ""}`}
                aria-pressed={category === cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setShowAll(false);
                }}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ask-suggested">
          <p className="ask-suggested__label">Suggested questions</p>
          <ul className="ask-suggested__list" role="list">
            {visible.map((q) => (
              <li key={q.id}>
                <button
                  type="button"
                  className="ask-suggested__btn"
                  onClick={() => pickQuestion(q.text)}
                >
                  <span className="ask-suggested__num">{q.number}</span>
                  <span className="ask-suggested__text">{q.text}</span>
                </button>
              </li>
            ))}
          </ul>
          {!showAll && remaining > 0 && (
            <button
              type="button"
              className="ask-suggested__more"
              onClick={() => setShowAll(true)}
            >
              {remaining} more questions →
            </button>
          )}
        </div>
      </aside>

      <section className="ask-main" aria-label="Conversation log">
        <div className="ask-main__top">
          <Link to="/" className="ask-back">
            ← Back to site
          </Link>
          <button
            type="button"
            className="ask-text-btn"
            onClick={clearChat}
          >
            Reset conversation
          </button>
          <button
            type="button"
            className="ask-mobile-toggle"
            aria-label="Open suggested questions"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <span />
          </button>
          <AskMark size="sm" />
        </div>

        <p className="ask-main__log-label">Conversation log</p>
        <AskMessageList messages={messages} isTyping={isTyping} />
        {error && (
          <p className="ask-error" role="alert" style={{ margin: "0 1.25rem 0.75rem" }}>
            {error}
          </p>
        )}

        <div className="ask-main__composer">
          <AskComposer
            onSend={sendMessage}
            disabled={isTyping}
            placeholder="Type your question..."
            large
            diagonal
          />
          <p className="ask-page__disclaimer">AI interpretation — not actually Shirley</p>
        </div>
      </section>
    </div>
  );
}
