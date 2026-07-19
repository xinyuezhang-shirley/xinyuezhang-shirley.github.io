import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/tesla/tesla-world.css";

type StageId =
  | "telemetry"
  | "signals"
  | "features"
  | "model"
  | "threshold"
  | "dashboard"
  | "service";

const STAGES: {
  id: StageId;
  label: string;
  title: string;
  body: string;
  detail: string[];
}[] = [
  {
    id: "telemetry",
    label: "01 · Telemetry",
    title: "Fleet braking events",
    body: "Raw vehicle telemetry arrives as braking events across a large Model 3 fleet. The daily pipeline starts by ingesting what the vehicle actually did under braking — not what a late fluid alert eventually reports.",
    detail: [
      "Chassis-relevant braking events are the source of truth for early deterioration signals.",
      "Volume is fleet-scale; the design assumption is continuous daily processing, not ad-hoc pulls.",
    ],
  },
  {
    id: "signals",
    label: "02 · Signals",
    title: "Filter and clean",
    body: "Events are filtered and cleaned before anything is scored. Noise that looks like braking but is not usable for health estimation is removed so the metric reflects real actuation behavior.",
    detail: [
      "Filter for usable braking rather than every pedal-adjacent event.",
      "Remove near-brake-booster points that distort the health picture.",
      "Limit points per vehicle so one noisy day cannot dominate the metric.",
    ],
  },
  {
    id: "features",
    label: "03 · Features",
    title: "Brake health metric",
    body: "Cleaned events become a brake health metric per vehicle per day. Feature work emphasizes long drives, harder brake presses, and larger rod actuation distances so day-to-day variation is informative rather than random.",
    detail: [
      "Long drives contribute more stable braking context.",
      "Harder brake presses and larger rod actuation distances sharpen the health signal.",
      "The daily metric is stored so thresholds can be retuned without replaying the entire fleet history from scratch.",
    ],
  },
  {
    id: "model",
    label: "04 · Model",
    title: "Logistic regression risk",
    body: "A linear combination of features becomes a score; a sigmoid maps that score to a probability; a threshold turns probability into a service-relevant flag. Logistic regression was chosen for onboard practicality — simple, low memory — not for novelty.",
    detail: [
      "Score = weighted sum of engineered features (schematic weights shown below).",
      "Probability = sigmoid(score).",
      "Flag = probability above a tuned threshold, with consecutive-day criteria applied downstream in SQL.",
    ],
  },
  {
    id: "threshold",
    label: "05 · Threshold",
    title: "SQL flagging rules",
    body: "Intermediate results are retained so threshold and consecutive-day rules can be tuned against outcomes. Flagging is deliberately precision-oriented: a false positive can trigger unnecessary service work.",
    detail: [
      "Dashboard SQL applies probability threshold plus consecutive-day persistence.",
      "Stored intermediates support retuning without re-deriving every feature.",
      "Optimization target: precision for service decisions (~96.6% on the validated sample).",
    ],
  },
  {
    id: "dashboard",
    label: "06 · Dashboard",
    title: "Fleet visibility",
    body: "Flagged vehicles surface to chassis and service teams with counts over time, geographic distribution, and individual-vehicle plots — enough to investigate without needing proprietary screenshots on a public site.",
    detail: [
      "Lists of flagged vehicles for triage.",
      "Counts over time to watch fleet risk trend.",
      "Geo distribution and per-vehicle plots for investigation depth.",
    ],
  },
  {
    id: "service",
    label: "07 · Service",
    title: "Earlier intervention",
    body: "The operational failure mode is chassis brake line damage from salt and stones leading to fluid leaks. Low brake fluid alerts arrive too late and sometimes fail. Early flags exist to move work upstream of that alert.",
    detail: [
      "On a ~200 vehicle serviced sample: ~25% flagged up to two months early.",
      "Most of the remainder flagged within about two weeks of service.",
      "Outcome is continuous monitoring instead of manual one-off hunts.",
    ],
  },
];

/** Illustrative schematic weights — not proprietary Tesla coefficients. */
const FEATURE_WEIGHTS = [
  { name: "Daily brake-health metric", w: 1.4 },
  { name: "Harder brake-press share", w: 0.9 },
  { name: "Long-drive braking context", w: 0.7 },
  { name: "Rod actuation distance signal", w: 1.1 },
  { name: "Usable-event density", w: 0.5 },
  { name: "Near-booster residual (penalized)", w: -0.6 },
] as const;

