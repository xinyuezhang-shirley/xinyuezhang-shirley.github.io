import { Link } from "react-router-dom";
import { DifferInstrument } from "@/work/differ/components/DifferInstrument";
import "@/work/differ/differ-world.css";

/**
 * Differ world — Northwestern night lab; the instrument is the page.
 */
export default function DifferRoom() {
  return (
    <article className="differ-world">
      <div className="differ-world__inner">
        <Link to="/research" className="differ-world__back">
          ← Research
        </Link>

        <p className="differ-world__eyebrow">Delta Lab · Northwestern · CHI 2026 (submitted)</p>
        <h1 className="differ-world__title">Differ</h1>
        <p className="differ-world__claim">
          The same experience fails differently across people and places. Make that failure
          accountable — before you ship.
        </p>

        <div className="differ-world__prose">
          <p>
            Context-aware systems often assume that matching context means matching meaning. Differ
            starts from the opposite premise. Meaning breaks along geography, demographics, and
            setting — and designers should be able to see where.
          </p>
        </div>

        <section className="differ-world__section" aria-labelledby="df-play">
          <h2 id="df-play">Play the instrument</h2>
          <div className="differ-world__prose">
            <p>
              Choose an experience, an accountable perspective, and an issue. The field updates.
              This is a portfolio instrument — illustrative scores that demonstrate Differ&apos;s
              argument, not a live Chicago compute job.
            </p>
          </div>
          <DifferInstrument />
        </section>

        <section className="differ-world__section" aria-labelledby="df-model">
          <h2 id="df-model">The model beneath</h2>
          <div className="differ-stack-inline">
            <div>
              <span>01 · Concept expression</span>
              A machine-interpretable definition of the experience — structure, not slogan.
            </div>
            <div>
              <span>02 · Accountable perspective</span>
              Who and where: neighborhood, age, budget, accessibility, time of day.
            </div>
            <div>
              <span>03 · Issue of concern</span>
              Fit, safety, affordability, prevalence — functions that ask where meaning breaks.
            </div>
            <div>
              <span>04 · Visualization</span>
              Comparison and geography as evidence for a designer, not a vanity dashboard.
            </div>
          </div>
        </section>

        <section className="differ-world__section" aria-labelledby="df-why">
          <h2 id="df-why">Why it took two years</h2>
          <div className="differ-world__prose">
            <p>
              Case studies use real reference systems — Yelp, Foursquare, crime, neighborhood,
              census — not toy tables. A difference that only shows up across actual Chicago
              neighborhoods is harder to render responsibly than one that shows up in synthetic
              data. That difficulty is the point.
            </p>
          </div>
        </section>

        <section className="differ-world__learn" aria-labelledby="df-learn">
          <h2 id="df-learn" style={{ fontFamily: "var(--df-serif)", fontSize: "1.5rem", margin: "0 0 1rem" }}>
            Reflection
          </h2>
          <div className="differ-world__prose">
            <p>
              Inclusive design is not a checklist of personas. It is a computational question about
              where meaning diverges. Differ is the fidelity twin of Echo and MuseLab — purple night
              lab instead of cream dossier or black constellation — same obsession, different dialect.
            </p>
            <p>
              The CHI manuscript remains private. What you interact with here is the idea, made
              operable.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
