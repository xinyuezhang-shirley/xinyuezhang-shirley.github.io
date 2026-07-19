import { Link } from "react-router-dom";
import DifferInstrument from "@/work/differ/components/DifferInstrument";
import "@/work/differ/differ-world.css";

/**
 * Differ — Northwestern academic case study.
 * Manuscript PDF remains private; figures and public project language only.
 */
export default function DifferRoom() {
  return (
    <article className="differ-world">
      <div className="differ-world__inner">
        <Link to="/research" className="differ-world__back">
          ← Research
        </Link>

        <p className="differ-world__eyebrow">
          CHI 2026 submission · Delta Lab · Northwestern University
        </p>
        <h1 className="differ-world__title">Differ: A Platform for Experiential Computing</h1>
        <p className="differ-world__collaborators">with Jiachen He &amp; Prof. Haoqi Zhang</p>
        <p className="differ-world__meta">
          Xinyue (Shirley) Zhang · First author · Dec 2023 – Sep 2025
          <br />
          Design, Technology, and Research · Delta Lab · Northwestern University
        </p>

        <p className="differ-world__lede">
          The same context-aware experience can succeed for one person in one place and fail for
          another nearby. Differ turns that intuition into a linear computational pipeline —
          concept, perspective, issue, visualization — so designers can see where meaning breaks
          before they ship.
        </p>

        <section className="differ-chapter">
          <h2>Overview</h2>
          <p>
            Differ is a platform for reasoning about contextual differences in human experience
            design. It takes a machine-interpretable definition of an experience and returns
            visualizations that surface where that experience might break down for particular
            populations or settings. The work grew out of Northwestern’s Design, Technology, and
            Research program inside the Delta Lab and was developed across nearly two years of
            case studies grounded in real reference systems rather than toy datasets.
          </p>
        </section>

        <section className="differ-chapter">
          <h2>Motivation &amp; research question</h2>
          <p>
            Context-aware systems often encode a single idea of “the user” and “the place.” When
            those encodings are wrong for a neighborhood, age group, or setting, the failure is
            usually discovered after launch. Differ asks: can we make differences in machine
            representations of human experiences measurable and visible early enough to change
            design decisions?
          </p>
        </section>

        <section className="differ-chapter">
          <h2>Method</h2>
          <p>
            Differ’s analysis is intentionally linear. A designer (or researcher) specifies four
            linked abstractions; each stage depends on the previous one. The platform then
            generates visualizations over reference data (including venue, neighborhood, and
            demographic sources used in the study).
          </p>
          <div className="differ-pipeline" aria-label="Linear Differ pipeline">
            <div className="differ-pipeline__step">
              <strong>1 · Concept</strong>
              <span>Machine-interpretable definition of the experience</span>
            </div>
            <div className="differ-pipeline__step">
              <strong>2 · Perspective</strong>
              <span>Accountable viewpoint: geography, demographics, setting</span>
            </div>
            <div className="differ-pipeline__step">
              <strong>3 · Issue</strong>
              <span>What to score: prevalence, fit, safety, affordability…</span>
            </div>
            <div className="differ-pipeline__step">
              <strong>4 · Visualization</strong>
              <span>Bars, maps, and comparative plates for designers</span>
            </div>
          </div>
          <figure className="differ-figure">
            <img
              src="/media/research/differ/fig03_abstractions.png"
              alt="Fig. 3. Overview of Differ computational abstractions and how they work together."
            />
            <figcaption>
              Fig. 3. An overview of the computational abstractions Differ provides, and how they
              work together to enable the desired analysis. The structure is linear — not a freeform
              graph.
            </figcaption>
          </figure>
        </section>

        <section className="differ-chapter">
          <h2>Platform &amp; visualization types</h2>
          <figure className="differ-figure">
            <img
              src="/media/research/differ/fig01_platform_overview.png"
              alt="Fig. 1. Differ platform overview."
            />
            <figcaption>
              Fig. 1. Differ as an experiential computing platform for analyzing human experiences
              and their computational encodings.
            </figcaption>
          </figure>
          <figure className="differ-figure">
            <img
              src="/media/research/differ/fig07_visualization_types.png"
              alt="Fig. 7. Three visualization types Differ implements."
            />
            <figcaption>
              Fig. 7. Three example types of visualizations Differ implements for displaying
              potential issues to designers (including bar and map forms).
            </figcaption>
          </figure>
        </section>

        <section className="differ-chapter">
          <h2>Selected cases from the study</h2>
          <p>
            The instrument below only offers experience × perspective × issue combinations that
            map to a real figure from the study. Selecting a case reveals the original plot and
            what difference it is meant to surface.
          </p>
          <DifferInstrument />
        </section>

        <section className="differ-chapter">
          <h2>Evidence gallery</h2>
          <div className="differ-gallery">
            <figure className="differ-figure">
              <img
                src="/media/research/differ/fig08_case_study_eight_viz.jpeg"
                alt="Fig. 8. Multi-experience case study plate."
              />
              <figcaption>
                Fig. 8. A case study of eight visualizations generated using Differ, surfacing
                potential issues across multiple experiences.
              </figcaption>
            </figure>
            <figure className="differ-figure">
              <img
                src="/media/research/differ/fig09_first_date_eight_viz.jpeg"
                alt="Fig. 9. First-date visualization plate."
              />
              <figcaption>
                Fig. 9. Eight visualizations for the experience of having a first date over food and
                drinks.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="differ-chapter">
          <h2>Participant results</h2>
          <figure className="differ-figure">
            <img
              src="/media/research/differ/fig10_participant_breakdown.jpeg"
              alt="Fig. 10. How visualizations helped participants."
            />
            <figcaption>
              Fig. 10. Breakdown of how each visualization helped participants form new hypotheses
              and strengthen understanding.
            </figcaption>
          </figure>
          <figure className="differ-figure">
            <img
              src="/media/research/differ/fig11_hypotheses_stages.jpeg"
              alt="Fig. 11. Hypotheses generated by stage."
            />
            <figcaption>
              Fig. 11. The number of new hypotheses participants generated after each stage of the
              study.
            </figcaption>
          </figure>
        </section>

        <section className="differ-chapter">
          <h2>Findings</h2>
          <ul>
            <li>
              Four core abstractions — concept expressions, accountable perspectives, issues of
              concern, and visualizations — are enough to structure experiential difference as
              analysis rather than anecdote.
            </li>
            <li>
              Accountable perspectives capture meaning differences across geography (urban/rural,
              state, neighborhood), demographics (age, budget, accessibility), and setting.
            </li>
            <li>
              Issue functions score a perspective for concerns such as prevalence, conceptual fit,
              popularity, safety, and affordability.
            </li>
            <li>
              In the participant study, visualizations supported both new hypothesis generation and
              stronger understanding of where experiences break — with stage-wise gains visible in
              Fig. 11.
            </li>
          </ul>
        </section>

        <section className="differ-chapter">
          <h2>Limitations</h2>
          <p>
            Differ depends on the quality and coverage of its reference systems; absences in venue
            or demographic data can silence real differences. Visualizations surface potential
            issues for designers — they do not automatically prescribe fixes. The interactive cases
            on this page are curated excerpts from the study, not a live recompute of the full
            pipeline.
          </p>
        </section>

        <section className="differ-chapter">
          <h2>Contribution</h2>
          <p>
            Differ contributes a practical computational frame for experiential difference: a
            linear path from how an experience is defined, through who and where it is evaluated
            for, to visualizations that make divergence accountable before shipping.
          </p>
        </section>

        <div className="differ-status">
          <p>
            <strong>Publication status.</strong> The CHI 2026 manuscript remains private and is not
            available for download on this site. Figures shown here are exhibition extracts from the
            research; they are not a substitute for the full paper.
          </p>
          <a href="mailto:xinyuezhang.shirley@gmail.com">Contact me about this research</a>
          {" · "}
          <a href="mailto:xinyuezhang.shirley@gmail.com">Paper available on request</a>
        </div>
      </div>
    </article>
  );
}
