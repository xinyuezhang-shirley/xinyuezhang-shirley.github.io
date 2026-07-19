import { useEffect, useState } from "react";

/** Pass rates at ≥4.9 from yelpAnalysis/outputs/tables/threshold_pass_rates_by_city.csv */
const CITIES = [
  { city: "Chicago", pct: 44.2 },
  { city: "Berlin", pct: 43.3 },
  { city: "Tokyo", pct: 34.7 },
  { city: "Hong Kong", pct: 31.7, low: true },
] as const;

/**
 * Interactive claim plate — 4.9 ≠ 4.9 across cities.
 * Numbers from the project's own threshold tables, not invented.
 */
export function ClaimFigure() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <figure>
      <p className="airbnb-plate-label">Figure · Claim plate</p>
      <div className="airbnb-claim-figure">
        <div className="airbnb-claim-head">
          <strong>
            Share of listings at <em style={{ color: "var(--ab-coral)", fontStyle: "italic" }}>≥ 4.9★</em>
          </strong>
          <span>Identical threshold · four cities</span>
        </div>
        <div className="airbnb-bars" role="img" aria-label="Pass rates at 4.9 stars by city">
          {CITIES.map((row) => (
            <div
              key={row.city}
              className={`airbnb-bar-row${"low" in row && row.low ? " is-low" : ""}`}
            >
              <span className="airbnb-bar-city">{row.city}</span>
              <div className="airbnb-bar-track">
                <div
                  className="airbnb-bar-fill"
                  style={{ width: ready ? `${row.pct}%` : "0%" }}
                />
              </div>
              <span className="airbnb-bar-pct">{row.pct.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="airbnb-caption">
        Same star threshold, different local standing. Hong Kong clears 4.9 far less often than
        Chicago or Berlin — and the gap persists in matched cohorts. Data from the analysis tables
        behind <code>city_threshold_summary</code>.
      </figcaption>
    </figure>
  );
}
