import { Link } from "react-router-dom";
import { ClaimFigure } from "@/work/airbnb/components/ClaimFigure";
import "@/work/airbnb/airbnb.css";

export default function AirbnbRoom() {
  return (
    <article className="airbnb-room">
      <div className="airbnb-inner">
        <Link to="/research" className="airbnb-back">
          ← Research
        </Link>

        <header>
          <p className="airbnb-eyebrow">Case study · Rating calibration</p>
          <h1 className="airbnb-title">The Illusion of 5 Stars</h1>
          <p className="airbnb-meta">
            CS 281 · Ethics of AI · Stanford · Spring 2026 · Berlin · Chicago · Hong Kong · Tokyo
          </p>
        </header>

        <p className="airbnb-claim">
          4.9 <em>≠</em> 4.9
        </p>

        <div className="airbnb-prose">
          <p>
            Airbnb ratings are treated as a universal measure of quality. They are not. Using
            Inside Airbnb data across four cities, this project asks whether identical star ratings
            carry equivalent meaning — and whether calibration differences translate into unequal
            visibility on the platform.
          </p>
          <p>
            The argument is not that any city is “better.” It is that a standardized five-star scale
            embeds local evaluation norms into reputation systems, which can become unequal
            opportunity once those numbers feed ranking.
          </p>
        </div>

        <section className="airbnb-section" aria-labelledby="ab-claim">
          <h2 id="ab-claim" className="airbnb-section-title">
            The claim, as a figure
          </h2>
          <ClaimFigure />
        </section>

        <section className="airbnb-section" aria-labelledby="ab-method">
          <h2 id="ab-method" className="airbnb-section-title">
            Why the gap is not just mix
          </h2>
          <div className="airbnb-prose" style={{ marginBottom: "1.25rem" }}>
            <p>
              Descriptive distributions are only the opening move. Matched cohorts of comparable
              listings, OLS with controls, review-language style, and a ranking counterfactual all
              ask the same question: does calibration survive once composition is held still?
            </p>
          </div>
          <figure className="airbnb-figure" style={{ marginBottom: "2rem" }}>
            <p className="airbnb-plate-label">Figure · Threshold summary (publication)</p>
            <img
              src="/research/airbnb/city_threshold_summary.png"
              alt="City threshold pass-rate summary chart from the Airbnb calibration study"
              loading="lazy"
            />
          </figure>
          <figure className="airbnb-figure" style={{ marginBottom: "2rem" }}>
            <p className="airbnb-plate-label">Figure · Cohort deviation heatmap</p>
            <img
              src="/research/airbnb/cohort_city_deviation_heatmap.png"
              alt="Heatmap of cohort rating deviations by city"
              loading="lazy"
            />
            <figcaption className="airbnb-caption">
              Warm peach cells from the paper&apos;s heatmap set the room&apos;s secondary warmth;
              blues mark the primary threshold argument.
            </figcaption>
          </figure>
          <figure className="airbnb-figure">
            <p className="airbnb-plate-label">Figure · Complaint vs rating</p>
            <img
              src="/research/airbnb/complaint_vs_rating_correlation.png"
              alt="Complaint rate versus star rating correlation by city"
              loading="lazy"
            />
          </figure>
        </section>

        <section className="airbnb-section" aria-labelledby="ab-rank">
          <h2 id="ab-rank" className="airbnb-section-title">
            Visibility is the stakes
          </h2>
          <div className="airbnb-prose">
            <p>
              Re-ranking by within-city percentile instead of raw stars changes the elite tier
              sharply — only about 40% of listings in the raw top 1% remain there after
              city-normalization. Calibration is not a footnote; it is a ranking input.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <a className="airbnb-link" href="/research/airbnb-rating-calibration-poster.pdf" target="_blank" rel="noopener noreferrer">
                View poster (PDF) ↗
              </a>
            </p>
          </div>
        </section>

        <section className="airbnb-learn" aria-labelledby="ab-learn">
          <h2 id="ab-learn">What I learned · why remember it</h2>
          <div className="airbnb-prose">
            <p>
              A metric that looks universal can still be a local dialect wearing a global uniform.
              Remember: the same number means different things to different people — and that is
              measurable.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
