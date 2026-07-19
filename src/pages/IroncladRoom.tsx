import { useState } from "react";
import { Link } from "react-router-dom";
import "@/work/ironclad/ironclad-world.css";

type FieldStatus = "empty" | "draft" | "review" | "accepted" | "planned";

type ContractField = {
  key: string;
  label: string;
  value: string;
  status: FieldStatus;
  note: string;
};

type StageId =
  | "chat"
  | "intake"
  | "classify"
  | "retrieve"
  | "structure"
  | "risk"
  | "review"
  | "execute";

const STAGES: {
  id: StageId;
  step: string;
  title: string;
  status: "in-progress" | "planned";
  body: string;
  fields: Partial<Record<string, { value: string; status: FieldStatus; note: string }>>;
  gate?: string;
}[] = [
  {
    id: "chat",
    step: "01",
    title: "Chat procurement request",
    status: "in-progress",
    body: "A sanitized procurement request arrives as conversation — intent, counterparties, and constraints in natural language rather than a form.",
    fields: {
      intent: {
        value: "Need MSA for vendor onboarding this quarter",
        status: "draft",
        note: "Parsed from chat utterance",
      },
    },
  },
  {
    id: "intake",
    step: "02",
    title: "Normalize intent",
    status: "in-progress",
    body: "Agent orchestration begins: the chat is normalized into workflow intent so downstream retrieval and structuring have a stable object to fill.",
    fields: {
      intent: {
        value: "Create / negotiate Master Services Agreement",
        status: "accepted",
        note: "Human-confirmed workflow intent",
      },
      parties: {
        value: "Acme Procurement ↔ Preferred Vendor Co.",
        status: "draft",
        note: "Extracted counterparties pending confirmation",
      },
    },
    gate: "Human review gate · confirm parties before retrieval",
  },
  {
    id: "classify",
    step: "03",
    title: "Classification agent",
    status: "in-progress",
    body: "A specialized classification agent reads metadata and business context to place the request into a contracting playbook — not yet a final legal judgment.",
    fields: {
      parties: {
        value: "Acme Procurement ↔ Preferred Vendor Co.",
        status: "accepted",
        note: "Confirmed at intake gate",
      },
      contractType: {
        value: "Master Services Agreement",
        status: "draft",
        note: "Classification proposal",
      },
      playbook: {
        value: "Vendor MSA · standard enterprise path",
        status: "draft",
        note: "Suggested orchestration path",
      },
    },
  },
  {
    id: "retrieve",
    step: "04",
    title: "Retrieval & provenance",
    status: "in-progress",
    body: "Information retrieval pulls prior contract metadata and business context. Recommendations stay provenance-aware — every suggested field should point back to a source.",
    fields: {
      contractType: {
        value: "Master Services Agreement",
        status: "accepted",
        note: "Accepted classification",
      },
      playbook: {
        value: "Vendor MSA · standard enterprise path",
        status: "accepted",
        note: "Playbook locked for this run",
      },
      termMonths: {
        value: "24 months (from prior vendor MSA pattern)",
        status: "draft",
        note: "Retrieved precedent · needs review",
      },
      governingLaw: {
        value: "California (from company default profile)",
        status: "draft",
        note: "Business-context default",
      },
    },
  },
  {
    id: "structure",
    step: "05",
    title: "Structured contract object",
    status: "in-progress",
    body: "Fields fill into a structured contracting object. Chat becomes workflow state — still editable, still auditable — before any execution path runs.",
    fields: {
      termMonths: {
        value: "24 months",
        status: "review",
        note: "Awaiting human acceptance",
      },
      governingLaw: {
        value: "State of California",
        status: "review",
        note: "Awaiting human acceptance",
      },
      liabilityCap: {
        value: "12× fees (playbook default)",
        status: "draft",
        note: "Structured from playbook template",
      },
    },
    gate: "Human review gate · accept or edit structured fields",
  },
  {
    id: "risk",
    step: "06",
    title: "Risk assessment agent",
    status: "planned",
    body: "Risk assessment is an evolving / planned specialization in this internship. The intended shape: provenance-aware risk notes that inform redlining and review — not autonomous legal approval.",
    fields: {
      liabilityCap: {
        value: "12× fees (playbook default)",
        status: "planned",
        note: "Risk agent output · planned depth",
      },
      riskNotes: {
        value: "Flag unusual indemnity / data-processing clauses when present",
        status: "planned",
        note: "Planned recommendation surface",
      },
    },
  },
  {
    id: "review",
    step: "07",
    title: "Redline & review outputs",
    status: "in-progress",
    body: "Structured outputs feed redlining, execution prep, and human review. Agents propose; humans keep judgment. Provenance remains attached to recommendations.",
    fields: {
      termMonths: {
        value: "24 months",
        status: "accepted",
        note: "Accepted at structure gate",
      },
      governingLaw: {
        value: "State of California",
        status: "accepted",
        note: "Accepted at structure gate",
      },
      liabilityCap: {
        value: "12× fees",
        status: "review",
        note: "Counsel review in progress",
      },
      riskNotes: {
        value: "No critical flags on baseline MSA pattern (schematic)",
        status: "planned",
        note: "Risk depth still evolving",
      },
    },
    gate: "Human review gate · counsel / operator sign-off before execution",
  },
  {
    id: "execute",
    step: "08",
    title: "Execution path",
    status: "planned",
    body: "Downstream execution turns the structured object into institutional record. Full product delivery is not claimed — this internship is architecting and developing the lifecycle, with execution wiring still maturing.",
    fields: {
      liabilityCap: {
        value: "12× fees",
        status: "accepted",
        note: "Cleared for execution path when ready",
      },
      executionState: {
        value: "Ready for signature routing (target state)",
        status: "planned",
        note: "Execution orchestration · planned / in progress",
      },
    },
  },
];

