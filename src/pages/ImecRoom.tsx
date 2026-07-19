import { useState } from "react";
import { Link } from "react-router-dom";
import { researchProjects } from "@/content/research";
import "@/work/imec/imec-world.css";

const project = researchProjects.find((p) => p.slug === "imec-drones")!;

type DiagramId = "quad" | "sprawl" | "tracking" | "workflow";

function QuadcopterDiagram() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-labelledby="imec-quad-title imec-quad-desc">
      <title id="imec-quad-title">Convertible quadcopter concept</title>
      <desc id="imec-quad-desc">
        Top-down schematic of a convertible quadcopter with four rotors, central body, and labeled
        sprawl hinges.
      </desc>
      <rect width="640" height="280" fill="#E2DDEC" />
      {/* arms */}
      <line x1="160" y1="80" x2="480" y2="200" stroke="#4E2A84" strokeWidth="8" />
      <line x1="480" y1="80" x2="160" y2="200" stroke="#4E2A84" strokeWidth="8" />
      {/* body */}
      <rect x="270" y="110" width="100" height="60" rx="8" fill="#270742" />
      <text x="320" y="145" textAnchor="middle" fill="#E2DDEC" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">
        body
      </text>
      {/* rotors */}
      {[
        { cx: 160, cy: 80, label: "R1" },
        { cx: 480, cy: 80, label: "R2" },
        { cx: 160, cy: 200, label: "R3" },
        { cx: 480, cy: 200, label: "R4" },
      ].map((r) => (
        <g key={r.label}>
          <circle cx={r.cx} cy={r.cy} r="28" fill="#765D9F" stroke="#270742" strokeWidth="2" />
          <circle cx={r.cx} cy={r.cy} r="6" fill="#270742" />
          <text
            x={r.cx}
            y={r.cy + 48}
            textAnchor="middle"
            fill="#270742"
            fontSize="11"
            fontFamily="IBM Plex Mono, monospace"
          >
            {r.label}
          </text>
        </g>
      ))}
      {/* hinge labels */}
      <text x="320" y="30" textAnchor="middle" fill="#4E2A84" fontSize="13" fontFamily="IBM Plex Sans, sans-serif">
        Convertible airframe · four rotors · central avionics
      </text>
      <text x="320" y="255" textAnchor="middle" fill="#5c5666" fontSize="11" fontFamily="IBM Plex Mono, monospace">
        Schematic only — not a photograph
      </text>
    </svg>
  );
}

function SprawlingDiagram() {
  return (
    <svg viewBox="0 0 640 280" role="img" aria-labelledby="imec-sprawl-title imec-sprawl-desc">
      <title id="imec-sprawl-title">Sprawling mechanism concept</title>
      <desc id="imec-sprawl-desc">
        Side-by-side compact and sprawled arm configurations showing hinge rotation.
      </desc>
      <rect width="640" height="280" fill="#E2DDEC" />
      {/* compact */}
      <text x="160" y="36" textAnchor="middle" fill="#270742" fontSize="13" fontFamily="IBM Plex Sans, sans-serif">
        Compact stance
      </text>
      <circle cx="160" cy="140" r="18" fill="#270742" />
      <line x1="160" y1="140" x2="100" y2="90" stroke="#4E2A84" strokeWidth="6" />
      <line x1="160" y1="140" x2="220" y2="90" stroke="#4E2A84" strokeWidth="6" />
      <line x1="160" y1="140" x2="100" y2="190" stroke="#4E2A84" strokeWidth="6" />
      <line x1="160" y1="140" x2="220" y2="190" stroke="#4E2A84" strokeWidth="6" />
      {[
        [100, 90],
        [220, 90],
        [100, 190],
        [220, 190],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="14" fill="#765D9F" stroke="#270742" strokeWidth="1.5" />
      ))}
      {/* arrow */}
      <path d="M280 140 H360" stroke="#4E2A84" strokeWidth="2" markerEnd="url(#imec-arrow)" />
      <defs>
        <marker id="imec-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4E2A84" />
        </marker>
      </defs>
      <text x="320" y="125" textAnchor="middle" fill="#765D9F" fontSize="11" fontFamily="IBM Plex Mono, monospace">
        sprawl
      </text>
      {/* sprawled */}
      <text x="480" y="36" textAnchor="middle" fill="#270742" fontSize="13" fontFamily="IBM Plex Sans, sans-serif">
        Sprawled stance
      </text>
      <circle cx="480" cy="140" r="18" fill="#270742" />
      <line x1="480" y1="140" x2="380" y2="70" stroke="#4E2A84" strokeWidth="6" />
      <line x1="480" y1="140" x2="580" y2="70" stroke="#4E2A84" strokeWidth="6" />
      <line x1="480" y1="140" x2="380" y2="210" stroke="#4E2A84" strokeWidth="6" />
      <line x1="480" y1="140" x2="580" y2="210" stroke="#4E2A84" strokeWidth="6" />
      {[
        [380, 70],
        [580, 70],
        [380, 210],
        [580, 210],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="14" fill="#765D9F" stroke="#270742" strokeWidth="1.5" />
      ))}
      <text x="320" y="255" textAnchor="middle" fill="#5c5666" fontSize="11" fontFamily="IBM Plex Mono, monospace">
        Hinge-driven arm extension for convertible configurations
      </text>
    </svg>
  );
}

