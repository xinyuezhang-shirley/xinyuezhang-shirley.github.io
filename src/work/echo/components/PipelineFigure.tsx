const STEPS = [
  { id: "01", title: "Tokenize", note: "Strip stopwords, count frequency" },
  { id: "02", title: "Link", note: "Co-occurrence · proximity edges" },
  { id: "03", title: "Enrich", note: "Optional Datamuse echoes" },
  { id: "04", title: "Field", note: "Particles for every mode" },
  { id: "05", title: "Afterlife", note: "Network · Soup · ASCII · Vortex · Orbit" },
] as const;

export function PipelineFigure() {
  return (
    <figure className="echo-figure">
      <p className="echo-plate-label">Figure · Computational model</p>
      <div className="echo-pipeline">
        <ol className="echo-pipeline-list">
          {STEPS.map((step) => (
            <li key={step.id} className="echo-pipeline-step">
              <span className="echo-pipeline-id">{step.id}</span>
              <div>
                <p className="echo-pipeline-title">{step.title}</p>
                <p className="echo-pipeline-note">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="echo-caption">
        One analysis spine. Five renderers. The meaning is not in the chat — it is in how the
        language keeps moving.
      </figcaption>
    </figure>
  );
}
