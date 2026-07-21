import { Link } from "react-router-dom";
import "@/styles/ask-shirley.css";
import { useAskShirleyChat } from "@/hooks/useAskShirleyChat";
import {
  AskComposer,
  AskMark,
  AskMessageList,
} from "@/components/AskShirleyChat";

export default function AskShirley() {
  const { messages, isTyping, error, sendMessage, clearChat } = useAskShirleyChat();

  return (
    <div className="ask-page ask-page--dm ask-shirley">
      <div className="ask-page__noise-corner ask-page__noise-corner--tl" aria-hidden="true" />
      <div className="ask-page__noise-corner ask-page__noise-corner--br" aria-hidden="true" />
      <div className="ask-scanlines" aria-hidden="true" />
      <div className="ask-noise" aria-hidden="true" />

      <section className="ask-main" aria-label="Conversation with Shirley">
        <div className="ask-main__top">
          <div className="ask-main__brand">
            <AskMark size="sm" />
            <div>
              <h1 className="ask-main__title">Ask Shirley</h1>
              <p className="ask-main__subtitle">a conversation · not literally Shirley</p>
            </div>
          </div>
          <div className="ask-main__top-actions">
            <Link to="/" className="ask-back">
              ← Back
            </Link>
            <button type="button" className="ask-text-btn ask-text-btn--subtle" onClick={clearChat}>
              Reset
            </button>
          </div>
        </div>

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
            placeholder="say something..."
            large
            diagonal
          />
        </div>
      </section>
    </div>
  );
}
