import { useEffect, useRef } from "react";
import { analyzeTextLocally, SAMPLE_PASSAGE } from "../lib/textProcessing.js";
import { buildLocalNetworkArt, destroyNetwork, renderNetwork } from "../lib/network.js";

/**
 * Live Echo Network (Constellation) — same local analysis + D3 force path
 * as the studio when the API is offline.
 */
export function NetworkFigure() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const analysis = analyzeTextLocally(SAMPLE_PASSAGE, 0.65);
    const data = buildLocalNetworkArt(analysis, {
      density: 0.65,
      motion: 0.45,
      intensity: 0.5,
    });

    const handle = renderNetwork(host, data, {
      density: 0.65,
      motion: 0.45,
      intensity: 0.5,
      paused: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    return () => {
      handle?.destroy?.();
      destroyNetwork(host);
    };
  }, []);

  return (
    <figure className="echo-figure">
      <p className="echo-plate-label">Figure · Constellation</p>
      <p className="echo-specimen-meta">
        Specimen · <em>Romantic Death</em> · co-occurrence network from local analysis
      </p>
      <div className="echo-network-stage studio-canvas-wrap">
        <div ref={hostRef} className="echo-network-host" aria-label="Echo network visualization" />
      </div>
      <figcaption className="echo-caption">
        One pipeline, five afterlives. Constellation maps relationships between recurring words —
        the field with gravity. Drag a node; the rest keep breathing.
      </figcaption>
    </figure>
  );
}
