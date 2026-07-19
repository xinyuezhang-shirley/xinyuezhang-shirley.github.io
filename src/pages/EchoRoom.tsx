import { Link } from "react-router-dom";
import { EchoSound } from "@/work/echo/components/EchoSound";
import { NetworkFigure } from "@/work/echo/components/NetworkFigure";
import { PipelineFigure } from "@/work/echo/components/PipelineFigure";
import "@/work/echo/echo.css";

const LIVE_URL = "https://cs146j-finalproject.onrender.com/";
const YOUTUBE_EMBED = "https://www.youtube.com/embed/DXuX2TFZ5ro";

const FORMS = [
  {
    name: "Constellation",
    mode: "Network",
    note: "Maps relationships between connected ideas and recurring language patterns.",
    active: true,
  },
  {
    name: "Drift",
    mode: "Soup",
    note: "Disperses words into atmospheric fields that move like memory.",
  },
  {
    name: "Imprint",
    mode: "ASCII",
    note: "Compresses language into typographic residue and monochrome traces.",
  },
  {
    name: "Spiral",
    mode: "Vortex",
    note: "Pulls repeated language into motion, recurrence, and collapse.",
  },
  {
    name: "Gravity",
    mode: "Orbit",
    note: "Organizes words around semantic anchors and emotional weight.",
  },
] as const;

/**
 * Echo exhibition room — authored case study in Echo's own Moonlight dialect.
 */
export default function EchoRoom() {
  return (
    <article className="echo-room">
      <div className="echo-hero">
        <div className="echo-hero__bg" aria-hidden="true" />
        <div className="echo-hero__inner">
          <Link to="/work" className="echo-back">
            ← Work
          </Link>
          <p className="echo-eyebrow">Case study · Computational text art</p>
          <h1 className="echo-title">ECHO</h1>
          <p className="echo-tagline">words that continue breathing</p>
          <p className="echo-collaborators">with Clare Lei &amp; Rita Xiang</p>
          <p className="echo-meta">Designer &amp; Developer · CS146J · Stanford · 2024–2025</p>
        </div>
      </div>

      <div className="echo-inner">
        <blockquote className="echo-claim">
          Language is not static information. It is movement — cluster, drift, orbit, residue.
        </blockquote>

        <div className="echo-prose">
          <p>
            Words are humanity&apos;s primary mechanism for understanding one another. Language
            carries emotion, memory, identity, intention. Yet modern communication increasingly
            prioritizes speed over reflection — compressing meaning into fragments, captions,
            messages, and signals. In trying to communicate faster, we often lose the emotional
            weight that language once carried.
          </p>
          <p>
            <em>Echo was created as a response to that loss.</em> Paste a poem. The studio reads it
            the way an editor might — then gives the language five different afterlives that keep
            evolving after the sentence ends.
          </p>
        </div>

        <div className="echo-links">
          <a
            className="echo-link"
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live studio ↗
          </a>
          <a
            className="echo-link"
            href="https://youtu.be/DXuX2TFZ5ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch demo ↗
          </a>
        </div>

        <section className="echo-section" aria-labelledby="echo-why">
          <h2 id="echo-why" className="echo-section-title">
            Why it exists
          </h2>
          <div className="echo-prose">
            <p>
              I wanted writing to have a body that could keep moving — not a screenshot of a word
              cloud, not a chat that forgets the page. Echo treats a manuscript as material for a
              field: frequency becomes weight, proximity becomes edge, and the reader watches
              relationships settle rather than being told what the poem means.
            </p>
          </div>
        </section>

        <section className="echo-section" aria-labelledby="echo-model">
          <h2 id="echo-model" className="echo-section-title">
            How the model works
          </h2>
          <div className="echo-prose" style={{ marginBottom: "1.75rem" }}>
            <p>
              One analysis pipeline feeds every form. Local tokenization and co-occurrence run in
              the browser when the API is unreachable; on the server, Datamuse can extend the field
              with semantic neighbors. Intensity, density, and motion are shared sliders — the same
              spine, five renderers.
            </p>
          </div>
          <PipelineFigure />
        </section>

        <section className="echo-section" aria-labelledby="echo-net">
          <h2 id="echo-net" className="echo-section-title">
            Constellation · the field with gravity
          </h2>
          <div className="echo-prose" style={{ marginBottom: "1.75rem" }}>
            <p>
              Network is Echo&apos;s signature figure — and the ancestor of MuseLab&apos;s Pulse.
              Below, the studio&apos;s own local analyzer runs on the specimen poem{" "}
              <em>Romantic Death</em>, then D3 lays the co-occurrence graph into a force field you
              can drag and zoom.
            </p>
          </div>
          <NetworkFigure />
        </section>

        <section className="echo-section" aria-labelledby="echo-forms">
          <h2 id="echo-forms" className="echo-section-title">
            Forms · five afterlives
          </h2>
          <div className="echo-prose">
            <p>Each form gives language a different kind of afterlife. One is live above; the rest are named so the room does not pretend they are interchangeable screenshots.</p>
          </div>
          <div className="echo-forms">
            {FORMS.map((form) => (
              <article
                key={form.name}
                className={`echo-form${form.active ? " echo-form--active" : ""}`}
              >
                <h3>
                  {form.name}
                  <span style={{ color: "var(--muted)", fontSize: "0.75rem", marginLeft: "0.6rem" }}>
                    {form.mode}
                  </span>
                </h3>
                <p>{form.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="echo-section" aria-labelledby="echo-walk">
          <h2 id="echo-walk" className="echo-section-title">
            Interaction · the studio in use
          </h2>
          <div className="echo-prose" style={{ marginBottom: "1.25rem" }}>
            <p>
              The walkthrough is the primary interaction artifact — compose, transform, settle into
              a mode. Watch for how Moonlight chrome stays quiet while the field takes over.
            </p>
          </div>
          <figure className="echo-figure">
            <p className="echo-plate-label">Figure · Walkthrough</p>
            <div className="echo-video">
              <iframe
                src={YOUTUBE_EMBED}
                title="Echo studio walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <figcaption className="echo-caption">
              Published studio demo. Open the{" "}
              <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                live site
              </a>{" "}
              to run the specimen yourself.
            </figcaption>
          </figure>
        </section>

        <section className="echo-section" aria-labelledby="echo-interact">
          <h2 id="echo-interact" className="echo-section-title">
            Why the interaction is designed this way
          </h2>
          <div className="echo-prose">
            <p>
              Moonlight and Paper are the only themes — monochrome on purpose. Chrome stays quiet so
              the field can speak. Sound is part of the system, not decoration: a low loop that
              belongs to the studio, toggled the same way as in the live app. Night is the default;
              paper exists for reading, not for making the work look like a product dashboard.
            </p>
          </div>
        </section>

        <section className="echo-learn" aria-labelledby="echo-learn">
          <h2 id="echo-learn">What I learned · why remember it</h2>
          <div className="echo-prose">
            <p>
              A force-directed graph of relationships can say something a paragraph can&apos;t —
              and a portfolio can borrow that conviction without turning every project into a
              screenshot gallery. Echo taught me that generative systems earn their keep when the
              computation is legible as feeling: weight, drift, gravity.
            </p>
            <p>
              MuseLab inherits this lineage. Pulse is evidence; Echo&apos;s Constellation is the
              afterlife. Same obsession: meaning moving between people, language, and computation.
            </p>
          </div>
          <div className="echo-links">
            <a
              className="echo-link"
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Echo ↗
            </a>
          </div>
        </section>
      </div>

      <EchoSound />
    </article>
  );
}
