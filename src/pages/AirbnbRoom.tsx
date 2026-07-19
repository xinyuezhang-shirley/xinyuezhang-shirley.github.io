import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { researchProjects } from "@/content/research";
import "@/work/stanford/stanford.css";

/** Pass rates at ≥4.9 from public/research/airbnb/data/threshold_pass_rates_by_city.csv */
const PASS_AT_49: Record<string, { label: string; pct: number; n: number }> = {
  chicago: { label: "Chicago", pct: 44.2, n: 6976 },
  berlin: { label: "Berlin", pct: 43.3, n: 10960 },
  tokyo: { label: "Tokyo", pct: 34.7, n: 24009 },
  hongkong: { label: "Hong Kong", pct: 31.7, n: 3585 },
};

const CITY_KEYS = ["chicago", "berlin", "tokyo", "hongkong"] as const;

type CityKey = (typeof CITY_KEYS)[number];

const FIGURES = [
  {
    id: "hist",
    label: "Ratings histogram by city",
    src: "/research/airbnb/ratings_hist_by_city.png",
    caption:
      "Raw rating distributions differ across markets — the same star sits at different heights in each city’s local mass.",
  },
  {
    id: "ecdf",
    label: "Rating ECDF by city",
    src: "/research/airbnb/rating_ecdf_by_city.png",
    caption:
      "Empirical CDFs make the calibration claim geometric: identical cutoffs cross different cumulative shares.",
  },
  {
    id: "threshold",
    label: "Threshold pass rates",
    src: "/research/airbnb/threshold_pass_rates_grouped_by_city.png",
    caption:
      "Grouped pass rates at common cutoffs (4.7–5.0). Chicago and Berlin clear 4.9 far more often than Hong Kong.",
  },
  {
    id: "style",
    label: "Multilingual review style",
    src: "/research/airbnb/multilingual_style_by_city.png",
    caption:
      "Even at matched star bands, review language differs by city — politeness and expressiveness are not universal.",
  },
  {
    id: "jaccard",
    label: "Ranking Jaccard by tier",
    src: "/research/airbnb/ranking_global_jaccard_by_tier.png",
    caption:
      "Re-ranking by within-city percentile reshapes the elite tier: Jaccard overlap with raw-star ranking falls in the top percentiles.",
  },
  {
    id: "cohort",
    label: "Cohort city-deviation heatmap",
    src: "/research/airbnb/cohort_city_deviation_heatmap.png",
    caption:
      "Within matched cohorts of comparable listings, city deviations persist — composition alone does not erase the gap.",
  },
  {
    id: "complaint",
    label: "Complaint vs rating correlation",
    src: "/research/airbnb/complaint_vs_rating_correlation.png",
    caption:
      "Complaint language correlates with ratings differently across cities, another signal that stars encode local norms.",
  },
] as const;

const project = researchProjects.find((p) => p.slug === "airbnb-rating-calibration")!;

