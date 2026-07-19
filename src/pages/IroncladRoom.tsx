import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/ironclad/ironclad-world.css";

const STEPS = [
  {
    id: "01",
    title: "Chat intake",
    note: "Procurement arrives as conversation — intent, counterparties, constraints.",
  },
  {
    id: "02",
    title: "Orchestrate",
    note: "Agents coordinate retrieval, decisions, and downstream execution paths.",
  },
  {
    id: "03",
    title: "Classify & risk",
    note: "Specialized agents read metadata and business context for provenance-aware advice.",
  },
  {
    id: "04",
    title: "Redline",
    note: "Structured outputs feed review and negotiation without losing the audit trail.",
  },
  {
    id: "05",
    title: "Execute",
    note: "Signed artifact + recommendations become institutional memory.",
  },
] as const;

/**
 * Ironclad world — legal workflow as living infrastructure.
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
        <p className="iron-world__eyebrow">
          Software Engineering Intern · Ironclad · Jun 2026 – Present
        </p>
        <h1 className="iron-world__title">Ironclad</h1>
        <p className="iron-world__claim">
          Chat-based procurement becomes a structured contract lifecycle — agents for retrieval,
          classification, risk, and execution, with humans still holding judgment.
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
            <span>Orchestration</span>
            <span>Classification</span>
            <span>Risk</span>
            <span>Provenance</span>
          </div>
        </div>

        <section className="iron-chapter">
          <h2>Context</h2>
          <p>
            Contract lifecycle management is orchestration under uncertainty: which playbook, which
            reviewer, which clause is dangerous, what must be remembered after the ink dries. The
            internship is building the end-to-end platform that turns chat into that pipeline.
          </p>
        </section>
        <section className="iron-chapter">
          <h2>Scope</h2>
          <p>
            Architecting an end-to-end contract lifecycle platform that transforms chat-based
            procurement requests into structured contracting workflows — coordinating agent
            orchestration, information retrieval, decision-making, and downstream execution.
          </p>
          <p>
            Developing specialized contract classification and risk assessment agents that leverage
            retrieved contract metadata and business context to generate provenance-aware
            recommendations and structured outputs for redlining, execution, and review.
          </p>
        </section>
        <section className="iron-chapter">
          <h2>Reflection</h2>
          <p>
            Navy, teal, and gold read as institutional trust without cosplaying a logo. The page
            should feel like infrastructure you can watch breathe — because the work is the
            infrastructure.
          </p>
        </section>
      </div>
    </article>
  );
}