function TrackingDiagram() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="imec-track-title imec-track-desc">
      <title id="imec-track-title">Multi-camera tracking architecture</title>
      <desc id="imec-track-desc">
        Three modified cameras feeding a sync and reconstruction pipeline that outputs a trajectory.
      </desc>
      <rect width="640" height="300" fill="#E2DDEC" />
      {[
        { x: 70, label: "Camera A" },
        { x: 250, label: "Camera B" },
        { x: 430, label: "Camera C" },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x} y="40" width="120" height="56" rx="4" fill="#4E2A84" />
          <text
            x={c.x + 60}
            y="73"
            textAnchor="middle"
            fill="#E2DDEC"
            fontSize="12"
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {c.label}
          </text>
          <line x1={c.x + 60} y1="96" x2="320" y2="150" stroke="#765D9F" strokeWidth="2" />
        </g>
      ))}
      <rect x="200" y="150" width="240" height="50" rx="4" fill="#270742" />
      <text x="320" y="180" textAnchor="middle" fill="#E2DDEC" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">
        Sync · open-source reconstruction
      </text>
      <line x1="320" y1="200" x2="320" y2="230" stroke="#765D9F" strokeWidth="2" />
      <rect x="210" y="230" width="220" height="40" rx="4" fill="#765D9F" />
      <text x="320" y="255" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">
        Trajectory output
      </text>
    </svg>
  );
}

function WorkflowDiagram() {
  return (
    <svg viewBox="0 0 640 200" role="img" aria-labelledby="imec-flow-title imec-flow-desc">
      <title id="imec-flow-title">Experiment workflow</title>
      <desc id="imec-flow-desc">
        Four-stage workflow from airframe design through flight test, capture, and evaluation.
      </desc>
      <rect width="640" height="200" fill="#E2DDEC" />
      {[
        { x: 24, label: "1 · Design", sub: "Convertible frame" },
        { x: 176, label: "2 · Assemble", sub: "Sprawl + avionics" },
        { x: 328, label: "3 · Capture", sub: "Multi-camera track" },
        { x: 480, label: "4 · Evaluate", sub: "Trajectory metrics" },
      ].map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="60" width="136" height="80" rx="4" fill="#fff" stroke="#4E2A84" strokeWidth="1.5" />
          <text
            x={s.x + 68}
            y="95"
            textAnchor="middle"
            fill="#270742"
            fontSize="12"
            fontFamily="IBM Plex Sans, sans-serif"
            fontWeight="600"
          >
            {s.label}
          </text>
          <text
            x={s.x + 68}
            y="118"
            textAnchor="middle"
            fill="#765D9F"
            fontSize="11"
            fontFamily="IBM Plex Mono, monospace"
          >
            {s.sub}
          </text>
          {i < 3 && (
            <path
              d={`M${s.x + 140} 100 H${s.x + 148}`}
              stroke="#4E2A84"
              strokeWidth="2"
              markerEnd="url(#imec-flow-arrow)"
            />
          )}
        </g>
      ))}
      <defs>
        <marker id="imec-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4E2A84" />
        </marker>
      </defs>
    </svg>
  );
}

const DIAGRAMS: {
  id: DiagramId;
  label: string;
  caption: string;
  node: JSX.Element;
}[] = [
  {
    id: "quad",
    label: "Convertible quadcopter",
    caption:
      "Labeled concept schematic of the convertible quadcopter airframe used in IMEC Lab prototyping.",
    node: <QuadcopterDiagram />,
  },
  {
    id: "sprawl",
    label: "Sprawling mechanism",
    caption:
      "Compact vs sprawled arm configurations — hinge-driven extension for convertible flight modes.",
    node: <SprawlingDiagram />,
  },
  {
    id: "tracking",
    label: "Multi-camera tracking",
    caption:
      "Modified cameras and open-source libraries feed a sync/reconstruction pipeline that captures trajectories.",
    node: <TrackingDiagram />,
  },
  {
    id: "workflow",
    label: "Experiment workflow",
    caption: "Design → assemble → capture → evaluate. Hands-on loop across airframe and tracking work.",
    node: <WorkflowDiagram />,
  },
];

