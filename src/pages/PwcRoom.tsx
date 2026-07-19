import { useState } from "react";
import { Link } from "react-router-dom";
import "@/work/pwc/pwc-world.css";

type StageId =
  | "query"
  | "translate-in"
  | "supervisor"
  | "retrieval"
  | "rag"
  | "translate-out"
  | "eval";

const SANITIZED_QUERY =
  "Where can I find the updated onboarding checklist for my reorganized business unit?";

const STAGES: {
  id: StageId;
  step: string;
  title: string;
  body: string;
  artifact: string;
}[] = [
  {
    id: "query",
    step: "01",
    title: "Sanitized employee query",
    body: "A single public-safe example stands in for real workforce questions after an org restructure. Employees need documentation they no longer know how to find.",
    artifact:
      "Query (sanitized): “Where can I find the updated onboarding checklist for my reorganized business unit?”",
  },
  {
    id: "translate-in",
    step: "02",
    title: "Preprocess · translate to English",
    body: "Translation moved out of the answer prompt. In-prompt translation was breaking citation blocks. The query is translated to English first so retrieval and RAG see a stable language surface.",
    artifact:
      "Preprocess output: English query string ready for routing · original locale retained for response packaging.",
  },
  {
    id: "supervisor",
    step: "03",
    title: "Supervisor routes the path",
    body: "Langflow multi-agent orchestration: a supervisor decides chatbot-style handling versus knowledge retrieval. Documentation questions take the knowledge path.",
    artifact:
      "Supervisor decision: knowledge retrieval · not freeform chat · handoff to Azure AI Search tool.",
  },
  {
    id: "retrieval",
    step: "04",
    title: "Azure AI Search · semantic retrieval",
    body: "The knowledge agent calls Azure AI Search for semantic retrieval over internal documentation — the grounding layer meant to minimize hallucinations for a 300K+ workforce design target.",
    artifact:
      "Retrieval: ranked chunks with document IDs and section anchors (citations preserved as structured fields).",
  },
  {
    id: "rag",
    step: "05",
    title: "RAG answer with citations",
    body: "Retrieved context grounds the answer. Citations stay attached as structured metadata rather than fragile inlined prose that translation used to scramble.",
    artifact:
      "Draft answer + citation list · each claim pointed at a retrieved source span.",
  },
  {
    id: "translate-out",
    step: "06",
    title: "Translate structured output back",
    body: "After generation, structured output (answer + citations) is translated back to the user language. Separating translate-in / pipeline / translate-out kept citation integrity intact.",
    artifact:
      "Localized answer package · citation blocks unchanged as structured references.",
  },
  {
    id: "eval",
    step: "07",
    title: "Eval · coverage & hallucination flags",
    body: "Benchmark questions carry expected answer points. An AI eval checks topic coverage and raises hallucination flags when the answer drifts from retrieved evidence.",
    artifact:
      "Eval result (schematic): topic coverage pass · hallucination flag clear · citation present.",
  },
];

const INTERN_WORK = [
  {
    title: "Prompt templates",
    text: "Templates for supervisor routing, retrieval tool use, and grounded response generation.",
  },
  {
    title: "Translation layer",
    text: "Moved translate-from-in-prompt to preprocess English + postprocess structured output.",
  },
  {
    title: "Azure AI Search routing",
    text: "Tool routing so knowledge questions hit semantic retrieval instead of ungrounded chat.",
  },
];

/**
 * PwC · multi-agent knowledge assistant
 * Light / off-white surface with official warm palette — not a dark dashboard.
 */
