/** Hybrid workshop pipeline — drawn from MuseLab's actual phase model. */

const PHASES = [
  { id: "0", title: "Deterministic", note: "Poetic features, draft metrics" },
  { id: "1", title: "Depth", note: "fast · standard · deep" },
  { id: "2", title: "Hybrid sensors", note: "Emotion model + literary retrieval" },
  { id: "3", title: "Specialists", note: "Critic · emotion · metaphor · development" },
  { id: "4", title: "Synthesis", note: "Reconcile, do not average" },
] as const;

export function PipelineFigure() {
  return (
    <figure className="muselab-figure">
      <p className="muselab-plate-label">Figure · Computational model</p>
      <div className="muselab-pipeline">
        <ol className="muselab-pipeline-list">
          {PHASES.map((phase) => (
            <li key={phase.id} className="muselab-pipeline-step">
              <span className="muselab-pipeline-id">{phase.id}</span>
              <div>
                <p className="muselab-pipeline-title">{phase.title}</p>
                <p className="muselab-pipeline-note">{phase.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="muselab-pipeline-out">
          → Dossier · Draft · Pulse · Margins · Paths · References · Revision · Imprint
        </p>
      </div>
      <figcaption className="muselab-caption">
        Classifiers are sensors. Agents may disagree with logits. The dossier is the product —
        not a chat transcript.
      </figcaption>
    </figure>
  );
}