export default function ImecRoom() {
  const [diagram, setDiagram] = useState<DiagramId>("quad");
  const current = DIAGRAMS.find((d) => d.id === diagram) ?? DIAGRAMS[0];

  return (
    <article className="imec-world">
      <div className="imec-world__inner">
        <Link to="/research" className="imec-world__back">
          ← Research
        </Link>

        <p className="imec-world__eyebrow">
          Undergraduate Research Assistant Program · IMEC Lab · Northwestern University
        </p>
        <h1 className="imec-world__title">{project.title}</h1>
        <p className="imec-world__meta">
          Xinyue (Shirley) Zhang · Dec 2023 – Jun 2024
          <br />
          IMEC Lab · Northwestern University
        </p>

        <p className="imec-world__lede">{project.abstract}</p>

        <section className="imec-chapter">
          <h2>Concept</h2>
          <p>
            The lab work centered on autonomous convertible quadcopter drones with sprawling
            capabilities — airframes that can change stance — and on the sensing side needed to
            evaluate them: a multi-camera motion-tracking system built from modified cameras and
            open-source libraries.
          </p>
        </section>

        <section className="imec-chapter">
          <h2>System diagrams</h2>
          <p>
            No flight photographs are published here yet. Use the labeled schematics below — every
            control has visible text — and the placeholder slots for future assets.
          </p>

          <div className="imec-tabs" role="tablist" aria-label="Select system diagram">
            {DIAGRAMS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                className={`imec-tab${diagram === d.id ? " is-on" : ""}`}
                aria-selected={diagram === d.id}
                onClick={() => setDiagram(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="imec-world__wide">
        <figure className="imec-diagram">
          <p className="imec-diagram__label">{current.label}</p>
          {current.node}
          <figcaption>{current.caption}</figcaption>
        </figure>
      </div>

      <div className="imec-world__inner">
        <section className="imec-chapter">
          <h2>Mechanics &amp; tracking</h2>
          <p>
            Convertible sprawling changes the geometric relationship between rotors and the body —
            relevant for stability and mode transitions. In parallel, the tracking rig captures
            trajectories during testing so design changes can be evaluated quantitatively rather than
            by eye alone.
          </p>
          <div className="imec-workflow" aria-label="Experiment workflow stages">
            <div className="imec-workflow__step">
              <strong>1 · Airframe</strong>
              <span>Convertible quadcopter with sprawl hinges</span>
            </div>
            <div className="imec-workflow__step">
              <strong>2 · Sensing</strong>
              <span>Modified multi-camera capture volume</span>
            </div>
            <div className="imec-workflow__step">
              <strong>3 · Software</strong>
              <span>Open-source sync and reconstruction</span>
            </div>
            <div className="imec-workflow__step">
              <strong>4 · Evaluation</strong>
              <span>Trajectory metrics from flight tests</span>
            </div>
          </div>
        </section>

        <section className="imec-chapter">
          <h2>Asset placeholders</h2>
          <p>
            Photographic documentation is not available for this page yet. These slots mark where
            lab photos would go when cleared for publication.
          </p>
          <div className="imec-placeholders">
            <div className="imec-placeholder">
              <strong>Placeholder</strong>
              <span>Placeholder — drone photograph (not yet available)</span>
            </div>
            <div className="imec-placeholder">
              <strong>Placeholder</strong>
              <span>Placeholder — tracking volume photograph (not yet available)</span>
            </div>
            <div className="imec-placeholder">
              <strong>Placeholder</strong>
              <span>Placeholder — sprawl mechanism close-up (not yet available)</span>
            </div>
            <div className="imec-placeholder">
              <strong>Placeholder</strong>
              <span>Placeholder — flight-test still (not yet available)</span>
            </div>
          </div>
        </section>

        <section className="imec-chapter">
          <h2>Contributions</h2>
          <ul className="imec-findings">
            {project.keyFindings.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="imec-chapter">
          <h2>Status</h2>
          <p>
            Undergraduate research assistantship at IMEC Lab (Dec 2023 – Jun 2024). Diagrams on this
            page are explanatory schematics; they are not substitute photographs of lab hardware.
          </p>
        </section>
      </div>
    </article>
  );
}
