import { Link } from "react-router-dom";
import "@/styles/ask-shirley.css";
import { useAskShirleyChat } from "@/hooks/useAskShirleyChat";
import { useOwnerSession } from "@/hooks/useOwnerSession";
import {
  AskComposer,
  AskMark,
  AskMessageList,
} from "@/components/AskShirleyChat";
import { AskShirleyOwnerChrome } from "@/components/AskShirleyOwnerChrome";

export default function AskShirley() {
  const owner = useOwnerSession();
  const { messages, isTyping, error, sendMessage, clearChat } = useAskShirleyChat({
    onOwnerModeChange: (active) => {
      if (active) owner.markOwnerActive();
      else owner.markOwnerInactive();
    },
  });

  return (
    <div
      className={`ask-page ask-page--dm ask-shirley${owner.ownerMode ? " ask-page--owner" : ""}`}
    >
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
              <p className="ask-main__subtitle">
                {owner.ownerMode ? "private agent · owner mode" : "a conversation · not literally Shirley"}
              </p>
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

        <AskShirleyOwnerChrome
          ownerMode={owner.ownerMode}
          onEndSession={() => {
            void owner.endSession();
          }}
        />

        {owner.ownerMode && (
          <div className="ask-owner__bar" style={{ borderBottom: "none", paddingTop: 0 }}>
            <Link className="ask-text-btn" to="/insights">
              Site Insights →
            </Link>
          </div>
        )}

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
            placeholder={owner.ownerMode ? "message your agent..." : "say something..."}
            large
            diagonal
            allowAttachments={owner.ownerMode}
          />
        </div>
      </section>
    </div>
  );
}
