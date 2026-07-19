import { useState } from "react";
import { Link } from "react-router-dom";
import { researchProjects } from "@/content/research";
import "@/work/stanford/stanford.css";

const EXPERIMENTS = [
  {
    id: "belief",
    label: "Belief evolution",
    title: "Belief evolution over time",
    body: "Household stability is hidden state. The agent maintains a belief distribution and updates it from noisy observations as aid decisions unfold.",
    src: "/research/pomdp/belief_evolution.png",
    caption: "Belief trajectories under planning — crisis mass concentrates or dissipates depending on early aid.",
  },
  {
    id: "policy",
    label: "Policy comparison (budget = 50k)",
    title: "PBVI vs baselines at $50k",
    body: "Point-based value iteration is compared against myopic, greedy, random, and spread-allocation baselines under a shared $50k budget (20 households, 8-family planning view in the figure).",
    src: "/research/pomdp/policy_comparison_budget=50k,20H,8F.png",
    caption: "Policy comparison at budget = $50k: PBVI achieves higher median reward and more stable crisis beliefs.",
  },
  {
    id: "pbvi-budget",
    label: "PBVI budget to control crisis",
    title: "Budget needed to control crisis rate",
    body: "The budget required to keep crisis rates down rises sharply with more families but falls with a longer planning horizon — from roughly $85k (15 families, 8-month horizon) down to $15k at the same family count with a 16-month horizon.",
    src: "/research/pomdp/pbvi_budget_needed_to_control_crisis_rate.png",
    caption: "PBVI cost-of-control surface: family count vs horizon vs budget needed.",
  },
  {
    id: "heatmap",
    label: "Heatmap of aid",
    title: "Aid allocation heatmap",
    body: "PBVI consistently front-loads aid toward a subset of families early rather than spreading evenly — a pattern visible in family×time heatmaps of allocated assistance.",
    src: "/research/pomdp/heatmap_aid.png",
    caption: "Heatmap of aid allocation across families and time under the learned policy.",
  },
  {
    id: "trajectory",
    label: "Food / housing trajectory",
    title: "Food vs housing recovery asymmetry",
    body: "Households sit on two axes — food and housing need, each Crisis / Moderate / Stable. Food responds quickly to aid; housing responds slowly and regresses easily. That asymmetry shapes every belief update.",
    src: "/research/pomdp/food_housing_trajectory.png",
    caption: "Food and housing need trajectories — recovery speeds differ enough to dominate policy structure.",
  },
  {
    id: "reward",
    label: "Reward vs crisis",
    title: "Reward and crisis under budget",
    body: "Even optimal planning has limits: when housing recovery is structurally slow, no realistic budget reliably keeps crisis rates down — the bottleneck shifts from the policy to the environment itself.",
    src: "/research/pomdp/avg_reward_crisis_budget.png",
    caption: "Average reward and crisis rates as a function of budget — planning helps until the environment binds.",
  },
] as const;

const project = researchProjects.find((p) => p.slug === "pomdp-aid-allocation")!;

export default function PomdpRoom() {
  const [view, setView] = useState(0);
  const current = EXPERIMENTS[view];

  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>

        <p className="stan-pub__kicker">
          Decision Making Under Uncertainty · Stanford · Spring 2026
        </p>
        <h1 className="stan-pub__title">{project.title}</h1>
        <p className="stan-pub__subtitle">
          When housing recovery is structurally slow, better algorithms hit the same wall as more
          budget.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong>
          {project.authors?.length ? ` · with ${project.authors.join(" & ")}` : ""} · Spring 2026
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>{project.abstract}</p>
        </div>

        <h2>The 9-state POMDP</h2>
        <p>
          Each household is modeled on two axes — food need and housing need — each taking one of
          Crisis / Moderate / Stable. That yields a compact <strong>9-state</strong> discrete state
          space. Stability is only partially observed: the planner acts on a belief distribution
          updated from noisy signals. Actions allocate limited food and housing assistance under a
          shared, binding budget. Transition dynamics are learned from simulated trajectories with
          empirically grounded cost-of-living targets: food recovers quickly when aided; housing
          recovers slowly and slips back easily.
        </p>

        <h2>Food vs housing asymmetry</h2>
        <p>
          The asymmetry is not decorative — it structures the value function. Front-loading aid
          toward families whose crisis belief is high can stabilize food quickly, but housing lag
          means crisis can reappear even after “good” allocations. That is why spread-evenly
          heuristics look fair and still underperform.
        </p>

        <h2>PBVI vs baselines</h2>
        <p>
          The POMDP is solved with point-based value iteration (PBVI) and compared against myopic,
          greedy, random, and spread-allocation baselines. PBVI achieves the highest median reward
          and the most stable crisis-belief trajectories by concentrating early aid rather than
          diluting it.
        </p>

        <h2>Experiment views</h2>
        <p>
          Select an experiment view to swap the corresponding paper figure. Every plot below is from
          the analysis — not a decorative stand-in.
        </p>
      </div>

      <div className="stan-pub__wide">
        <div className="stan-instrument" aria-labelledby="pomdp-exp-label">
          <p className="stan-instrument__label" id="pomdp-exp-label">
            Interactive · experiment figures
          </p>
          <div className="stan-step-nav" role="tablist" aria-label="Select experiment view">
            {EXPERIMENTS.map((exp, i) => (
              <button
                key={exp.id}
                type="button"
                role="tab"
                className={`stan-step-btn${view === i ? " is-on" : ""}`}
                aria-selected={view === i}
                onClick={() => setView(i)}
              >
                {exp.label}
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
            <p className="stan-fig__label">{current.label}</p>
            <img src={current.src} alt={current.title} />
            <figcaption className="stan-fig__cap">{current.caption}</figcaption>
          </figure>
        </div>
      </div>

      <div className="stan-pub__inner">
        <h2>Environment bottleneck</h2>
        <p>
          {project.story?.[0] ??
            "Once housing recovery is slow and structurally fragile enough, more budget and better algorithms both hit the same wall."}
        </p>

        <h2>Findings</h2>
        <ul className="stan-findings">
          {project.keyFindings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2>Conclusion</h2>
        <p>
          Smarter planning helps — until it doesn&apos;t. Algorithmic allocation cannot substitute
          for structural recovery when the environment itself is the bottleneck.
        </p>

        <div className="stan-cta-row">
          <a
            className="stan-pdf"
            href="/research/pomdp-aid-allocation-paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read full paper PDF
          </a>
        </div>
      </div>
    </article>
  );
}
