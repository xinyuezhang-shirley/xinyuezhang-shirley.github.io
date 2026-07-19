import { Link } from "react-router-dom";
import "@/work/research-poster/poster.css";

export default function PoemSongRoom() {
  return (
    <article className="poster-room poem">
      <div className="poster-inner">
        <Link to="/research" className="poster-back">
          ← Research
        </Link>
        <p className="poster-eyebrow">Case study · Poem–song retrieval</p>
        <h1 className="poster-title">The Sound of a Sonnet</h1>
        <p className="poster-meta">
          CS 229 · Machine Learning · Stanford · with Cheney Sang &amp; Amelia Sarah Bloom · 2026
        </p>
        <p className="poster-claim">
          Poem–song similarity lives in affect more than in vocabulary.
        </p>
        <div className="poster-prose">
          <p>
            A dual-encoder retrieves songs musically compatible with a poem — shared embedding
            space over PoetryDB and Genius/Spotify lyrics, trained with contrastive loss on
            pseudo-supervised pairs because no labeled dataset exists. Purple is borrowed from
            literary–musical crossover, not from a stock ML theme.
          </p>
        </div>
        <ul className="poster-findings">
          <li>
            Best feature-aware encoders reach 78–80% agreement with human triplet judgments —
            matching human–human consistency (~80%) and beating MPNet-only cosine (~67%).
          </li>
          <li>
            Models that lean on emotional tone and structure outperform literal word overlap.
          </li>
          <li>
            The bridge between this site&apos;s halves: computation that has to learn what “belonging
            together” feels like.
          </li>
        </ul>
        <div className="poster-frame">
          <iframe
            src="/research/poem-to-song-poster.pdf"
            title="Poem-to-Song recommendation poster"
          />
        </div>
        <a className="poster-link" href="/research/poem-to-song-poster.pdf" target="_blank" rel="noopener noreferrer">
          Open poster PDF ↗
        </a>
      </div>
    </article>
  );
}
