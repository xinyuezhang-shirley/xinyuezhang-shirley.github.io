import { useEffect, useState } from "react";

/** Four computational abstractions from Differ — stepped reveal, not a screenshot. */
const NODES = [
  {
    id: "01",
    title: "Concept expression",
    note: "A machine-interpretable definition of the experience — what “thrifting” or “first date” means as structure, not as a slogan.",
  },
  {
    id: "02",
    title: "Accountable perspective",
    note: "Who and where: geography, demographics, setting. The same experience is scored from more than one vantage.",
  },
  {
    id: "03",
    title: "Issue of concern",
    note: "Prevalence, fit, popularity, safety, affordability — functions that ask where meaning might break.",
  },
  {
    id: "04",
    title: "Visualization",
    note: "Bars, maps, alternatives — evidence for a designer before shipping, not a vanity dashboard.",
  },
] as const;

export function AbstractionStack() {
  const [active, setActive] = useState(0);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % NODES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <figure className="differ-figure">
      <p className="differ-plate-label">Figure · Computational abstractions</p>
      <div className="differ-stack" role="list">
        {NODES.map((node, i) => (
          <button
            key={node.id}
            type="button"
            role="listitem"
            className={`differ-stack-node${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
            style={{
              width: "100%",
              textAlign: "left",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "inherit",
              font: "inherit",
            }}
          >
            <span className="differ-stack-id">{node.id}</span>
            <div>
              <p className="differ-stack-title">{node.title}</p>
              <p className="differ-stack-note">{node.note}</p>
            </div>
          </button>
        ))}
      </div>
      <figcaption className="differ-caption">
        Drawn from Differ&apos;s own pipeline: data → experience → perspective → issue → analysis.
        The branching mark is the same idea — one stem, many outcomes.
      </figcaption>
    </figure>
  );
}