export default function PwcRoom() {
  const [active, setActive] = useState<StageId>("query");
  const stage = STAGES.find((s) => s.id === active) ?? STAGES[0];
  const activeIndex = STAGES.findIndex((s) => s.id === active);

  function go(delta: number) {
    const next = Math.min(STAGES.length - 1, Math.max(0, activeIndex + delta));
    setActive(STAGES[next].id);
  }

  return (
    <article className="pwc-world">
      <div className="pwc-world__inner">
        <Link to="/work" className="pwc-world__back">
          ← Back to Work
        </Link>

        <header className="pwc-hero">
          <p className="pwc-hero__eyebrow">
            PwC (PricewaterhouseCoopers) · Software Engineering Intern · Jun–Aug 2025
          </p>
          <h1 className="pwc-hero__title">Multi-agent knowledge assistant</h1>
          <p className="pwc-hero__lede">
            An internal AI assistant that helps employees navigate documentation after
            organizational restructure — grounded in docs, routed by a Langflow supervisor, and
            checked for hallucinations.
          </p>
          <dl className="pwc-meta">
            <div>
              <dt>Company</dt>
              <dd>PwC</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Software Engineering Intern</dd>
            </div>
            <div>
              <dt>Design target</dt>
              <dd>300K+ global workforce</dd>
            </div>
            <div>
              <dt>Eval corpus</dt>
              <dd>50+ internal docs · hundreds of queries</dd>
            </div>
          </dl>
        </header>

        <section className="pwc-section" aria-labelledby="pwc-trace">
          <h2 id="pwc-trace">Central interaction · follow one sanitized query</h2>
          <p className="pwc-section__intro">
            Step through the path of a single sanitized question. No proprietary screenshots — only
            a public schematic of routing, retrieval, translation, and eval.
          </p>

          <div className="pwc-query-card">
            <p className="pwc-query-card__label">Sanitized query under inspection</p>
            <p className="pwc-query-card__text">{SANITIZED_QUERY}</p>
            <div className="pwc-query-card__actions">
              <button
                type="button"
                className="pwc-btn pwc-btn--ghost"
                onClick={() => go(-1)}
                disabled={activeIndex === 0}
              >
                Previous stage
              </button>
              <button
                type="button"
                className="pwc-btn"
                onClick={() => go(1)}
                disabled={activeIndex === STAGES.length - 1}
              >
                Advance to next stage
              </button>
              <button
                type="button"
                className="pwc-btn pwc-btn--soft"
                onClick={() => setActive("query")}
              >
                Reset to query start
              </button>
            </div>
          </div>

          <div className="pwc-stages" role="list">
            {STAGES.map((s, i) => {
              const open = s.id === active;
              const done = i < activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  className={`pwc-stage${open ? " is-open" : ""}${done ? " is-done" : ""}`}
                  aria-expanded={open}
                  onClick={() => setActive(s.id)}
                >
                  <span className="pwc-stage__step">Stage {s.step}</span>
                  <span className="pwc-stage__title">{s.title}</span>
                  <span className="pwc-stage__hint">
                    {open ? "Currently viewing this stage" : "Click to open this stage"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pwc-stage-panel" aria-live="polite">
            <p className="pwc-stage-panel__kicker">
              Stage {stage.step} of {String(STAGES.length).padStart(2, "0")}
            </p>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
            <div className="pwc-artifact">
              <p className="pwc-artifact__label">Stage artifact</p>
              <p>{stage.artifact}</p>
            </div>
          </div>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-arch">
          <h2 id="pwc-arch">Architecture</h2>
          <div className="pwc-arch">
            <div className="pwc-arch__node">
              <h3>Supervisor</h3>
              <p>Routes chatbot vs knowledge retrieval in Langflow.</p>
            </div>
            <div className="pwc-arch__node">
              <h3>Knowledge path</h3>
              <p>Azure AI Search semantic retrieval → RAG answer with citations.</p>
            </div>
            <div className="pwc-arch__node">
              <h3>Translation layer</h3>
              <p>Translate query in → run pipeline → translate structured output out.</p>
            </div>
            <div className="pwc-arch__node">
              <h3>Evaluation</h3>
              <p>QA benchmark + expected points · coverage and hallucination flags.</p>
            </div>
          </div>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-context">
          <h2 id="pwc-context">Context</h2>
          <p>
            After organizational restructure, employees needed help finding documentation that had
            moved. The assistant&apos;s job was navigation with grounding — minimize hallucinations
            by answering from docs, not from model memory alone.
          </p>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-resp">
          <h2 id="pwc-resp">Responsibilities · intern scope</h2>
          <div className="pwc-cards">
            {INTERN_WORK.map((item) => (
              <div key={item.title} className="pwc-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-system">
          <h2 id="pwc-system">System</h2>
          <p>
            Langflow multi-agent design: supervisor routes between chatbot handling and knowledge
            retrieval. Knowledge questions use Azure AI Search for semantic retrieval, then a
            citation-grounded RAG response. Translation is a preprocess / postprocess layer so
            citation structure is not rewritten inside the generation prompt.
          </p>
          <p>
            Separate from the agent path, backend storage and frontend rendering were refactored to
            fix hierarchical consistency and cascading UI failures after documentation hierarchies
            changed with the restructure.
          </p>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-outcomes">
          <h2 id="pwc-outcomes">Outcomes</h2>
          <ul className="pwc-outcomes">
            <li>
              <strong>Grounded answers</strong>
              <span>Architecture aimed at doc-grounded responses with citations for workforce scale.</span>
            </li>
            <li>
              <strong>Citation-safe translation</strong>
              <span>Query/result translation no longer destroyed citation blocks.</span>
            </li>
            <li>
              <strong>Measurable eval</strong>
              <span>
                Human-curated benchmark over 50+ documents and hundreds of representative queries —
                topic coverage and hallucination detection in the loop.
              </span>
            </li>
          </ul>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-skills">
          <h2 id="pwc-skills">Skills</h2>
          <ul className="pwc-skills">
            <li>Langflow multi-agent orchestration</li>
            <li>Azure AI Search tool routing</li>
            <li>Citation-grounded RAG</li>
            <li>Prompt template design</li>
            <li>Translation preprocessing / postprocessing</li>
            <li>Benchmark-driven evaluation</li>
            <li>Hierarchical data + UI reliability fixes</li>
          </ul>
        </section>

        <section className="pwc-section" aria-labelledby="pwc-xf">
          <h2 id="pwc-xf">Cross-functional</h2>
          <p>
            The design target was PwC&apos;s global workforce of 300K+ employees navigating newly
            restructured documentation. Reliability meant both retrieval quality and whether the
            documentation UI still rendered hierarchy correctly after org changes.
          </p>
        </section>

        <section className="pwc-section pwc-nda" aria-labelledby="pwc-nda">
          <h2 id="pwc-nda">NDA &amp; disclosure</h2>
          <p>
            Only a sanitized query appears here. No fake proprietary screenshots, no real internal
            document text, and no confidential evaluation items. Stage artifacts are schematic
            descriptions of the public architecture narrative.
          </p>
        </section>
      </div>
    </article>
  );
}
