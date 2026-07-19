import { Link } from "react-router-dom";
import "@/work/research-poster/poster.css";

export default function PomdpRoom() {
  return (
    <article className="poster-room pomdp">
      <div className="poster-inner">
        <Link to="/research" className="poster-back">
          ← Research
        </Link>
        <p className="poster-eyebrow">Case study · Decision under uncertainty</p>
        <h1 className="poster-title">Budget-Constrained Aid as a POMDP</h1>
        <p className="poster-meta">
          Decision Making Under Uncertainty · Stanford · with Abi Lopez · 2026
        </p>
        <p className="poster-claim">
          When housing recovery is structurally slow, better algorithms hit the same wall as more
          budget.
        </p>
        <div className="poster-prose">
          <p>
            Limited food and housing assistance modeled as a partially observable Markov decision
            process — household stability as hidden state, aid as belief-based action under a
            binding budget. Forest green is the planning-palette of the paper, not a generic “AI
            ethics” teal.
          </p>
        </div>
        <ul className="poster-findings">
          <li>
            PBVI outperforms myopic, greedy, random, and spread baselines on median reward and
            crisis-belief stability — front-loading aid rather than spreading evenly.
          </li>
          <li>
            Crisis control costs rise sharply with more families but fall with a longer horizon —
            from ~$85k to ~$15k at 15 families when the horizon doubles.
          </li>
          <li>
            The memorable result is where planning stops helping: the bottleneck shifts from
            policy to environment.
          </li>
        </ul>
        <div className="poster-frame">
          <iframe
            src="/research/pomdp-aid-allocation-paper.pdf"
            title="POMDP aid allocation paper"
          />
        </div>
        <a
          className="poster-link"
          href="/research/pomdp-aid-allocation-paper.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF ↗
        </a>
      </div>
    </article>
  );
}
