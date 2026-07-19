import { useMemo, useState } from "react";

type Experience = "first-date" | "thrifting" | "late-night" | "without-car";
type Perspective = "age" | "neighborhood" | "budget" | "accessibility";
type Issue = "fit" | "safety" | "affordability" | "prevalence";

const EXPERIENCES: { id: Experience; label: string }[] = [
  { id: "first-date", label: "First date" },
  { id: "thrifting", label: "Thrifting" },
  { id: "late-night", label: "Late-night food" },
  { id: "without-car", label: "Travel without a car" },
];

const PERSPECTIVES: { id: Perspective; label: string }[] = [
  { id: "age", label: "Age cohort" },
  { id: "neighborhood", label: "Neighborhood" },
  { id: "budget", label: "Budget" },
  { id: "accessibility", label: "Accessibility" },
];

const ISSUES: { id: Issue; label: string }[] = [
  { id: "fit", label: "Conceptual fit" },
  { id: "safety", label: "Safety" },
  { id: "affordability", label: "Affordability" },
  { id: "prevalence", label: "Prevalence" },
];

/** Deterministic demo scores — illustrates Differ's claim, not live Chicago compute. */
function scores(exp: Experience, persp: Perspective, issue: Issue) {
  const seed = `${exp}|${persp}|${issue}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  const groups =
    persp === "neighborhood"
      ? ["Near North", "South Side", "West Loop", "Rogers Park"]
      : persp === "age"
        ? ["18–24", "25–34", "35–49", "50+"]
        : persp === "budget"
          ? ["Low", "Mid", "High", "Flexible"]
          : ["Step-free", "Transit", "Car-dependent", "Mixed"];

  return groups.map((label, i) => {
    const n = ((h >> (i * 5)) & 31) / 31;
    const base = 0.28 + n * 0.62;
    const skew =
      (exp === "late-night" && issue === "safety" && i === 1 ? -0.18 : 0) +
      (exp === "without-car" && issue === "prevalence" && i === 2 ? -0.22 : 0) +
      (exp === "first-date" && issue === "affordability" && i === 0 ? 0.12 : 0);
    return { label, value: Math.max(0.08, Math.min(0.96, base + skew)) };
  });
}

function readout(exp: Experience, persp: Perspective, issue: Issue, rows: { label: string; value: number }[]) {
  const worst = [...rows].sort((a, b) => a.value - b.value)[0];
  const best = [...rows].sort((a, b) => b.value - a.value)[0];
  return `For “${EXPERIENCES.find((e) => e.id === exp)?.label}”, ${issue} under ${persp} splits sharply: ${best?.label} holds up; ${worst?.label} is where the experience is most likely to break. Differ exists to make that split accountable before a designer ships.`;
}

/**
 * Living Differ instrument — experience × perspective × issue → evidence field.
 */
export function DifferInstrument() {
  const [exp, setExp] = useState<Experience>("first-date");
  const [persp, setPersp] = useState<Perspective>("neighborhood");
  const [issue, setIssue] = useState<Issue>("safety");
  const [mode, setMode] = useState<"bars" | "map">("bars");

  const rows = useMemo(() => scores(exp, persp, issue), [exp, persp, issue]);

  return (
    <div className="differ-instrument">
      <div className="differ-controls">
        <label htmlFor="df-exp">Experience</label>
        <select id="df-exp" value={exp} onChange={(e) => setExp(e.target.value as Experience)}>
          {EXPERIENCES.map((e) => (
            <option key={e.id} value={e.id}>
              {e.label}
            </option>
          ))}
        </select>

        <label>Accountable perspective</label>
        <div className="differ-chip-row">
          {PERSPECTIVES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`chip${persp === p.id ? " is-on" : ""}`}
              onClick={() => setPersp(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label>Issue of concern</label>
        <div className="differ-chip-row">
          {ISSUES.map((i) => (
            <button
              key={i.id}
              type="button"
              className={`chip${issue === i.id ? " is-on" : ""}`}
              onClick={() => setIssue(i.id)}
            >
              {i.label}
            </button>
          ))}
        </div>

        <label>Visualization</label>
        <div className="differ-chip-row">
          <button
            type="button"
            className={`chip${mode === "bars" ? " is-on" : ""}`}
            onClick={() => setMode("bars")}
          >
            Comparison
          </button>
          <button
            type="button"
            className={`chip${mode === "map" ? " is-on" : ""}`}
            onClick={() => setMode("map")}
          >
            Geography
          </button>
        </div>
      </div>

      <div className="differ-viz">
        <div className="differ-viz__head">
          Live field · demo instrument (illustrative scores)
        </div>
        {mode === "bars" ? (
          <div className="differ-bars">
            {rows.map((r) => (
              <div key={r.label} className="differ-bar-row">
                <span>{r.label}</span>
                <div className="differ-bar-track">
                  <div className="differ-bar-fill" style={{ width: `${r.value * 100}%` }} />
                </div>
                <span>{Math.round(r.value * 100)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="differ-map">
            <svg viewBox="0 0 400 260" role="img" aria-label="Perspective geography schematic">
              <rect width="400" height="260" fill="transparent" />
              {rows.map((r, i) => {
                const cx = 70 + (i % 2) * 180;
                const cy = 70 + Math.floor(i / 2) * 110;
                const rad = 28 + r.value * 36;
                return (
                  <g key={r.label}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rad}
                      fill={`rgba(232,160,176,${0.15 + r.value * 0.45})`}
                      stroke="#8366b3"
                      strokeWidth="1.2"
                    />
                    <text
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fill="#f4eef8"
                      fontFamily="IBM Plex Mono, monospace"
                      fontSize="10"
                    >
                      {r.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
        <p className="differ-readout">{readout(exp, persp, issue, rows)}</p>
      </div>
    </div>
  );
}
