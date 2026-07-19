import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/ironclad/ironclad-world.css";

const STEPS = [
  { id: "01", title: "Intake", note: "Contract arrives with metadata, counterparties, jurisdiction." },
  { id: "02", title: "Route", note: "Workflow chooses reviewers, playbooks, and escalation paths." },
  { id: "03", title: "Analyze", note: "Risk clauses, obligations, and anomalies surface for humans." },
  { id: "04", title: "Negotiate", note: "Redlines move through an orchestrated approval graph." },
  { id: "05", title: "Execute", note: "Signed artifact + audit trail become institutional memory." },
] as const;

/**
 * Ironclad world — legal workflow as living infrastructure.
 * Personal role bullets were not in the resume archive; visual thesis leads.
 */
export default function IroncladRoom() {
  const [hot, setHot] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = window.setInterval(() => setHot((i) => (i + 1) % STEPS.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <article className="iron-world">
      <div className="iron-world__inner">
        <Link to="/work" className="iron-world__back">
          ← Work
        </Link>
        <p className="iron-world__eyebrow">Contract lifecycle · Intelligent infrastructure</p>
        <h1 className="iron-world__title">Ironclad</h1>
        <p className="iron-world__claim">
          Legal work is a pipeline of documents, decisions, and risk — not a stack of slides about an
          internship.
        </p>

        <div className="iron-pipeline" role="list">
          {STEPS.map((step, i) => (
            <button
              key={step.id}
              type="button"
              role="listitem"
              className={`iron-step${i === hot ? " is-hot" : ""}`}
              onClick={() => setHot(i)}
              style={{ textAlign: "left", cursor: "pointer", font: "inherit", width: "100%" }}
            >
              <p className="iron-step__id">{step.id}</p>
              <h3>{step.title}</h3>
              <p>{step.note}</p>
            </button>
          ))}
        </div>

        <div className="iron-doc">
          <div className="iron-doc__meta">Active artifact · stage {STEPS[hot].title}</div>
          <p className="iron-doc__title">Master Services Agreement · Acme ↔ Ironclad workflow</p>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem", lineHeight: 1.5 }}>
            Documents do not sit still. They route, wait, escalate, and accumulate meaning — clause
            risk, signatory state, audit metadata — until execution turns motion into record.
          </p>
          <div className="iron-doc__tags">
            <span>Routing</span>
            <span>AI assist</span>
            <span>Risk</span>
            <span>Audit</span>
          </div>
        </div>

        <section className="iron-chapter">
          <h2>Context</h2>
          <p>
            Contract lifecycle management is orchestration under uncertainty: which playbook, which
            reviewer, which clause is dangerous, what must be remembered after the ink dries.
          </p>
        </section>
        <section className="iron-chapter">
          <h2>Visual thesis</h2>
          <p>
            This room refuses the internship-PowerPoint pattern. Instead it shows contracts as
            packets moving through intelligent infrastructure — intake to execute — with humans still
            holding judgment at every escalation.
          </p>
        </section>
        <section className="iron-chapter">
          <h2>Reflection</h2>
          <p>
            Navy, teal, and gold read as institutional trust without cosplaying a logo. The page
            should feel like infrastructure you can watch breathe.
          </p>
          <p className="iron-note">
            Owner note: personal Ironclad role bullets were not in the resume archive used for this
            build. Swap in your exact scope when ready — the visual world is ready to carry them.
          </p>
        </section>
      </div>
    </article>
  );
}
