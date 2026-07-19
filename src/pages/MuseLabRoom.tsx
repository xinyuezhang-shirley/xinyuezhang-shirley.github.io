import { Link } from "react-router-dom";
import { PipelineFigure } from "@/work/muselab/components/PipelineFigure";
import { PulseReadingFigure } from "@/work/muselab/components/PulseReadingFigure";
import "@/work/muselab/muselab.css";

/**
 * MuseLab exhibition room — authored case study.
 * Screenshots are not the content; the computational model is.
 */
export default function MuseLabRoom() {
  return (
    <article className="muselab-room">
      <div className="muselab-inner">
        <Link to="/work" className="muselab-back">
          ← Work
        </Link>

        <header className="muselab-header">
          <p className="muselab-eyebrow">Case study · Literary instrument</p>
          <h1 className="muselab-title">MuseLab</h1>
          <p className="muselab-meta">Designer &amp; Developer · Independent · 2025–2026</p>
        </header>

        <blockquote className="muselab-claim">
          Charts and graphs are evidence. The reading is the product.
        </blockquote>

        <div className="muselab-prose">
          <p>
            I wanted better feedback on my own poetry. Most AI writing tools gave me the same
            thing: vague praise, generic craft advice, and a chat box that treated a poem like a
            support ticket. They could count my repetitions. They rarely told me what the draft
            was <em>about</em>.
          </p>
          <p>
            MuseLab asks a different question: beneath the surface, what is this text arguing?
            The answer is not more generated language. It is a workshop dossier — sheets you move
            through at your own pace — grounded in the manuscript&apos;s own words.
          </p>
        </div>

        <section className="muselab-section" aria-labelledby="ml-why">
          <h2 id="ml-why" className="muselab-section-title">
            Why it exists
          </h2>
          <div className="muselab-prose">
            <p>
              Two failures to reject. First: productivity software dressed as a writing partner —
              dashboards, chat bubbles, poems as tickets. Second: tools that stop at description —
              word counts, sentiment labels, word clouds — without producing a literary argument.
            </p>
            <p>
              A writer should leave with evidence, pattern, interpretation, and claim — then a
              revision question that returns judgment to them. That spine is the product. Everything
              else is instrumentation.
            </p>
          </div>
        </section>

        <section className="muselab-section" aria-labelledby="ml-model">
          <h2 id="ml-model" className="muselab-section-title">
            How the model works
          </h2>
          <div className="muselab-prose" style={{ marginBottom: "1.75rem" }}>
            <p>
              Hybrid grounding before opinion. Deterministic poetic features and optional classifiers
              run first — sensors, not judges. Specialist agents read in parallel; synthesis
              reconciles without averaging disagreement into mush. The UI never pretends a single
              chat reply is a workshop.
            </p>
          </div>
          <PipelineFigure />
        </section>

        <section className="muselab-section" aria-labelledby="ml-pulse">
          <h2 id="ml-pulse" className="muselab-section-title">
            Pulse · evidence, then argument
          </h2>
          <div className="muselab-prose" style={{ marginBottom: "1.75rem" }}>
            <p>
              Pulse is often mistaken for the artifact. In MuseLab, the force field is supporting
              evidence: lemmas linked only by honest co-presence — same line, neighbor lines,
              repeated anchors meeting. Below it, a structural reading names the organizing concept,
              clusters, and absences. Bad: &ldquo;Hub cannot. Degree 24.&rdquo; Good: an argument
              about limitation as structure.
            </p>
          </div>
          <PulseReadingFigure />
        </section>

        <section className="muselab-section" aria-labelledby="ml-walk">
          <h2 id="ml-walk" className="muselab-section-title">
            Interaction · the dossier in use
          </h2>
          <div className="muselab-prose" style={{ marginBottom: "1.25rem" }}>
            <p>
              The walkthrough is the primary interaction artifact — intake, editorial handoff, and
              the folio as a packet rather than a thread. Watch for how the interface stays calm
              while analysis runs, and how each sheet has one job.
            </p>
          </div>
          <figure className="muselab-figure">
            <p className="muselab-plate-label">Figure · Walkthrough</p>
            <div className="muselab-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster=""
                aria-label="MuseLab walkthrough — manuscript to dossier"
              >
                <source src="/work/muselab/walkthrough.mp4" type="video/mp4" />
              </video>
            </div>
            <figcaption className="muselab-caption">
              Three minutes through the workshop: deposit a manuscript, receive a dossier. No chat
              scroll. No substitute poem.
            </figcaption>
          </figure>
        </section>

        <section className="muselab-section" aria-labelledby="ml-interact">
          <h2 id="ml-interact" className="muselab-section-title">
            Why the interaction is designed this way
          </h2>
          <div className="muselab-prose">
            <p>
              A poem is not a thread. Folio tabs — Draft, Pulse, Margins, Paths, References,
              Revision, Imprint — let the writer pace the reading. Selecting a word on Draft
              traces it across Pulse and Margins so commentary stays tethered to language, not
              floating as generic advice.
            </p>
            <p>
              Imprint closes with residue, not a CTA. The session ends the way a serious workshop
              packet ends: with afterimage, not engagement bait. Voice preservation is explicit —
              no rewrite of the writer&apos;s poem into the model&apos;s voice.
            </p>
          </div>
        </section>

        <section className="muselab-learn" aria-labelledby="ml-learn">
          <h2 id="ml-learn">What I learned · why remember it</h2>
          <div className="muselab-prose">
            <p>
              Interpretation can be engineered as a layered argument without pretending to be a
              second human critic. Heuristic theme lexicons and graph topology will not match every
              close reading — that honesty is part of the design. The more durable lesson is
              architectural: keep poetry agents and product-steward agents separate; document taste
              so the interface cannot quietly become a SaaS template.
            </p>
            <p>
              MuseLab is the clearest statement I have made that beauty-through-structure and
              emotional resonance are not opposites — they are the same craft, applied to how
              meaning moves between a person, a language, and a machine.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
