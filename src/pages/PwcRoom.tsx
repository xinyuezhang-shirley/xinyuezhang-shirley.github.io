import { useState } from "react";
import { Link } from "react-router-dom";
import "@/work/pwc/pwc-world.css";

const QUERIES = [
  {
    q: "What changed in the Q3 risk memo hierarchy?",
    route: "retrieval",
    agents: [
      { kind: "route", text: "Router → retrieval agent (document-grounded)" },
      { kind: "ok", text: "Retriever ranked 12 chunks · top source: risk_memo_v3.pdf §4" },
      { kind: "ok", text: "Post-process: citation attach + translation pass skipped" },
    ],
  },
  {
    q: "Summarize how the team explains cascading UI failures",
    route: "conversation",
    agents: [
      { kind: "route", text: "Router → conversational agent (synthesis)" },
      { kind: "ok", text: "Context: hierarchical store + nested render bugs" },
      { kind: "ok", text: "Answer drafted with eval flags on unsupported claims" },
    ],
  },
];

export default function PwcRoom() {
  const [idx, setIdx] = useState(0);
  const active = QUERIES[idx];

  return (
    <article className="pwc-world">
      <div className="pwc-world__inner">
        <Link to="/work" className="pwc-world__back">
          ← Work
        </Link>
        <p className="pwc-world__eyebrow">Mission control · PwC · Summer 2025</p>
        <h1 className="pwc-world__title">Multi-agent RAG routing</h1>
        <p className="pwc-world__claim">
          What makes an AI feature feel reliable usually has nothing to do with the model — it is
          routing, evaluation, and whether the UI can render the hierarchy without collapsing.
        </p>

        <div className="pwc-console">
          <div className="pwc-console__search">
            <input
              readOnly
              value={active.q}
              aria-label="Sample enterprise query"
            />
            <button
              type="button"
              onClick={() => setIdx((i) => (i + 1) % QUERIES.length)}
            >
              Run
            </button>
          </div>
          <div className="pwc-console__grid">
            <div className="pwc-pane">
              <h3>Agent trace · {active.route}</h3>
              {active.agents.map((a) => (
                <div key={a.text} className="pwc-agent">
                  <i className={a.kind === "route" ? "route" : undefined} />
                  <span>{a.text}</span>
                </div>
              ))}
            </div>
            <div className="pwc-pane">
              <h3>Knowledge topology</h3>
              <div className="pwc-graph">
                <svg viewBox="0 0 320 200" role="img" aria-label="Retrieval graph schematic">
                  <circle cx="160" cy="100" r="18" fill="#d04a02" />
                  <text x="160" y="104" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="IBM Plex Mono, monospace">
                    Q
                  </text>
                  {[
                    [60, 40, "Doc"],
                    [260, 40, "Doc"],
                    [50, 150, "Eval"],
                    [270, 150, "UI"],
                    [160, 30, "Route"],
                  ].map(([x, y, label], i) => (
                    <g key={String(label) + i}>
                      <line
                        x1="160"
                        y1="100"
                        x2={Number(x)}
                        y2={Number(y)}
                        stroke="#3db8c5"
                        strokeOpacity="0.55"
                      />
                      <circle cx={Number(x)} cy={Number(y)} r="14" fill="#141b24" stroke="#3db8c5" />
                      <text
                        x={Number(x)}
                        y={Number(y) + 3}
                        textAnchor="middle"
                        fill="#e7eef6"
                        fontSize="8"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        <section className="pwc-chapter">
          <h2>Context</h2>
          <p>
            Inside an internal RAG platform meant to answer plain questions over dense,
            hierarchical document sets. My lane: a Langflow multi-agent layer in front of retrieval
            — plus evaluation logic and the full-stack bugs that appear when nested data meets a
            fragile renderer.
          </p>
        </section>
        <section className="pwc-chapter">
          <h2>Technical decisions</h2>
          <p>
            Route each query between retrieval and conversation depending on what the question
            needs. Translation and response post-processing sit on top. Evaluation checks whether
            the right documents were retrieved — not whether the prose sounds confident.
          </p>
        </section>
        <section className="pwc-chapter">
          <h2>Reflection</h2>
          <p>
            Terracotta is a quiet nod to PwC identity; the room is mission control because that is
            the feeling of watching agents hand work between systems. Reliability is orchestration.
          </p>
        </section>
      </div>
    </article>
  );
}
