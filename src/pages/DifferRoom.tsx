import { Link } from "react-router-dom";
import { AbstractionStack } from "@/work/differ/components/AbstractionStack";
import "@/work/differ/differ.css";

/**
 * Differ exhibition room — research dialect from paper figures.
 * Paper PDF is private and is not linked.
 */
export default function DifferRoom() {
  return (
    <article className="differ-room">
      <div className="differ-inner">
        <Link to="/research" className="differ-back">
          ← Research
        </Link>

        <img
          className="differ-mark"
          src="/research/differ/mark.svg"
          alt=""
          width={40}
          height={40}
        />

        <header>
          <p className="differ-eyebrow">Case study · Experiential computing</p>
          <h1 className="differ-title">Differ</h1>
          <p className="differ-meta">
            CHI 2026 (submitted) · Delta Lab, Northwestern · First author · 2023–2025
          </p>
        </header>

        <blockquote className="differ-claim">
          The same designed experience fails differently across populations. Differ makes those
          differences accountable.
        </blockquote>

        <div className="differ-prose">
          <p>
            Context-aware systems often assume that if the context matches, the experience will
            mean the same thing to everyone who encounters it. Differ starts from the opposite
            premise: meaning breaks along geography, demographics, and setting — and designers
            should be able to see where before they ship.
          </p>
          <p>
            Built inside Northwestern&apos;s Delta Lab over nearly two years, Differ takes a
            machine-interpretable definition of an experience and returns visualizations that
            surface where that experience might fail for particular people or places. Case studies
            use real Chicago reference systems — Yelp, Foursquare, crime, neighborhood, census —
            not toy data.
          </p>
        </div>

        <section className="differ-section" aria-labelledby="df-model">
          <h2 id="df-model" className="differ-section-title">
            How the model works
          </h2>
          <div className="differ-prose" style={{ marginBottom: "1.5rem" }}>
            <p>
              Four abstractions carry the argument: concept expressions, accountable perspectives,
              issues of concern, and visualizations. Click through the stack — or let it step.
            </p>
          </div>
          <AbstractionStack />
        </section>

        <section className="differ-section" aria-labelledby="df-platform">
          <h2 id="df-platform" className="differ-section-title">
            Platform as argument
          </h2>
          <figure className="differ-figure">
            <p className="differ-plate-label">Figure · Platform overview</p>
            <img
              src="/research/differ/fig01_platform_overview.png"
              alt="Differ platform overview diagram from the research paper"
              loading="eager"
            />
            <figcaption className="differ-caption">
              From the CHI manuscript figures: the platform as a reading instrument, not a product
              screenshot gallery.
            </figcaption>
          </figure>
        </section>

        <section className="differ-section" aria-labelledby="df-abs">
          <h2 id="df-abs" className="differ-section-title">
            Abstractions &amp; visualization types
          </h2>
          <figure className="differ-figure" style={{ marginBottom: "2.5rem" }}>
            <p className="differ-plate-label">Figure · System abstractions</p>
            <img
              src="/research/differ/fig03_abstractions.png"
              alt="Differ system abstractions diagram"
              loading="lazy"
            />
          </figure>
          <figure className="differ-figure">
            <p className="differ-plate-label">Figure · Visualization types</p>
            <img
              src="/research/differ/fig07_visualization_types.png"
              alt="Differ visualization types: bar, map, and alternatives"
              loading="lazy"
            />
            <figcaption className="differ-caption">
              Bars for comparison, maps for geography, alternatives when a single view would lie.
              Soft coral accents in the paper diagrams set this room&apos;s color.
            </figcaption>
          </figure>
        </section>

        <section className="differ-section" aria-labelledby="df-case">
          <h2 id="df-case" className="differ-section-title">
            Case study evidence
          </h2>
          <div className="differ-prose" style={{ marginBottom: "1.25rem" }}>
            <p>
              Multi-experience plates and study outcomes — the fidelity twin of Echo and MuseLab.
              No interface walkthrough exists yet; these figures carry the computational claim.
            </p>
          </div>
          <figure className="differ-figure" style={{ marginBottom: "2.5rem" }}>
            <p className="differ-plate-label">Figure · Multi-experience case study</p>
            <img
              src="/research/differ/fig08_case_study_eight_viz.jpeg"
              alt="Eight visualizations across Differ case study experiences"
              loading="lazy"
            />
          </figure>
          <figure className="differ-figure">
            <p className="differ-plate-label">Figure · Participant outcomes</p>
            <img
              src="/research/differ/fig10_participant_breakdown.jpeg"
              alt="Differ participant study outcomes by hypothesis understanding"
              loading="lazy"
            />
          </figure>
        </section>

        <section className="differ-learn" aria-labelledby="df-learn">
          <h2 id="df-learn">What I learned · why remember it</h2>
          <div className="differ-prose">
            <p>
              Inclusive design is not a checklist of personas. It is a computational question about
              where meaning diverges — and the courage to make that divergence legible. Differ is
              the flagship of the fidelity half of this portfolio: accountable perspectives as a
              design material.
            </p>
            <p>
              The manuscript remains private until CHI processes allow public citation. What ships
              here are the figures that carry the argument without exposing the paper body.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
