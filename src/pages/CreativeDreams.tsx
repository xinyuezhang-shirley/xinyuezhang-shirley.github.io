import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import {
  ATLAS_VIEWS,
  CATEGORY_LABEL,
  EDGE_KIND_LABEL,
  LAYER_LABEL,
  dreamsAtlas,
  filterAtlas,
  relatedFor,
  type AtlasCategory,
  type AtlasViewId,
  type EdgeKind,
  type EnrichedAtlasNode,
} from "@/work/dreams/dreams-atlas";
import "@/work/dreams/dreams-sky.css";

type SimNode = EnrichedAtlasNode &
  d3.SimulationNodeDatum & {
    anchorX?: number;
    anchorY?: number;
  };

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  kind: EdgeKind;
  weight: number;
  note?: string;
};

const CATEGORY_SHAPE: Record<AtlasCategory, string> = {
  places: "rect",
  people: "diamond",
  animals: "circle",
  objects: "hex",
  emotions: "halo",
  actions: "triangle",
  themes: "ring",
  transformations: "double",
};

function regionAnchor(
  category: AtlasCategory,
  width: number,
  height: number,
): { x: number; y: number } {
  const region = dreamsAtlas.regions.find((r) => r.category === category);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.5 * (region?.radius ?? 0.7);
  const angle = region?.angle ?? 0;
  return {
    x: cx + Math.cos(angle) * r,
    y: cy + Math.sin(angle) * r,
  };
}

