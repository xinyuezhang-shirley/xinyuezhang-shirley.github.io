import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/tesla/tesla-world.css";

const LOG = [
  { t: "14:02:11", level: "ok" as const, msg: "fleet batch ingested · n=12840 VIN windows" },
  { t: "14:02:18", level: "warn" as const, msg: "thermal drift cluster · southwest region · k=17" },
  { t: "14:02:41", level: "crit" as const, msg: "brake health score < threshold · surface to engineer" },
  { t: "14:03:05", level: "ok" as const, msg: "human-in-loop ack · ticket opened · firmware cross-check" },
  { t: "14:03:22", level: "ok" as const, msg: "model output wired → live diagnostics panel" },
];

/**
 * Tesla world — diagnostics bay. Story scrolls beneath a living dashboard.
 */
export default function TeslaRoom() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = window.setInterval(() => setTick((n) => (n + 1) % LOG.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  const visible = LOG.slice(0, Math.min(LOG.length, tick + 2));

  return (
    <article className="tesla-world">
      <div className="tesla-world__inner">
        <Link to="/work" className="tesla-world__back">
          ← Work
        </Link>

        <div className="tesla-world__bar">
          <span>Diagnostics · Fleet ML</span>
          <span>Tesla · Mar–Jun 2025</span>
          <span>Status · monitoring</span>
        </div>

        <h1 className="tesla-world__title">BRAKE HEALTH · FLEET PIPELINE</h1>
        <p className="tesla-world__claim">
          Prediction without a human-in-the-loop workflow is noise. The useful system surfaces risk
          and leaves judgment with the engineer.
        </p>

        <div className="tesla-dash">
          <div className="tesla-card">
            <p className="tesla-card__label">Fleet window</p>
            <p className="tesla-card__value ok">12.8k</p>
            <p className="tesla-card__meta">VIN time-series batches / cycle</p>
            <div className="tesla-gauge">
              <i />
            </div>
          </div>
          <div className="tesla-card">
            <p className="tesla-card__label">Risk surfaced</p>
            <p className="tesla-card__value warn">17</p>
            <p className="tesla-card__meta">Vehicles flagged for thermal / brake review</p>
          </div>
          <div className="tesla-card">
            <p className="tesla-card__label">Crit path</p>
            <p className="tesla-card__value crit">HITL</p>
            <p className="tesla-card__meta">Model → monitor → engineer ack</p>
          </div>
          <div className="tesla-stream" aria-live="polite">
            {visible.map((row) => (
              <div key={row.t + row.msg}>
                <span className={row.level}>[{row.t}]</span> {row.msg}
              </div>
            ))}
          </div>
        </div>

        <section className="tesla-chapter">
          <h2>Context</h2>
          <p>
            Every Model 3 reports telemetry. Somewhere in that stream are early signs of brake
            degradation — before a driver would notice. The internship was to make that signal
            actionable inside tools engineers already trust.
          </p>
        </section>
        <section className="tesla-chapter">
          <h2>Problem</h2>
          <p>
            Fleet-scale time series is only useful if the pipeline is honest about firmware
            regressions and messy production data. A pretty ROC curve that ignores bad sensors is a
            liability.
          </p>
        </section>
        <section className="tesla-chapter">
          <h2>Design &amp; technical decisions</h2>
          <p>
            Production ML pipeline for brake degradation prediction; outputs integrated into live
            monitoring. Human-in-the-loop workflow for high-risk vehicles. Cross-functional
            debugging with firmware teams so the model sees the car the car actually has.
          </p>
        </section>
        <section className="tesla-chapter">
          <h2>Reflection</h2>
          <p>
            Much of the work was less glamorous than “deployed a model.” Reliability of the signal
            is the product. This room looks like a bay because the work lived in one — not in a
            slide deck.
          </p>
        </section>
      </div>
    </article>
  );
}
