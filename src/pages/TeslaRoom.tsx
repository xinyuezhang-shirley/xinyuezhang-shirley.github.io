import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/tesla/tesla-world.css";

const LOG = [
  { t: "14:02:11", level: "ok" as const, msg: "fleet batch ingested · Model 3 telemetry · 1M+ VIN space" },
  { t: "14:02:18", level: "warn" as const, msg: "brake-fluid risk cluster · chassis review · k=17" },
  { t: "14:02:41", level: "crit" as const, msg: "vehicle risk score elevated · surface to service dashboard" },
  { t: "14:03:05", level: "ok" as const, msg: "Spark daily serve complete · precision hold 96.6%" },
  { t: "14:03:22", level: "ok" as const, msg: "~25% of deteriorations flagged up to 2 months early" },
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
          Fleet-scale brake deterioration detection — ingest, score, and surface risk so chassis and
          service teams can act before a leak becomes a visit.
        </p>

        <div className="tesla-dash">
          <div className="tesla-card">
            <p className="tesla-card__label">Fleet scope</p>
            <p className="tesla-card__value ok">1M+</p>
            <p className="tesla-card__meta">Model 3 vehicles in telemetry space</p>
            <div className="tesla-gauge">
              <i />
            </div>
          </div>
          <div className="tesla-card">
            <p className="tesla-card__label">Precision</p>
            <p className="tesla-card__value warn">96.6%</p>
            <p className="tesla-card__meta">Validated on serviced vehicles</p>
          </div>
          <div className="tesla-card">
            <p className="tesla-card__label">Early signal</p>
            <p className="tesla-card__value crit">~25%</p>
            <p className="tesla-card__meta">Deteriorations flagged up to 2 months early</p>
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
            Architected a fleet-scale brake deterioration detection platform on telemetry from 1M+
            Model 3 vehicles — data ingestion, feature engineering, model inference, and
            visualizations aimed at vehicles at risk of brake fluid leaks.
          </p>
        </section>
        <section className="tesla-chapter">
          <h2>Problem</h2>
          <p>
            Manual, ad-hoc investigations do not scale to a million cars. The useful system has to
            score risk daily and put high-priority cases in front of chassis and service teams —
            without pretending every flag is certain.
          </p>
        </section>
        <section className="tesla-chapter">
          <h2>Design &amp; technical decisions</h2>
          <p>
            Spark-based serving pipeline for automated daily fleet health analysis; vehicle-level
            risk scores on internal dashboards. A 96.6% precision model on serviced vehicles,
            catching roughly a quarter of deteriorating brake systems up to two months before
            service — continuous monitoring instead of one-off hunts.
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
