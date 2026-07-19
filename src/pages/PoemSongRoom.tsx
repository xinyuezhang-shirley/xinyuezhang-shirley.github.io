import { Link } from "react-router-dom";
import "@/work/stanford/stanford.css";

export default function PoemSongRoom() {
  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>
        <p className="stan-pub__kicker">Interactive publication · CS 229 · Stanford</p>
        <h1 className="stan-pub__title">
          The Sound of a Sonnet: Poem-to-Song Recommendation with Pseudo-Supervision
        </h1>
        <p className="stan-pub__subtitle">
          Poem–song similarity lives in affect more than in vocabulary.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong> · with Cheney Sang &amp; Amelia Sarah Bloom ·
          Spring 2026
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>
            A retrieval model predicts which songs are musically compatible with a given poem by
            learning a shared embedding space between poetic and lyrical text. Built on PoetryDB and
            Genius/Spotify lyrics, the dual-encoder is trained with contrastive loss on
            pseudo-supervised pairs — because no labeled poem–song dataset exists — and evaluated
            against human judgment of tone, structure, and affect.
          </p>
        </div>

        <h2>Key contributions</h2>
        <ol className="stan-pub__contrib">
          <li>
            Pseudo-supervised pair construction from MPNet embeddings, zero-shot emotion/theme
            classifiers, and structural features when labels do not exist.
          </li>
          <li>
            Five-branch dual encoder projecting poems and songs into a shared 128-d space,
            trained with symmetric InfoNCE.
          </li>
          <li>
            Human triplet evaluation with a practical ceiling (~80% annotator agreement); best
            models match that ceiling (78–80%) and beat MPNet-only cosine (~67%).
          </li>
        </ol>

        <h2>Motivation</h2>
        <p>
          This is where the two halves of the portfolio meet: a system that has to learn,
          computationally, what makes a poem and a song feel like they belong together — not which
          words they share.
        </p>

        <h2>Method</h2>
        <p>
          Weighted-cosine heuristics over embeddings seed training pairs. The encoder branches
          capture MPNet semantics, emotion, theme, residual semantics, and structure/lexicon.
          Evaluation asks humans: given a poem and two songs, which fits better?
        </p>

        <h2>Findings</h2>
        <p>
          Models that lean on emotional tone and structure outperform literal overlap. Affect is
          the bridge; vocabulary is a decoy.
        </p>

        <h2>Conclusion</h2>
        <p>
          When the ground truth is a feeling, the honest ceiling is human agreement — and reaching
          it without labeled pairs is the engineering story.
        </p>

        <a className="stan-pdf" href="/research/poem-to-song-poster.pdf" target="_blank" rel="noopener noreferrer">
          Read full poster →
        </a>
      </div>
    </article>
  );
}