function drawShape(
  selection: d3.Selection<SVGGElement, SimNode, null, unknown>,
  d: SimNode,
  size: number,
) {
  const shape = CATEGORY_SHAPE[d.category];
  const layerClass = `layer-${d.layer}`;
  const catClass = `cat-${d.category}`;

  if (shape === "circle" || shape === "halo" || shape === "ring" || shape === "double") {
    if (shape === "halo" || shape === "double") {
      selection
        .append("circle")
        .attr("class", `node-halo ${layerClass} ${catClass}`)
        .attr("r", size + (shape === "double" ? 6 : 8));
    }
    selection
      .append("circle")
      .attr("class", `node-shape ${layerClass} ${catClass}`)
      .attr("r", size);
    if (shape === "ring") {
      selection
        .append("circle")
        .attr("class", `node-ring-inner ${layerClass}`)
        .attr("r", Math.max(4, size * 0.45));
    }
    if (shape === "double") {
      selection
        .append("circle")
        .attr("class", `node-ring-inner ${layerClass}`)
        .attr("r", Math.max(5, size * 0.55));
    }
    return;
  }

  if (shape === "rect") {
    const s = size * 1.7;
    selection
      .append("rect")
      .attr("class", `node-shape ${layerClass} ${catClass}`)
      .attr("x", -s / 2)
      .attr("y", -s / 2)
      .attr("width", s)
      .attr("height", s)
      .attr("rx", 4);
    return;
  }

  if (shape === "diamond") {
    const s = size * 1.35;
    selection
      .append("polygon")
      .attr("class", `node-shape ${layerClass} ${catClass}`)
      .attr("points", `0,${-s} ${s},0 0,${s} ${-s},0`);
    return;
  }

  if (shape === "hex") {
    const s = size * 1.15;
    const pts = d3.range(6).map((i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${Math.cos(a) * s},${Math.sin(a) * s}`;
    });
    selection
      .append("polygon")
      .attr("class", `node-shape ${layerClass} ${catClass}`)
      .attr("points", pts.join(" "));
    return;
  }

  if (shape === "triangle") {
    const s = size * 1.5;
    selection
      .append("polygon")
      .attr("class", `node-shape ${layerClass} ${catClass}`)
      .attr("points", `0,${-s} ${s * 0.95},${s * 0.75} ${-s * 0.95},${s * 0.75}`);
  }
}

export default function CreativeDreams() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<AtlasViewId>("atlas");
  const [hovered, setHovered] = useState<EnrichedAtlasNode | null>(null);
  const [pinned, setPinned] = useState<EnrichedAtlasNode | null>(null);
  const pinnedRef = useRef<EnrichedAtlasNode | null>(null);
  pinnedRef.current = pinned;

  const { nodes: viewNodes, edges: viewEdges } = useMemo(() => filterAtlas(view), [view]);
  const active = pinned ?? hovered;

  const related = useMemo(() => {
    if (!active) return [];
    return relatedFor(active.id, viewEdges, viewNodes).slice(0, 8);
  }, [active, viewEdges, viewNodes]);

  const viewMeta = ATLAS_VIEWS.find((v) => v.id === view)!;

  useEffect(() => {
    const svgEl = svgRef.current;
    const panel = panelRef.current;
    if (!svgEl || !panel) return;

    let width = panel.clientWidth;
    let height = panel.clientHeight;

    const nodes: SimNode[] = viewNodes.map((n) => {
      const anchor = regionAnchor(n.category, width, height);
      const jitter = () => (Math.random() - 0.5) * 36;
      return {
        ...n,
        x: anchor.x + jitter(),
        y: anchor.y + jitter(),
        anchorX: anchor.x,
        anchorY: anchor.y,
      };
    });

    const links: SimLink[] = viewEdges.map((e) => ({
      source: e.source,
      target: e.target,
      kind: e.kind,
      weight: e.weight,
      note: e.note,
    }));

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrow-causal")
      .attr("viewBox", "0 -4 8 8")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-3.5L8,0L0,3.5")
      .attr("fill", "rgba(255,255,255,0.55)");

    const g = svg.append("g");

    // Region washes + labels
    const regionLayer = g.append("g").attr("class", "region-layer");
    for (const region of dreamsAtlas.regions) {
      const show =
        view === "atlas" ||
        viewNodes.some((n) => n.category === region.category);
      if (!show) continue;
      const a = regionAnchor(region.category, width, height);
      regionLayer
        .append("circle")
        .attr("class", `region-wash cat-${region.category}`)
        .attr("cx", a.x)
        .attr("cy", a.y)
        .attr("r", Math.min(width, height) * 0.14);
      regionLayer
        .append("text")
        .attr("class", "region-label")
        .attr("x", a.x)
        .attr("y", a.y - Math.min(width, height) * 0.145)
        .text(region.label);
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((d) => {
            const kind = (d as SimLink).kind;
            if (kind === "causal") return 90;
            if (kind === "symbolic") return 110;
            if (kind === "emotional") return 100;
            return 120;
          })
          .strength((d) => 0.04 + (d as SimLink).weight * 0.025),
      )
      .force("charge", d3.forceManyBody().strength(-140))
      .force(
        "collision",
        d3.forceCollide<SimNode>().radius((d) => 18 + Math.min(d.count, 8) * 2.2),
      )
      .force(
        "x",
        d3
          .forceX<SimNode>((d) => d.anchorX ?? width / 2)
          .strength(0.18),
      )
      .force(
        "y",
        d3
          .forceY<SimNode>((d) => d.anchorY ?? height / 2)
          .strength(0.18),
      );

    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", (d) => `link link-${d.kind}`)
      .attr("stroke-width", (d) => 0.7 + d.weight * 0.35)
      .attr("marker-end", (d) => (d.kind === "causal" ? "url(#arrow-causal)" : null));

    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodes)
      .join("g")
      .attr("class", (d) => `node-group cat-${d.category} layer-${d.layer}`)
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr(
        "aria-label",
        (d) =>
          `${CATEGORY_LABEL[d.category]} ${d.label}, ${LAYER_LABEL[d.layer]}, appears in ${d.count} dreams`,
      )
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.15).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    node.each(function (d) {
      const size = 9 + Math.min(d.count, 8) * 2.4;
      drawShape(d3.select(this), d, size);
    });

    node
      .append("text")
      .attr("class", "node-label")
      .attr("y", (d) => 16 + Math.min(d.count, 6) * 1.5)
      .attr("font-size", (d) => `${13 + Math.min(d.count, 6) * 1.8}px`)
      .text((d) => d.label);

    function ticked() {
      link
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
    }

    simulation.on("tick", ticked);

    function highlight(activeNode: SimNode) {
      const connected = new Set<string>([activeNode.id]);
      links.forEach((l) => {
        const s = typeof l.source === "object" ? (l.source as SimNode).id : String(l.source);
        const t = typeof l.target === "object" ? (l.target as SimNode).id : String(l.target);
        if (s === activeNode.id) connected.add(t);
        if (t === activeNode.id) connected.add(s);
      });

      node
        .classed("is-dimmed", (d) => !connected.has(d.id))
        .classed("is-active", (d) => d.id === activeNode.id);

      link
        .classed("is-dimmed", (d) => {
          const s = typeof d.source === "object" ? (d.source as SimNode).id : String(d.source);
          const t = typeof d.target === "object" ? (d.target as SimNode).id : String(d.target);
          return s !== activeNode.id && t !== activeNode.id;
        })
        .classed("is-active", (d) => {
          const s = typeof d.source === "object" ? (d.source as SimNode).id : String(d.source);
          const t = typeof d.target === "object" ? (d.target as SimNode).id : String(d.target);
          return s === activeNode.id || t === activeNode.id;
        });
    }

    function clearHighlight() {
      node.classed("is-dimmed", false).classed("is-active", false);
      link.classed("is-dimmed", false).classed("is-active", false);
    }

    node
      .on("mouseenter", (_, d) => {
        setHovered(d);
        highlight(d);
      })
      .on("focus", (_, d) => {
        setHovered(d);
        highlight(d);
      })
      .on("mouseleave", () => {
        setHovered(null);
        const pin = pinnedRef.current;
        if (pin) {
          const still = nodes.find((n) => n.id === pin.id);
          if (still) highlight(still);
          else clearHighlight();
        } else {
          clearHighlight();
        }
      })
      .on("blur", () => {
        setHovered(null);
        if (!pinnedRef.current) clearHighlight();
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        setPinned((prev) => {
          const next = prev?.id === d.id ? null : d;
          pinnedRef.current = next;
          return next;
        });
        highlight(d);
      });

    const onBg = () => {
      pinnedRef.current = null;
      setPinned(null);
      clearHighlight();
    };
    svg.on("click", onBg);

    const onResize = () => {
      width = panel.clientWidth;
      height = panel.clientHeight;
      svg.attr("viewBox", `0 0 ${width} ${height}`);
      nodes.forEach((n) => {
        const a = regionAnchor(n.category, width, height);
        n.anchorX = a.x;
        n.anchorY = a.y;
      });
      simulation
        .force(
          "x",
          d3.forceX<SimNode>((d) => d.anchorX ?? width / 2).strength(0.18),
        )
        .force(
          "y",
          d3.forceY<SimNode>((d) => d.anchorY ?? height / 2).strength(0.18),
        )
        .alpha(0.45)
        .restart();
    };

    window.addEventListener("resize", onResize);

    // Mild settle then cool
    simulation.alpha(0.85).restart();

    return () => {
      window.removeEventListener("resize", onResize);
      simulation.stop();
      svg.on("click", null);
      svg.selectAll("*").remove();
    };
  }, [view, viewNodes, viewEdges]);

  const categoryCounts = dreamsAtlas.countsByCategory;

  return (
    <article className="dream-page">
      <Link to="/creative" className="dream-back">
        ← creative foyer
      </Link>

      <header className="dream-header">
        <h1>Dreams</h1>
        <p>{dreamsAtlas.subtitle}</p>
        <p className="dream-meta">
          {dreamsAtlas.dreamCount} nights · ontology · meaning ascent · sky glass
        </p>
      </header>

      <nav className="dream-views" aria-label="Atlas views">
        {ATLAS_VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`dream-view-btn${view === v.id ? " is-active" : ""}`}
            onClick={() => {
              setPinned(null);
              setHovered(null);
              setView(v.id);
            }}
          >
            {v.label}
          </button>
        ))}
      </nav>
      <p className="dream-view-hint">{viewMeta.hint}</p>

      <section className="dream-layout">
        <section
          className="graph-panel"
          aria-label="Semantic dream atlas"
          ref={panelRef}
        >
          <svg
            id="dreamGraph"
            ref={svgRef}
            role="img"
            aria-label="Semantic atlas of dream symbols, themes, and emotions"
          />
        </section>

        <aside className="dream-info" aria-live="polite">
          <p className="info-kicker">
            {active
              ? `${CATEGORY_LABEL[active.category]} · ${LAYER_LABEL[active.layer]}`
              : "selected symbol"}
          </p>
          <h2 className="info-title">{active ? active.label : "hover a word"}</h2>

          {active ? (
            <>
              <p className="info-count">
                Appears in {active.count} dream{active.count === 1 ? "" : "s"}
                {pinned?.id === active.id ? " · pinned" : ""}.
              </p>

              {active.ascent.length > 1 ? (
                <p className="info-ascent">
                  <span className="info-ascent-label">meaning ascent</span>
                  {active.ascent.join(" → ")}
                </p>
              ) : null}

              <p className="info-analysis">{active.analysis}</p>

              <div className="info-block">
                <h3>related</h3>
                {related.length ? (
                  <ul className="info-related">
                    {related.map((r) => (
                      <li key={`${r.node.id}-${r.kind}`}>
                        <span className="rel-label">{r.node.label}</span>
                        <span className="rel-kind">{EDGE_KIND_LABEL[r.kind]}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="info-connections">No related concepts in this view.</p>
                )}
              </div>

              <div className="info-block">
                <h3>example dreams</h3>
                <ul className="info-dreams">
                  {active.excerpts.map((ex) => (
                    <li key={`${ex.dreamId}-${ex.text.slice(0, 24)}`}>
                      {ex.dateLabel}: {ex.text}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="info-count">Hover to inspect · click to pin.</p>
              <p className="info-connections">
                Edges carry kinds: co-occurrence, emotional weather, narrative cause,
                symbolic ascent.
              </p>
              <div className="info-secondary">
                <h3>neighborhoods</h3>
                <ul>
                  {(Object.keys(categoryCounts) as AtlasCategory[]).map((c) => (
                    <li key={c}>
                      {c} — {categoryCounts[c]}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </aside>
      </section>
    </article>
  );
}
