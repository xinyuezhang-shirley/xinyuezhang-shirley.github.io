import { useState } from "react";
import { Link } from "react-router-dom";
import { researchProjects } from "@/content/research";
import "@/work/stanford/stanford.css";

const STEPS = [
  {
    id: "corpus",
    label: "Poems & songs",
    title: "Corpus: poems and songs",
    body: "3,413 poems from PoetryDB and 2,934 song lyrics from Genius with Spotify metadata. No labeled poem–song pairs exist, so the retrieval problem starts from unpaired text in two domains.",
    src: "/research/poem-to-song/data.png",
    caption: "Dataset overview — poem and song corpora used for pseudo-supervision and evaluation.",
  },
  {
    id: "pairs",
    label: "Pseudo pairs",
    title: "Training pairs from heuristics",
    body: "Because labels are missing, training pairs come from a weighted-cosine heuristic over MPNet embeddings, zero-shot emotion/theme classifiers, and structural/lexical features. Those pseudo-labels seed contrastive learning.",
    src: "/research/poem-to-song/features.png",
    caption: "Feature branches that feed pair construction and the dual encoder.",
  },
  {
    id: "branches",
    label: "Five branches",
    title: "Five-branch dual encoder",
    body: "Poems and songs each pass through five branches — MPNet, emotion, theme, other semantic, and structural/lexical — so similarity can live in affect and form rather than literal word overlap alone.",
    src: "/research/poem-to-song/dual_encoder.png",
    caption: "Dual-encoder architecture with five modality branches projecting into a shared space.",
  },
  {
    id: "space",
    label: "Shared space",
    title: "Shared 128-d embedding space",
    body: "Each branch projects into a shared 128-dimensional space where poems and songs become comparable. Retrieval is nearest-neighbor search in that space.",
    src: "/research/poem-to-song/top_n_accuracy.png",
    caption: "Top-N retrieval accuracy as the shared space is used to rank candidate songs for a poem.",
  },
  {
    id: "infonce",
    label: "InfoNCE",
    title: "Symmetric InfoNCE training",
    body: "The encoders are trained with symmetric InfoNCE contrastive loss: matched poem–song pairs are pulled together; in-batch negatives are pushed apart. Temperature and batch size matter for stability.",
    src: "/research/poem-to-song/weight_strategy_comparison.png",
    caption: "Weight-strategy comparison across training configurations for the contrastive objective.",
  },
  {
    id: "triplets",
    label: "Human triplets",
    title: "Human triplet judgments",
    body: "Evaluation asks humans: given a poem and two candidate songs, which fits better in tone, structure, and affect? A second annotator’s agreement with the first (~80%) sets the practical ceiling for any model.",
    src: "/research/poem-to-song/modality_weight_heatmap.png",
    caption: "Modality-weight heatmap — which branches the model leans on when matching poems to songs.",
  },
  {
    id: "compare",
    label: "Comparison",
    title: "Results vs baseline & ceiling",
    body: "Best feature-aware encoders reach 78–80% agreement with human judgment — matching human-level consistency and beating an MPNet-only cosine baseline (~67%). Models that lean on emotional tone and structure outperform literal overlap.",
    src: "/research/poem-to-song/accuracy.png",
    caption: "Accuracy against human triplets: feature-aware encoders approach the ~80% human ceiling.",
  },
] as const;

const project = researchProjects.find((p) => p.slug === "poem-to-song")!;

export default function PoemSongRoom() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>

        <p className="stan-pub__kicker">CS 229 · Machine Learning · Stanford · Spring 2026</p>
        <h1 className="stan-pub__title">{project.title}</h1>
        <p className="stan-pub__subtitle">
          Poem–song similarity lives in affect more than in vocabulary.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong>
          {project.authors?.length
            ? ` · with ${project.authors.join(" & ")}`
            : ""}{" "}
          · Spring 2026
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>{project.abstract}</p>
        </div>

        <h2>Motivation</h2>
        <p>
          {project.story?.[0] ??
            "A retrieval system that has to learn what makes a poem and a song feel like they belong together — tone, structure, affect — rather than which words they share."}
        </p>

        <h2>Method walkthrough</h2>
        <p>
          Step through the pipeline: unpaired corpora → pseudo pairs → five-branch dual encoder →
          shared space → InfoNCE → human triplets → comparison to baseline and ceiling.
        </p>
      </div>

      <div className="stan-pub__wide">
        <div className="stan-instrument" aria-labelledby="poem-walk-label">
          <p className="stan-instrument__label" id="poem-walk-label">
            Interactive · pipeline steps
          </p>
          <div className="stan-step-nav" role="tablist" aria-label="Method walkthrough steps">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                className={`stan-step-btn${step === i ? " is-on" : ""}`}
                aria-selected={step === i}
                onClick={() => setStep(i)}
              >
                {i + 1}. {s.label}
              </button>
            ))}
          </div>

          <h3
            style={{
              fontFamily: "var(--st-serif)",
              fontSize: "1.25rem",
              margin: "0 0 0.65rem",
            }}
          >
            {current.title}
          </h3>
          <p className="stan-step-copy">{current.body}</p>

          <figure className="stan-fig" style={{ margin: 0 }}>
            <p className="stan-fig__label">
              Step {step + 1} of {STEPS.length} · {current.label}
            </p>
            <img src={current.src} alt={current.title} />
            <figcaption className="stan-fig__cap">{current.caption}</figcaption>
          </figure>

          <div className="stan-chip-row" style={{ marginTop: "1rem", marginBottom: 0 }}>
            <button
              type="button"
              className="stan-chip"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Previous step
            </button>
            <button
              type="button"
              className="stan-chip"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1}
            >
              Next step
            </button>
          </div>
        </div>
      </div>

      <div className="stan-pub__inner">
        <h2>Method summary</h2>
        <p>
          Pseudo-supervised pairs are built from MPNet embeddings, zero-shot emotion/theme
          classifiers, and structural/lexical features. A five-branch dual encoder projects poems
          and songs into a shared 128-d space and is trained with symmetric InfoNCE. Human triplet
          judgments evaluate whether the retrieved song fits the poem’s tone, structure, and affect.
        </p>

        <h2>Findings</h2>
        <ul className="stan-findings">
          {project.keyFindings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2>Conclusion</h2>
        <p>
          When the ground truth is a feeling, the honest ceiling is human agreement — and reaching
          78–80% without labeled pairs, against a ~67% embedding baseline and an ~80% human ceiling,
          is the engineering story.
        </p>

        <div className="stan-cta-row">
          <a
            className="stan-pdf"
            href="/research/poem-to-song-poster.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View poster PDF
          </a>
        </div>
      </div>
    </article>
  );
}
