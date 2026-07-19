import { Link } from "react-router-dom";
import "@/work/stanford/stanford.css";

export default function PomdpRoom() {
  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>
        <p className="stan-pub__kicker">Interactive publication · Decision Making Under Uncertainty · Stanford</p>
        <h1 className="stan-pub__title">Budget-Constrained Aid Allocation as a POMDP</h1>
        <p className="stan-pub__subtitle">
          When housing recovery is structurally slow, better algorithms hit the same wall as more
          budget.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong> · with Abi Lopez · Spring 2026
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>
            Limited food and housing assistance is modeled as a partially observable Markov
            decision process: each family&apos;s stability is hidden state readable only through
            noisy signals; each aid decision is a belief-based action under a shared, binding
            budget.
          </p>
        </div>

        <h2>Key contributions</h2>
        <ol className="stan-pub__contrib">
          <li>
            Compact 9-state POMDP on food × housing need (Crisis / Moderate / Stable), with
            empirically grounded recovery speeds — food responds quickly; housing slowly.
          </li>
          <li>
            Point-based value iteration (PBVI) compared against myopic, greedy, random, and
            spread-allocation baselines.
          </li>
          <li>
            Shows where planning stops helping: when housing recovery is fragile, the bottleneck
            shifts from policy to environment.
          </li>
        </ol>

        <h2>Motivation</h2>
        <p>
          Aid is not a full-information spreadsheet problem. Caseworkers act on belief. The
          question is whether principled planning under partial observability outperforms
          intuitive heuristics — and where even optimal planning fails.
        </p>

        <h2>Method</h2>
        <p>
          Beliefs over household state are updated from noisy observations. PBVI computes an
          approximate value function. Budgets bind across families. Horizons and family counts are
          swept to map cost-of-control.
        </p>

        <h2>Findings</h2>
        <p>
          PBVI wins on median reward and crisis-belief stability by front-loading aid rather than
          spreading evenly. Crisis control costs rise sharply with more families but fall with a
          longer horizon — roughly $85k → $15k at 15 families when the horizon doubles.
        </p>

        <h2>Conclusion</h2>
        <p>
          The memorable result is not that smarter planning helps — it does — but where it stops:
          algorithmic allocation cannot substitute for structural recovery.
        </p>

        <a
          className="stan-pdf"
          href="/research/pomdp-aid-allocation-paper.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read full paper →
        </a>
      </div>
    </article>
  );
}
