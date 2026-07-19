import { useMemo } from "react";
import {
  PulseSemanticForce,
  buildSemanticGraphFromPoem,
  type SemanticNode,
} from "./PulseSemanticForce";
import { InterpretationStack } from "./InterpretationStack";
import { buildStructuralReading } from "../lib/literaryInterpretation";
import { museLabSpecimen } from "../specimen";

/**
 * Live Pulse + structural reading from MuseLab's own graph builder and
 * literaryInterpretation — evidence geometry, then the argument.
 */
export function PulseReadingFigure() {
  const { poem, parsed, title } = museLabSpecimen;

  const reading = useMemo(() => {
    const base = buildSemanticGraphFromPoem(poem, parsed);
    return buildStructuralReading(
      poem,
      parsed,
      base.nodes as SemanticNode[],
      base.links,
    );
  }, [poem, parsed]);

  return (
    <figure className="muselab-figure muselab-figure--pulse">
      <p className="muselab-plate-label">Figure · Pulse as evidence</p>
      <p className="muselab-specimen-meta">
        Specimen · <em>{title}</em> · co-presence graph from manuscript lemmas
      </p>

      <div className="muselab-pulse-stage">
        <PulseSemanticForce poemText={poem} parsed={parsed} />
      </div>

      {reading ? (
        <div className="muselab-reading">
          <p className="muselab-reading-kicker">Structural reading · dominant field</p>
          <h3 className="muselab-reading-title">{reading.dominant.title}</h3>
          <InterpretationStack layers={reading.dominant.layers} />
          {reading.absences.length > 0 ? (
            <div className="muselab-absences">
              <p className="muselab-reading-kicker">Missing vocabulary</p>
              <ul>
                {reading.absences.slice(0, 3).map((a) => (
                  <li key={a.id}>
                    <span className="muselab-absence-obs">{a.observation}</span>
                    <span className="muselab-absence-claim">{a.claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <figcaption className="muselab-caption">
        The graph is evidence. What follows is an argument about what the field implies —
        MuseLab&apos;s Pulse philosophy, running on the same builders as the product.
      </figcaption>
    </figure>
  );
}