const FIELD_ORDER = [
  "intent",
  "parties",
  "contractType",
  "playbook",
  "termMonths",
  "governingLaw",
  "liabilityCap",
  "riskNotes",
  "executionState",
] as const;

const FIELD_LABELS: Record<string, string> = {
  intent: "Intent",
  parties: "Parties",
  contractType: "Contract type",
  playbook: "Playbook",
  termMonths: "Term",
  governingLaw: "Governing law",
  liabilityCap: "Liability cap",
  riskNotes: "Risk notes",
  executionState: "Execution state",
};

const SANITIZED_CHAT =
  "We need to onboard Preferred Vendor Co. under an MSA this quarter — standard enterprise terms if possible, California governing law.";

/**
 * Ironclad · contract lifecycle platform (internship in progress)
 * Carefully distinguishes implemented / in-progress work from planned depth.
 */
export default function IroncladRoom() {
  const [active, setActive] = useState<StageId>("chat");
  const stage = STAGES.find((s) => s.id === active) ?? STAGES[0];
  const activeIndex = STAGES.findIndex((s) => s.id === active);

  const contractFields: ContractField[] = FIELD_ORDER.map((key) => {
    const patch = stage.fields[key];
    if (!patch) {
      return {
        key,
        label: FIELD_LABELS[key],
        value: "—",
        status: "empty" as const,
        note: "Not yet filled at this stage",
      };
    }
    return {
      key,
      label: FIELD_LABELS[key],
      value: patch.value,
      status: patch.status,
      note: patch.note,
    };
  });

  function go(delta: number) {
    const next = Math.min(STAGES.length - 1, Math.max(0, activeIndex + delta));
    setActive(STAGES[next].id);
  }

  return (
    <article className="iron-world">
      <div className="iron-world__inner">
        <Link to="/work" className="iron-world__back">
          ← Back to Work
        </Link>

        <header className="iron-hero">
          <p className="iron-hero__eyebrow">
            Ironclad · Software Engineering Intern · Jun 2026 – Present
          </p>
          <h1 className="iron-hero__title">Contract lifecycle from chat</h1>
          <p className="iron-hero__lede">
            Architecting an end-to-end path from chat-based procurement to structured contracting
            workflows — agent orchestration, retrieval, decision support, and execution — with
            humans holding the gates.
          </p>
          <div className="iron-badge-row">
            <span className="iron-badge iron-badge--live">Internship in progress</span>
            <span className="iron-badge iron-badge--plan">Risk depth marked planned where evolving</span>
          </div>
          <dl className="iron-meta">
            <div>
              <dt>Company</dt>
              <dd>Ironclad</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Software Engineering Intern</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Chat → structured contract lifecycle</dd>
            </div>
            <div>
              <dt>Claim boundary</dt>
              <dd>Architecture &amp; development — not full product delivery</dd>
            </div>
          </dl>
        </header>

        <section className="iron-section" aria-labelledby="iron-trace">
          <h2 id="iron-trace">Central interaction · chat becomes a contract object</h2>
          <p className="iron-section__intro">
            Follow a sanitized procurement request as fields fill stage by stage. Human review gates
            pause the path. Stages tagged Planned are evolving work — not claimed as finished
            product surfaces.
          </p>

          <div className="iron-chat">
            <p className="iron-chat__label">Sanitized chat request</p>
            <p className="iron-chat__text">{SANITIZED_CHAT}</p>
            <div className="iron-chat__actions">
              <button
                type="button"
                className="iron-btn iron-btn--ghost"
                onClick={() => go(-1)}
                disabled={activeIndex === 0}
              >
                Previous lifecycle stage
              </button>
              <button
                type="button"
                className="iron-btn"
                onClick={() => go(1)}
                disabled={activeIndex === STAGES.length - 1}
              >
                Advance lifecycle stage
              </button>
              <button
                type="button"
                className="iron-btn iron-btn--soft"
                onClick={() => setActive("chat")}
              >
                Reset to chat intake
              </button>
            </div>
          </div>

          <div className="iron-stages" role="list">
            {STAGES.map((s) => {
              const open = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  className={`iron-stage${open ? " is-open" : ""} iron-stage--${s.status}`}
                  aria-expanded={open}
                  onClick={() => setActive(s.id)}
                >
                  <span className="iron-stage__step">
                    Stage {s.step}
                    {s.status === "planned" ? " · Planned" : " · In progress"}
                  </span>
                  <span className="iron-stage__title">{s.title}</span>
                  <span className="iron-stage__hint">
                    {open ? "Viewing this stage’s field updates" : "Click to show field updates"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="iron-workspace">
            <div className="iron-stage-panel" aria-live="polite">
              <p className="iron-stage-panel__kicker">
                {stage.step} · {stage.status === "planned" ? "Planned / evolving" : "In progress"}
              </p>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              {stage.gate ? (
                <div className="iron-gate" role="status">
                  <strong>Human review gate</strong>
                  <span>{stage.gate}</span>
                </div>
              ) : null}
            </div>

            <div className="iron-object">
              <div className="iron-object__head">
                <h3>Structured contract object</h3>
                <p>Field-by-field state at this stage (schematic · sanitized)</p>
              </div>
              <ul className="iron-fields">
                {contractFields.map((f) => (
                  <li key={f.key} className={`iron-field iron-field--${f.status}`}>
                    <div className="iron-field__top">
                      <span className="iron-field__label">{f.label}</span>
                      <span className="iron-field__status">{statusLabel(f.status)}</span>
                    </div>
                    <p className="iron-field__value">{f.value}</p>
                    <p className="iron-field__note">{f.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="iron-section" aria-labelledby="iron-context">
          <h2 id="iron-context">Context</h2>
          <p>
            Contract lifecycle management is orchestration under uncertainty: which playbook, which
            reviewer, which clause needs attention, and what must be remembered after execution.
            Ironclad&apos;s product space is the institutional memory of agreements — this internship
            focuses on turning chat-native procurement into that structured path.
          </p>
        </section>

        <section className="iron-section" aria-labelledby="iron-resp">
          <h2 id="iron-resp">Responsibilities</h2>
          <ul className="iron-list">
            <li>
              Architecting an end-to-end contract lifecycle platform that transforms chat-based
              procurement requests into structured contracting workflows.
            </li>
            <li>
              Coordinating agent orchestration, information retrieval, decision-making, and
              downstream execution processes.
            </li>
            <li>
              Developing specialized contract classification and risk assessment agents that use
              retrieved metadata and business context for provenance-aware recommendations and
              structured outputs for redlining, execution, and review.
            </li>
          </ul>
          <p className="iron-caveat">
            Scope note: this is an active internship (Jun 2026 – Present). Classification,
            structuring, and review-oriented surfaces are described as in-progress architecture and
            development. Risk assessment depth and full execution delivery are marked planned /
            evolving where appropriate — this page does not claim a finished shipped product.
          </p>
        </section>

        <section className="iron-section" aria-labelledby="iron-system">
          <h2 id="iron-system">System</h2>
          <div className="iron-system">
            <div>
              <h3>In progress</h3>
              <ul>
                <li>Chat intake → normalized workflow intent</li>
                <li>Classification into playbooks</li>
                <li>Retrieval with provenance for field suggestions</li>
                <li>Structured contract object + human review gates</li>
                <li>Redline / review oriented structured outputs</li>
              </ul>
            </div>
            <div>
              <h3>Planned / evolving</h3>
              <ul>
                <li>Deeper risk assessment agent behavior</li>
                <li>Richer execution orchestration after sign-off</li>
                <li>Broader autonomous decisioning — intentionally constrained by human gates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="iron-section" aria-labelledby="iron-outcomes">
          <h2 id="iron-outcomes">Outcomes</h2>
          <p>
            Outcomes at this stage are architectural and developmental: a coherent lifecycle story
            from chat to structured object with explicit human gates. Quantitative production metrics
            are not claimed here because the internship is ongoing and full product delivery is out
            of scope for this page.
          </p>
        </section>

        <section className="iron-section" aria-labelledby="iron-skills">
          <h2 id="iron-skills">Skills</h2>
          <ul className="iron-skills">
            <li>Agent orchestration</li>
            <li>Information retrieval</li>
            <li>Contract classification agents</li>
            <li>Provenance-aware recommendations</li>
            <li>Structured workflow design</li>
            <li>Human-in-the-loop review gates</li>
            <li>Risk assessment (evolving)</li>
            <li>Execution path design (maturing)</li>
          </ul>
        </section>

        <section className="iron-section" aria-labelledby="iron-xf">
          <h2 id="iron-xf">Cross-functional</h2>
          <p>
            The system sits between procurement chat, legal/review judgment, and execution
            operations. Agents accelerate structuring and retrieval; humans remain responsible for
            acceptance at review gates before anything becomes institutional record.
          </p>
        </section>

        <section className="iron-section iron-nda" aria-labelledby="iron-nda">
          <h2 id="iron-nda">NDA &amp; disclosure</h2>
          <p>
            The chat request and contract fields on this page are sanitized schematics. No
            proprietary Ironclad screenshots, customer contracts, or confidential playbook text are
            shown. Status labels deliberately separate in-progress internship work from planned
            depth.
          </p>
        </section>
      </div>
    </article>
  );
}

function statusLabel(status: FieldStatus): string {
  switch (status) {
    case "empty":
      return "Empty";
    case "draft":
      return "Draft";
    case "review":
      return "Needs review";
    case "accepted":
      return "Accepted";
    case "planned":
      return "Planned";
    default:
      return status;
  }
}
