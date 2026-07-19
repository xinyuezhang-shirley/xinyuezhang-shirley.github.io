import { useMemo, useState } from "react";

type Case = {
  id: string;
  experience: string;
  perspective: string;
  issue: string;
  src: string;
  caption: string;
  notice: string;
  variables: string;
};

/** Only curated triples with real figures — unsupported combinations are disabled. */
const CASES: Case[] = [
  {
    id: "travel",
    experience: "Travel without a car",
    perspective: "Urban vs rural",
    issue: "Business / venue availability",
    src: "/media/research/differ/plots/travelWithoutCar_business.png",
    caption:
      "Selected study plot: travel-without-car experience under an urban/rural perspective, scored for venue availability.",
    variables: "Experience = travel without a car · Perspective = urban/rural · Issue = prevalence of supporting businesses",
    notice:
      "Urban settings show substantially denser supporting businesses than rural ones. The plot makes the geographic split visible before a designer assumes the experience is universally available.",
  },
  {
    id: "watch",
    experience: "Watch a sports game",
    perspective: "Adult vs youth",
    issue: "Age-appropriate venues",
    src: "/media/research/differ/plots/watchGameBars_Age.png",
    caption:
      "Selected study plot: watching a sports game, compared across adult and youth perspectives for bar-type venues.",
    variables: "Experience = watch sports · Perspective = age cohort · Issue = venue appropriateness / availability",
    notice:
      "Adult-oriented venues dominate; youth access collapses. The figure shows how the same “watch a game” concept fractures once age is the accountable perspective.",
  },
  {
    id: "thrift",
    experience: "Thrifting",
    perspective: "Neighborhood / business context",
    issue: "Business availability",
    src: "/media/research/differ/plots/thrifting_business.png",
    caption: "Selected study plot: thrifting experience scored for business availability across reference venues.",
    variables: "Experience = thrifting · Perspective = local business landscape · Issue = prevalence",
    notice:
      "Thrifting is not evenly distributed across the city fabric. The bar structure shows where the experience is supported versus sparse.",
  },
  {
    id: "photo",
    experience: "Photography outing",
    perspective: "Pennsylvania vs Florida",
    issue: "State-level difference",
    src: "/media/research/differ/plots/photo_PA_FL.png",
    caption: "Selected study plot: photography-related experience compared between Pennsylvania and Florida.",
    variables: "Experience = photo outing · Perspective = state geography · Issue = comparative availability",
    notice:
      "State-level context changes what “going out to take photos” can mean in practice. The comparison is evidence of geographic difference, not a live recomputation.",
  },
  {
    id: "historic",
    experience: "Historical immersive visit",
    perspective: "Business landscape",
    issue: "Venue support",
    src: "/media/research/differ/plots/historicalImmersive_business.png",
    caption: "Selected study plot: historical immersive experience under a business-availability issue function.",
    variables: "Experience = historical immersive · Perspective = venue ecology · Issue = business support",
    notice:
      "Immersive historical experiences depend on specific venue types. The plot surfaces where that ecology is present or thin.",
  },
  {
    id: "first-date",
    experience: "First date (food & drinks)",
    perspective: "Multi-perspective plate",
    issue: "Case-study visualizations",
    src: "/media/research/differ/fig09_first_date_eight_viz.jpeg",
    caption:
      "Fig. 9. A set of eight visualizations generated using Differ for the experience of having a first date over food and drinks.",
    variables: "Experience = first date · Multiple accountable perspectives and issue functions on one plate",
    notice:
      "One experience, many visualizations: the plate shows how Differ’s linear pipeline (concept → perspective → issue → viz) produces a family of evidence rather than a single score.",
  },
];

/**
 * Selected-cases instrument — only real figures; no live compute language.
 */
export default function DifferInstrument() {
  const [caseId, setCaseId] = useState(CASES[0].id);
  const active = useMemo(() => CASES.find((c) => c.id === caseId) ?? CASES[0], [caseId]);

  const experiences = [...new Set(CASES.map((c) => c.experience))];
  const perspectivesForExp = CASES.filter((c) => c.experience === active.experience).map((c) => c.perspective);
  const issuesForPair = CASES.filter(
    (c) => c.experience === active.experience && c.perspective === active.perspective,
  ).map((c) => c.issue);

  function pickExperience(experience: string) {
    const next = CASES.find((c) => c.experience === experience) ?? CASES[0];
    setCaseId(next.id);
  }

  function pickPerspective(perspective: string) {
    const next =
      CASES.find((c) => c.experience === active.experience && c.perspective === perspective) ??
      CASES.find((c) => c.experience === active.experience) ??
      CASES[0];
    setCaseId(next.id);
  }

  function pickIssue(issue: string) {
    const next =
      CASES.find(
        (c) =>
          c.experience === active.experience &&
          c.perspective === active.perspective &&
          c.issue === issue,
      ) ?? active;
    setCaseId(next.id);
  }

  return (
    <div className="differ-instrument">
      <div className="differ-instrument__controls">
        <h3>Selected cases from the study</h3>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.45, margin: "0 0 1rem", color: "#5c5666" }}>
          Choose only combinations that have a corresponding figure. Unsupported choices stay disabled — nothing is
          computed live on this page.
        </p>

        <div className="differ-instrument__group">
          <p>1 · Experience</p>
          <div className="differ-chip-row">
            {experiences.map((exp) => (
              <button
                key={exp}
                type="button"
                className={`differ-chip${active.experience === exp ? " is-on" : ""}`}
                onClick={() => pickExperience(exp)}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        <div className="differ-instrument__group">
          <p>2 · Perspective</p>
          <div className="differ-chip-row">
            {[...new Set(perspectivesForExp)].map((p) => (
              <button
                key={p}
                type="button"
                className={`differ-chip${active.perspective === p ? " is-on" : ""}`}
                onClick={() => pickPerspective(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="differ-instrument__group">
          <p>3 · Issue</p>
          <div className="differ-chip-row">
            {[...new Set(issuesForPair)].map((issue) => (
              <button
                key={issue}
                type="button"
                className={`differ-chip${active.issue === issue ? " is-on" : ""}`}
                onClick={() => pickIssue(issue)}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>

        <div className="differ-instrument__group">
          <p>4 · Visualization</p>
          <p style={{ textTransform: "none", letterSpacing: 0, fontSize: "0.8rem", color: "#1a1520" }}>
            Real figure from the study (shown at right)
          </p>
        </div>
      </div>

      <div className="differ-instrument__stage">
        <img src={active.src} alt={active.caption} />
        <p className="differ-instrument__caption">{active.caption}</p>
        <p className="differ-instrument__note">
          <strong>Variables compared. </strong>
          {active.variables}
        </p>
        <p className="differ-instrument__note">
          <strong>What to notice. </strong>
          {active.notice}
        </p>
      </div>
    </div>
  );
}