export default function AirbnbRoom() {
  const [cityA, setCityA] = useState<CityKey>("chicago");
  const [cityB, setCityB] = useState<CityKey>("hongkong");
  const [figureId, setFigureId] = useState<(typeof FIGURES)[number]["id"]>("threshold");

  const a = PASS_AT_49[cityA];
  const b = PASS_AT_49[cityB];
  const delta = useMemo(() => Math.abs(a.pct - b.pct), [a.pct, b.pct]);
  const figure = FIGURES.find((f) => f.id === figureId) ?? FIGURES[0];

  return (
    <article className="stan-pub">
      <div className="stan-pub__inner">
        <Link to="/research" className="stan-pub__back">
          ← Research
        </Link>

        <p className="stan-pub__kicker">CS 281 · Stanford University · Spring 2026</p>
        <h1 className="stan-pub__title">{project.title}</h1>
        <p className="stan-pub__subtitle">
          A standardized five-star scale is not a universal measure of quality.
        </p>
        <p className="stan-pub__byline">
          <strong>Xinyue (Shirley) Zhang</strong> · CS281 Stanford Spring 2026 · Berlin · Chicago ·
          Hong Kong · Tokyo · Inside Airbnb
        </p>

        <h2>Abstract</h2>
        <div className="stan-pub__abstract">
          <p>{project.abstract}</p>
        </div>

        <h2>Research question</h2>
        <p>
          Do identical Airbnb star ratings carry equivalent meaning across cities? And if
          calibration differs, does that difference translate into measurable disparities in
          platform visibility?
        </p>

        <h2>Why 5 stars aren&apos;t universal</h2>
        <p>
          Prior work shows ratings are inflated and shaped by social context. A global threshold
          like 4.9 looks fair because it is the same number everywhere — but if 4.9 is common in
          Chicago and rare in Hong Kong, then treating that cutoff as a universal quality bar quietly
          redistributes opportunity. The project treats that as an empirical claim, measured with
          Inside Airbnb listings from four markets.
        </p>

        <h2>Cities &amp; data</h2>
        <p>
          Analysis covers <strong>Berlin</strong>, <strong>Chicago</strong>,{" "}
          <strong>Hong Kong</strong>, and <strong>Tokyo</strong> using public Inside Airbnb dumps.
          Rated listing counts at the 4.9 cutoff: Berlin {PASS_AT_49.berlin.n.toLocaleString()},
          Chicago {PASS_AT_49.chicago.n.toLocaleString()}, Hong Kong{" "}
          {PASS_AT_49.hongkong.n.toLocaleString()}, Tokyo {PASS_AT_49.tokyo.n.toLocaleString()}.
        </p>

        <h2>Method &amp; controls</h2>
        <p>
          Five complementary steps move from description to counterfactual ranking: (1) rating
          distributions and ECDFs; (2) threshold pass rates at 4.7–5.0; (3) matched cohorts of
          comparable listings (room type, price, occupancy); (4) OLS with controls for price,
          capacity, review volume, room type, Superhost status, and property type; (5) review-language
          style at matched stars and a ranking simulation that swaps raw stars for within-city
          percentiles. The normalized ranking is not proposed as “correct” — it measures how much
          calibration matters once it reaches a ranking algorithm.
        </p>

        <h2 id="city-comparator">City comparator</h2>
        <p>
          Select two cities to compare pass rates at ≥4.9★ (from{" "}
          <code>threshold_pass_rates_by_city.csv</code>), then inspect the evidence figures that
          ground the claim.
        </p>
      </div>

      <div className="stan-pub__wide">
        <div className="stan-instrument" aria-labelledby="city-comparator-label">
          <p className="stan-instrument__label" id="city-comparator-label">
            Interactive · CityComparator
          </p>
          <p className="stan-instrument__hint">
            Pass rates below are the share of rated listings at ≥4.9 stars. Chicago ≈ 44.2%, Berlin ≈
            43.3%, Tokyo ≈ 34.7%, Hong Kong ≈ 31.7%.
          </p>

          <div className="stan-city-pick">
            <div className="stan-city-pick__group">
              <p>City A</p>
              <div className="stan-chip-row" role="group" aria-label="Select city A">
                {CITY_KEYS.map((key) => (
                  <button
                    key={`a-${key}`}
                    type="button"
                    className={`stan-chip${cityA === key ? " is-on" : ""}`}
                    onClick={() => setCityA(key)}
                    disabled={key === cityB}
                    aria-pressed={cityA === key}
                  >
                    {PASS_AT_49[key].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="stan-city-pick__group">
              <p>City B</p>
              <div className="stan-chip-row" role="group" aria-label="Select city B">
                {CITY_KEYS.map((key) => (
                  <button
                    key={`b-${key}`}
                    type="button"
                    className={`stan-chip${cityB === key ? " is-on" : ""}`}
                    onClick={() => setCityB(key)}
                    disabled={key === cityA}
                    aria-pressed={cityB === key}
                  >
                    {PASS_AT_49[key].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="stan-compare" aria-live="polite">
            <div className="stan-compare__card">
              <strong>{a.label}</strong>
              <div className="stan-compare__pct">{a.pct.toFixed(1)}%</div>
              <div className="stan-compare__meta">pass ≥4.9 · n = {a.n.toLocaleString()}</div>
            </div>
            <div className="stan-compare__delta">
              Absolute gap
              <span>{delta.toFixed(1)} pp</span>
            </div>
            <div className="stan-compare__card">
              <strong>{b.label}</strong>
              <div className="stan-compare__pct">{b.pct.toFixed(1)}%</div>
              <div className="stan-compare__meta">pass ≥4.9 · n = {b.n.toLocaleString()}</div>
            </div>
          </div>

          <p className="stan-instrument__label">Evidence figure</p>
          <div className="stan-chip-row" role="tablist" aria-label="Select evidence figure">
            {FIGURES.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                className={`stan-chip${figureId === f.id ? " is-on" : ""}`}
                aria-selected={figureId === f.id}
                onClick={() => setFigureId(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <figure className="stan-fig" style={{ margin: 0, border: "none", padding: 0, background: "transparent" }}>
            <img src={figure.src} alt={figure.label} />
            <figcaption className="stan-fig__cap">{figure.caption}</figcaption>
          </figure>
        </div>
      </div>

      <div className="stan-pub__inner">
        <h2 id="figures">Figure gallery</h2>
        <p>Additional report figures used in the analysis pipeline.</p>
      </div>

      <div className="stan-pub__wide">
        <div className="stan-fig-grid is-two" id="explore-figures">
          {[
            {
              src: "/research/airbnb/city_threshold_summary.png",
              label: "City threshold summary",
              cap: "Summary of threshold clearance across the four markets.",
            },
            {
              src: "/research/airbnb/city_mean_rating_unadjusted.png",
              label: "Unadjusted mean rating by city",
              cap: "Mean ratings before composition controls — a first look at market-level inflation.",
            },
            {
              src: "/research/airbnb/politeness_coef_all_vs_english.png",
              label: "Politeness coefficients",
              cap: "All-language vs English-only politeness coefficients by city.",
            },
            {
              src: "/research/airbnb/ranking_delta_rank_hist.png",
              label: "Ranking delta histogram",
              cap: "How far listings move when raw stars are replaced by city-normalized standing.",
            },
          ].map((fig) => (
            <figure key={fig.src} className="stan-fig">
              <p className="stan-fig__label">{fig.label}</p>
              <img src={fig.src} alt={fig.label} />
              <figcaption className="stan-fig__cap">{fig.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="stan-pub__inner">
        <h2>Findings</h2>
        <ul className="stan-findings">
          {project.keyFindings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2>Limitations</h2>
        <p>
          Inside Airbnb is a scrape of public listings, not Airbnb’s internal ranking logs.
          Matched cohorts and OLS reduce composition confounds but cannot fully recover the
          platform’s private ranking features. Review-language measures depend on available text
          and language detection; cross-city comparisons of style are correlational. The
          city-normalized ranking is a counterfactual instrument, not a proposed product policy.
        </p>

        <h2>Conclusion</h2>
        <p>
          A metric that looks universal can still be a local dialect wearing a global uniform.
          Local evaluation norms get embedded into reputation systems, and those norms can
          translate directly into unequal visibility across markets.
        </p>

        <div className="stan-cta-row">
          <a
            className="stan-pdf"
            href="/research/airbnb-rating-calibration-poster.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View poster PDF
          </a>
          <a className="stan-pdf-secondary" href="#city-comparator">
            Explore figures
          </a>
        </div>
      </div>
    </article>
  );
}