const SKILL_MODULES = [
  {
    title: "Signal validation",
    items: ["Event filtering", "Usable braking criteria", "Booster-near rejection"],
  },
  {
    title: "Feature engineering",
    items: ["Per-vehicle/day metric", "Actuation distance", "Point caps"],
  },
  {
    title: "Model & serving",
    items: ["Logistic regression", "Daily Spark pipeline", "Intermediate stores"],
  },
  {
    title: "Operations surface",
    items: ["SQL threshold rules", "Dashboard views", "Service triage"],
  },
] as const;

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Tesla · Brake health fleet pipeline
 * Clean industrial aesthetic — no green terminal cosplay, no fake internal UI.
 */
export default function TeslaRoom() {
  const [active, setActive] = useState<StageId>("telemetry");
  const [scoreDemo, setScoreDemo] = useState(0.42);
  const stage = STAGES.find((s) => s.id === active) ?? STAGES[0];

  const linear =
    FEATURE_WEIGHTS.reduce((acc, f) => acc + f.w * (0.35 + scoreDemo * 0.4), 0) / 3.2;
  const probability = sigmoid(linear - 1.1);
  const flagged = probability >= 0.72;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setScoreDemo((v) => {
        const next = v + 0.08;
        return next > 1 ? 0.2 : next;
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <article className="tesla-world">
      <div className="tesla-world__inner">
        <Link to="/work" className="tesla-world__back">
          ← Back to Work
        </Link>

        <header className="tesla-hero">
          <p className="tesla-hero__eyebrow">Tesla · Data Analyst Intern · Mar–Jun 2025</p>
          <h1 className="tesla-hero__title">Brake health · fleet risk pipeline</h1>
          <p className="tesla-hero__lede">
            End-to-end ownership from signal validation through a daily Spark pipeline to a
            precision-oriented dashboard — so chassis and service teams can act before a late fluid
            alert.
          </p>
          <dl className="tesla-meta">
            <div>
              <dt>Company</dt>
              <dd>Tesla</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>Data Analyst Intern, ML &amp; Data Engineering</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>1M+ Model 3 telemetry space</dd>
            </div>
            <div>
              <dt>Precision</dt>
              <dd>~96.6% on serviced validation</dd>
            </div>
          </dl>
        </header>

        <section className="tesla-section" aria-labelledby="tesla-pipeline">
          <h2 id="tesla-pipeline">Central interaction · pipeline stages</h2>
          <p className="tesla-section__intro">
            Click a stage to expand what happens there. This is a public schematic of the owned
            path — not a recreation of internal Tesla tooling.
          </p>

          <div className="tesla-stages" role="list">
            {STAGES.map((s) => {
              const open = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="listitem"
                  className={`tesla-stage${open ? " is-open" : ""}`}
                  aria-expanded={open}
                  onClick={() => setActive(s.id)}
                >
                  <span className="tesla-stage__label">{s.label}</span>
                  <span className="tesla-stage__title">{s.title}</span>
                  <span className="tesla-stage__hint">
                    {open ? "Expanded — click another stage" : "Click to expand this stage"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="tesla-stage-panel" aria-live="polite">
            <h3>
              {stage.label} — {stage.title}
            </h3>
            <p>{stage.body}</p>
            <ul>
              {stage.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-model">
          <h2 id="tesla-model">Model visualization · schematic, not proprietary</h2>
          <p className="tesla-section__intro">
            Feature labels below are illustrative names drawn from the public narrative. Weights are
            schematic for teaching the logistic path — they are not Tesla&apos;s internal
            coefficients.
          </p>

          <div className="tesla-model">
            <div className="tesla-model__weights">
              <h3>Feature weights (schematic)</h3>
              <ul>
                {FEATURE_WEIGHTS.map((f) => (
                  <li key={f.name}>
                    <span className="tesla-model__fname">{f.name}</span>
                    <span
                      className="tesla-model__bar"
                      style={{
                        width: `${Math.min(100, Math.abs(f.w) * 55)}%`,
                        background: f.w < 0 ? "var(--ts-muted)" : "var(--ts-red)",
                      }}
                      aria-hidden
                    />
                    <span className="tesla-model__w">
                      {f.w > 0 ? "+" : ""}
                      {f.w.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="tesla-model__note">
                Schematic demonstration only · not proprietary model weights
              </p>
            </div>

            <div className="tesla-model__flow">
              <h3>Score → probability → threshold</h3>
              <ol className="tesla-logit">
                <li>
                  <strong>Linear score</strong>
                  <span>Weighted sum of daily features</span>
                  <output>{linear.toFixed(2)}</output>
                </li>
                <li>
                  <strong>Sigmoid</strong>
                  <span>Maps score to risk probability</span>
                  <output>{(probability * 100).toFixed(1)}%</output>
                </li>
                <li>
                  <strong>Threshold</strong>
                  <span>Example cut at 72% + consecutive-day SQL</span>
                  <output className={flagged ? "is-flag" : ""}>
                    {flagged ? "Flagged for review" : "Below flag line"}
                  </output>
                </li>
              </ol>
              <div className="tesla-risk-meter" aria-hidden={!flagged}>
                <div className="tesla-risk-meter__track">
                  <i style={{ width: `${Math.min(100, probability * 100)}%` }} />
                  <b style={{ left: "72%" }} title="Example threshold" />
                </div>
                <p>
                  Demo intensity {Math.round(scoreDemo * 100)}% ·{" "}
                  {flagged
                    ? "Would surface on dashboard under this schematic threshold"
                    : "Would remain in monitoring under this schematic threshold"}
                </p>
              </div>
              <button
                type="button"
                className="tesla-btn"
                onClick={() => setScoreDemo((v) => (v > 0.75 ? 0.25 : v + 0.2))}
              >
                Step demo risk intensity
              </button>
            </div>
          </div>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-context">
          <h2 id="tesla-context">Context</h2>
          <p>
            Chassis brake lines can be damaged by road salt and stones. Fluid leaks follow. The
            vehicle&apos;s low brake fluid alert is often too late — and sometimes fails — so the
            useful system has to estimate deterioration from braking telemetry before that alert
            fires.
          </p>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-resp">
          <h2 id="tesla-resp">Responsibilities</h2>
          <p>
            Owner end-to-end: signal validation → feature engineering → logistic regression
            (selected for onboard simplicity and low memory) → daily Spark pipeline → dashboard
            surfaces used by chassis and service. Intermediate results were stored specifically to
            support threshold tuning.
          </p>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-system">
          <h2 id="tesla-system">System</h2>
          <ol className="tesla-olist">
            <li>Filter and clean braking events from fleet telemetry.</li>
            <li>Compute a brake health metric per vehicle per day.</li>
            <li>Score risk with logistic regression (linear score → sigmoid → probability).</li>
            <li>Apply SQL flagging with threshold and consecutive-day criteria.</li>
            <li>
              Expose flagged vehicles, counts over time, geo distribution, and individual-vehicle
              plots.
            </li>
          </ol>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-outcomes">
          <h2 id="tesla-outcomes">Outcomes</h2>
          <ul className="tesla-stats">
            <li>
              <strong>~96.6%</strong>
              <span>Precision — optimized for service decisions</span>
            </li>
            <li>
              <strong>~25%</strong>
              <span>Of ~200 serviced sample flagged up to 2 months early</span>
            </li>
            <li>
              <strong>≤2 weeks</strong>
              <span>Most remaining flags arrived within about two weeks</span>
            </li>
          </ul>
          <p>
            The operational shift is from manual investigations to continuous fleet monitoring with
            a precision-first flagging policy.
          </p>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-skills">
          <h2 id="tesla-skills">Skills as engineering modules</h2>
          <div className="tesla-modules">
            {SKILL_MODULES.map((m) => (
              <div key={m.title} className="tesla-module">
                <h3>{m.title}</h3>
                <ul>
                  {m.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="tesla-section" aria-labelledby="tesla-xf">
          <h2 id="tesla-xf">Cross-functional</h2>
          <p>
            Dashboard consumers were chassis and service teams. The pipeline&apos;s job was not to
            look clever in isolation — it was to put durable, high-precision flags in front of
            people who schedule service.
          </p>
        </section>

        <section className="tesla-section tesla-nda" aria-labelledby="tesla-nda">
          <h2 id="tesla-nda">NDA &amp; disclosure</h2>
          <p>
            No fake internal Tesla screenshots appear on this page. Visualizations are schematic
            teaching aids derived from the public project narrative. Proprietary dashboards, raw
            telemetry, and true model coefficients remain internal.
          </p>
        </section>
      </div>
    </article>
  );
}
