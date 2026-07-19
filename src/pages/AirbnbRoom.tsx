import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/work/stanford/stanford.css";

const CITIES = [
  { city: "Chicago", pct: 44.2 },
  { city: "Berlin", pct: 43.3 },
  { city: "Tokyo", pct: 34.7 },
  { city: "Hong Kong", pct: 31.7, low: true },
] as const;

export default function AirbnbRoom() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>

        <p className="stan-pub__kicker">Interactive publication · CS 281 · Stanford</p>
        <h1 className="stan-pub__title">
          The Illusion of 5 Stars: Cross-City Rating Calibration and Visibility Disparities on
          Airbnb
        </h1>
        <p className="stan-pub__subtitle">
          A standardized star is not a universal measure of quality.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong> · Spring 2026 · Berlin · Chicago · Hong Kong ·
          Tokyo · Inside Airbnb
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>
            Airbnb ratings are often treated as universal measures of quality, but prior work
            suggests they are inflated and shaped by social context. Using listings from four
            cities, this study asks whether identical star ratings carry equivalent meaning across
            markets — and whether calibration differences translate into measurable differences in
            platform visibility.
          </p>
        </div>

        <h2>Key contributions</h2>
        <ol className="stan-pub__contrib">
          <li>
            Show that common thresholds (4.8 / 4.9) correspond to very different local standing —
            Hong Kong clears them far less often than Chicago or Berlin.
          </li>
          <li>
            Persist the gap inside matched cohorts and after OLS controls for price, capacity,
            reviews, room type, Superhost, and property type.
          </li>
          <li>
            Demonstrate that re-ranking by within-city percentile reshapes the elite tier: only
            ~40% of the raw top 1% remain after city-normalization.
          </li>
        </ol>

        <h2>Motivation</h2>
        <p>
          If 4.9 means “excellent” everywhere, platform reputation is fair. If 4.9 means different
          local percentiles in different cities, then a global threshold quietly redistributes
          opportunity. The project treats that as an empirical claim, not a slogan.
        </p>

        <h2>Interactive figure · the claim</h2>
      </div>

      <div className="stan-pub__wide">
        <figure className="stan-fig">
          <p className="stan-fig__label">Figure 1 · Share of listings at ≥ 4.9★</p>
          <div className="stan-bars">
            {CITIES.map((row) => (
              <div key={row.city} className={`stan-bar-row${"low" in row && row.low ? " is-low" : ""}`}>
                <span>{row.city}</span>
                <div className="stan-bar-track">
                  <div className="stan-bar-fill" style={{ width: ready ? `${row.pct}%` : "0%" }} />
                </div>
                <span>{row.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
          <figcaption className="stan-fig__cap">
            Identical threshold, different local standing. Data from{" "}
            <code>threshold_pass_rates_by_city.csv</code> in the analysis pipeline.
          </figcaption>
        </figure>
      </div>

      <div className="stan-pub__inner">
        <h2>Method</h2>
        <p>
          Five complementary steps: descriptive rating distributions → matched cohorts of
          comparable listings → OLS with city effects → review-language style at matched stars →
          ranking counterfactual that swaps raw stars for city-normalized standing. The normalized
          ranking is not proposed as “correct” — it measures how much calibration matters once it
          reaches a ranking algorithm.
        </p>

        <h2>Findings</h2>
        <p>
          The gap survives composition controls. Review language also differs by city at matching
          star bands — Chicago reads more polite and enthusiastic; Hong Kong less expressive, even
          in English. Visibility is the stakes: calibration is not a footnote to ranking; it is an
          input.
        </p>

        <h2>Conclusion</h2>
        <p>
          A metric that looks universal can still be a local dialect wearing a global uniform.
          Remember: the same number means different things to different people — and that is
          measurable.
        </p>

        <a
          className="stan-pdf"
          href="/research/airbnb-rating-calibration-poster.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read full poster →
        </a>
      </div>
    </article>
  );
}
