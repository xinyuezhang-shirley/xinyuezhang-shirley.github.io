import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import {
  ATLAS_VIEWS,
  CATEGORY_LABEL,
  EDGE_KIND_LABEL,
  LAYER_LABEL,
  conceptDossier,
  dreamsAtlas,
  explainEdge,
  filterAtlas,
  type AtlasViewId,
  type EdgeKind,
  type EnrichedAtlasNode,
} from "@/work/dreams/dreams-atlas";
import "@/work/dreams/dreams-sky.css";

type SimNode = EnrichedAtlasNode &
  d3.SimulationNodeDatum & {
    fontSize: number;
    halfW: number;
    halfH: number;
    /** Circle radius supporting the word (not dominating it). */
    r: number;
    haloR: number;
    strokeW: number;
    /** Collision radius from text box. */
    collide: number;
  };

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  kind: EdgeKind;
  weight: number;
  note?: string;
};

const PAD_X = 10;
const PAD_Y = 6;

function measureLabel(label: string, fontSize: number): { w: number; h: number } {
  let svg = document.getElementById("dream-measure-svg") as SVGSVGElement | null;
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "dream-measure-svg";
    svg.setAttribute(
      "style",
      "position:absolute;left:-9999px;top:-9999px;width:0;height:0;overflow:hidden;",
    );
    document.body.appendChild(svg);
  }
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-family", "Cormorant Garamond, Georgia, serif");
  text.setAttribute("font-weight", "500");
  text.setAttribute("font-size", `${fontSize}px`);
  text.textContent = label;
  svg.appendChild(text);
  const bbox = text.getBBox();
  svg.removeChild(text);
  return {
    w: Math.max(bbox.width, fontSize * 0.45),
    h: Math.max(bbox.height, fontSize * 1.05),
  };
}

/** AABB label collision — typography is the mass. */
function forceLabelCollide(gap = 8) {
  let nodes: SimNode[] = [];
  function force(alpha: number) {
    const k = alpha * 0.65;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = (b.x ?? 0) - (a.x ?? 0);
        const dy = (b.y ?? 0) - (a.y ?? 0);
        const overlapX = a.halfW + b.halfW + gap - Math.abs(dx);
        const overlapY = a.halfH + b.halfH + gap - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;
        if (overlapX < overlapY) {
          const sx = ((dx === 0 ? 1 : Math.sign(dx)) * overlapX * 0.5) * k;
          a.vx = (a.vx ?? 0) - sx;
          b.vx = (b.vx ?? 0) + sx;
          a.x = (a.x ?? 0) - sx;
          b.x = (b.x ?? 0) + sx;
        } else {
          const sy = ((dy === 0 ? 1 : Math.sign(dy)) * overlapY * 0.5) * k;
          a.vy = (a.vy ?? 0) - sy;
          b.vy = (b.vy ?? 0) + sy;
          a.y = (a.y ?? 0) - sy;
          b.y = (b.y ?? 0) + sy;
        }
      }
    }
  }
  force.initialize = (init: SimNode[]) => {
    nodes = init;
  };
  return force as d3.Force<SimNode, undefined>;
}

/** Editorial type scale — mountains vs villages. Uses exaggerated `visual`. */
function fontForVisual(visual: number, tier: EnrichedAtlasNode["tier"]): number {
  if (tier === "landmark") return 22 + visual * 12; // ~32–34
  if (tier === "medium") return 14 + visual * 10; // ~18–24
  return 10.5 + visual * 8; // ~11–13.5
}

function buildSimNodes(
  viewNodes: EnrichedAtlasNode[],
  width: number,
  height: number,
): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  return viewNodes.map((n, i) => {
    const v = n.visual;
    const fontSize = fontForVisual(v, n.tier);
    const { w, h } = measureLabel(n.label, fontSize);
    const padX = n.tier === "landmark" ? 14 : n.tier === "medium" ? 11 : 8;
    const padY = n.tier === "landmark" ? 8 : n.tier === "medium" ? 6 : 5;
    const halfW = w / 2 + padX;
    const halfH = h / 2 + padY;
    // Circle wraps the word; landmarks get generous geometry
    const r =
      n.tier === "landmark"
        ? Math.max(halfH * 1.05, 16 + v * 18)
        : n.tier === "medium"
          ? Math.max(halfH * 0.95, 11 + v * 12)
          : Math.max(halfH * 0.85, 7 + v * 8);
    const haloR = r + (n.tier === "landmark" ? 10 : n.tier === "medium" ? 6 : 3);
    const strokeW =
      n.tier === "landmark" ? 1.7 + v * 0.6 : n.tier === "medium" ? 1.15 : 0.85;
    const collide = Math.hypot(halfW, halfH) * (n.tier === "landmark" ? 1.02 : 0.92);
    const angle = (i / viewNodes.length) * Math.PI * 2;
    // Landmarks start nearer the center
    const rad = 30 + (1 - v) * 140;
    return {
      ...n,
      fontSize,
      halfW,
      halfH,
      r,
      haloR,
      strokeW,
      collide,
      x: cx + Math.cos(angle) * rad * (0.55 + v * 0.45),
      y: cy + Math.sin(angle) * rad * (0.55 + v * 0.45),
    };
  });
}

function drawNode(g: d3.Selection<SVGGElement, SimNode, null, unknown>, d: SimNode) {
  const lift = g.append("g").attr("class", "node-lift");
  const cat = d.category;

  // Soft support circle (never the star) — halo scales with importance
  if (cat === "emotions" || d.tier === "landmark") {
    lift
      .append("circle")
      .attr("class", `node-halo cat-${cat} tier-${d.tier}`)
      .attr("r", d.haloR);
  }
  if (cat === "people" || cat === "transformations") {
    lift
      .append("circle")
      .attr("class", `node-ring cat-${cat} tier-${d.tier}`)
      .attr("r", d.r + (d.tier === "landmark" ? 5 : 3.5));
  }

  lift
    .append("circle")
    .attr("class", `node-shape cat-${cat} layer-${d.layer} tier-${d.tier}`)
    .attr("r", d.r)
    .attr("stroke-width", d.strokeW);

  if (cat === "actions") {
    lift
      .append("circle")
      .attr("class", "node-core")
      .attr("r", Math.max(1.4, d.r * (d.tier === "landmark" ? 0.22 : 0.16)));
  }

  // Invisible hit — larger for landmarks (easier to grab mountains)
  const hitPad = d.tier === "landmark" ? 6 : d.tier === "medium" ? 3 : 1;
  lift
    .append("rect")
    .attr("class", "node-hit")
    .attr("x", -d.halfW - hitPad)
    .attr("y", -d.halfH - hitPad)
    .attr("width", (d.halfW + hitPad) * 2)
    .attr("height", (d.halfH + hitPad) * 2);

  lift
    .append("text")
    .attr("class", `node-label tier-${d.tier}`)
    .attr("font-size", `${d.fontSize}px`)
    .attr("font-weight", d.tier === "landmark" ? 600 : 500)
    .attr("dy", "0.32em")
    .text(d.label);
}

function communityHulls(
  nodes: SimNode[],
  layer: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  layer.selectAll("*").remove();
  const by = d3.group(
    nodes.filter((n) => n.community != null && n.x != null && n.y != null),
    (n) => n.community!,
  );
  for (const [, members] of by) {
    if (members.length < 3) continue;
    const pts = members.map((n) => [n.x!, n.y!] as [number, number]);
    const hull = d3.polygonHull(pts);
    if (!hull) continue;
    // Expand hull slightly
    const cx = d3.mean(hull, (p) => p[0])!;
    const cy = d3.mean(hull, (p) => p[1])!;
    const expanded = hull.map(([x, y]) => {
      const dx = x - cx;
      const dy = y - cy;
      return [cx + dx * 1.18, cy + dy * 1.18] as [number, number];
    });
    layer
      .append("path")
      .attr("class", "community-hull")
      .attr("d", `M${expanded.join("L")}Z`);
  }
}

export default function CreativeDreams() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<AtlasViewId>("atlas");
  const [hovered, setHovered] = useState<EnrichedAtlasNode | null>(null);
  const [pinned, setPinned] = useState<EnrichedAtlasNode | null>(null);
  const [tuneScores, setTuneScores] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("atlasDebug");
  });
  const pinnedRef = useRef<EnrichedAtlasNode | null>(null);
  pinnedRef.current = pinned;

  const { nodes: viewNodes, edges: viewEdges } = useMemo(() => filterAtlas(view), [view]);
  const active = pinned ?? hovered;

  const dossier = useMemo(() => {
    if (!active) return null;
    return conceptDossier(active, viewEdges, viewNodes);
  }, [active, viewEdges, viewNodes]);

  const viewMeta = ATLAS_VIEWS.find((v) => v.id === view)!;

  useEffect(() => {
    const svgEl = svgRef.current;
    const panel = panelRef.current;
    const tip = tipRef.current;
    if (!svgEl || !panel) return;

    let cancelled = false;
    let resizeTimer = 0;
    let sim: d3.Simulation<SimNode, undefined> | null = null;

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // Recreate via remounting effect through layout tick — bump view soft reload
        void rebuild();
      }, 140);
    };
    window.addEventListener("resize", onResize);

    const rebuild = async () => {
      try {
        await document.fonts.load('500 16px "Cormorant Garamond"');
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      if (cancelled) return;

      const width = panel.clientWidth;
      const height = panel.clientHeight;

      const svg = d3.select(svgEl);
      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      const defs = svg.append("defs");
      const glow = defs
        .append("filter")
        .attr("id", "soft-glow")
        .attr("x", "-40%")
        .attr("y", "-40%")
        .attr("width", "180%")
        .attr("height", "180%");
      glow.append("feGaussianBlur").attr("stdDeviation", "1.8").attr("result", "b");
      glow
        .append("feMerge")
        .selectAll("feMergeNode")
        .data(["b", "SourceGraphic"])
        .join("feMergeNode")
        .attr("in", (d) => d);

      const g = svg.append("g").attr("class", "atlas-root");
      const hullLayer = g.append("g").attr("class", "community-layer");
      const linkLayer = g.append("g").attr("class", "links");
      const nodeLayer = g.append("g").attr("class", "nodes");

      const nodes = buildSimNodes(viewNodes, width, height);
      const nodeById = new Map(nodes.map((n) => [n.id, n]));
      const links: SimLink[] = viewEdges
        .map((e) => {
          const source = nodeById.get(e.source);
          const target = nodeById.get(e.target);
          if (!source || !target) return null;
          return {
            source,
            target,
            kind: e.kind,
            weight: e.weight,
            note: e.note,
          };
        })
        .filter((l): l is SimLink => l !== null);

      const linkSel = linkLayer
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("class", (d) => `link link-${d.kind}`)
        .attr("stroke-width", (d) => 0.55 + d.weight * 0.55)
        .attr("opacity", (d) => 0.12 + Math.min(d.weight, 4) * 0.06);

      const nodeSel = nodeLayer
        .selectAll<SVGGElement, SimNode>("g")
        .data(nodes, (d) => d.id)
        .join("g")
        .attr("class", (d) => `node-group cat-${d.category} layer-${d.layer}`)
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr(
          "aria-label",
          (d) =>
            `${d.label}, ${CATEGORY_LABEL[d.category]}, ${d.tier}, importance ${d.importance.toFixed(2)}, ${d.count} dreams`,
        )
        .classed("tier-landmark", (d) => d.tier === "landmark")
        .classed("tier-medium", (d) => d.tier === "medium")
        .classed("tier-small", (d) => d.tier === "small");

      nodeSel.each(function (d) {
        drawNode(d3.select(this), d);
      });

      function paint() {
        linkSel
          .attr("x1", (d) => (d.source as SimNode).x ?? 0)
          .attr("y1", (d) => (d.source as SimNode).y ?? 0)
          .attr("x2", (d) => (d.target as SimNode).x ?? 0)
          .attr("y2", (d) => (d.target as SimNode).y ?? 0);
        nodeSel.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
      }

      function showTip(html: string, x: number, y: number) {
        if (!tip) return;
        tip.innerHTML = html;
        tip.hidden = false;
        const rect = panel.getBoundingClientRect();
        tip.style.left = `${Math.min(x - rect.left + 12, rect.width - 220)}px`;
        tip.style.top = `${Math.min(y - rect.top + 12, rect.height - 80)}px`;
      }
      function hideTip() {
        if (!tip) return;
        tip.hidden = true;
      }

      function highlight(activeNode: SimNode) {
        const connected = new Set<string>([activeNode.id]);
        links.forEach((l) => {
          const s = (l.source as SimNode).id;
          const t = (l.target as SimNode).id;
          if (s === activeNode.id) connected.add(t);
          if (t === activeNode.id) connected.add(s);
        });
        nodeSel
          .classed("is-dimmed", (d) => !connected.has(d.id))
          .classed("is-active", (d) => d.id === activeNode.id)
          .classed("is-neighbor", (d) => connected.has(d.id) && d.id !== activeNode.id);
        linkSel
          .classed(
            "is-dimmed",
            (d) =>
              (d.source as SimNode).id !== activeNode.id &&
              (d.target as SimNode).id !== activeNode.id,
          )
          .classed(
            "is-active",
            (d) =>
              (d.source as SimNode).id === activeNode.id ||
              (d.target as SimNode).id === activeNode.id,
          );
      }

      function clearHighlight() {
        nodeSel
          .classed("is-dimmed", false)
          .classed("is-active", false)
          .classed("is-neighbor", false);
        linkSel.classed("is-dimmed", false).classed("is-active", false);
      }

      if (sim) sim.stop();
      sim = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink<SimNode, SimLink>(links)
            .id((d) => d.id)
            .distance((d) => {
              const a = d.source as SimNode;
              const b = d.target as SimNode;
              const base = 70 + (1 - Math.min(d.weight, 4) / 4) * 50;
              return base + (a.collide + b.collide) * 0.15;
            })
            .strength((d) => 0.12 + d.weight * 0.04),
        )
        .force(
          "charge",
          d3
            .forceManyBody<SimNode>()
            .strength((d) => -40 - d.visual * 110)
            .distanceMax(440),
        )
        .force(
          "collide",
          d3
            .forceCollide<SimNode>()
            .radius((d) => d.collide)
            .strength(0.7)
            .iterations(2),
        )
        .force("labels", forceLabelCollide(7))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.04))
        .force("x", d3.forceX(width / 2).strength(0.02))
        .force("y", d3.forceY(height / 2).strength(0.02))
        .velocityDecay(0.58)
        .alphaDecay(0.022)
        .alphaMin(0.0008)
        .alpha(0.7);

      let hullPainted = false;
      sim.on("tick", () => {
        // Soft wall
        for (const n of nodes) {
          n.x = Math.max(n.halfW + 8, Math.min(width - n.halfW - 8, n.x ?? 0));
          n.y = Math.max(n.halfH + 8, Math.min(height - n.halfH - 8, n.y ?? 0));
        }
        paint();
        if (!hullPainted && (sim?.alpha() ?? 1) < 0.05) {
          communityHulls(nodes, hullLayer);
          hullPainted = true;
        }
      });

      // After converge, keep nearly still — water at rest
      sim.on("end", () => {
        communityHulls(nodes, hullLayer);
        hullPainted = true;
      });

      const drag = d3
        .drag<SVGGElement, SimNode>()
        .on("start", (event, d) => {
          if (!event.active) sim?.alphaTarget(0.12).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) sim?.alphaTarget(0);
          // Keep pinned in place until double-click releases
          d.fx = d.x;
          d.fy = d.y;
        });

      nodeSel.call(drag);

      nodeSel
        .on("mouseenter", (event, d) => {
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
          hideTip();
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
          // Gentle local energy — disturb the water
          sim?.alpha(0.08).restart();
        })
        .on("dblclick", (event, d) => {
          event.stopPropagation();
          d.fx = null;
          d.fy = null;
          sim?.alpha(0.1).restart();
        });

      linkSel
        .on("mouseenter", (event, d) => {
          const s = d.source as SimNode;
          const t = d.target as SimNode;
          const why = explainEdge(d.kind, d.weight, d.note);
          showTip(
            `<strong>${s.label}</strong> — <strong>${t.label}</strong><br/><span>${EDGE_KIND_LABEL[d.kind]}</span><br/>${why}`,
            event.clientX,
            event.clientY,
          );
          d3.select(event.currentTarget).classed("is-tip", true);
        })
        .on("mouseleave", (event) => {
          hideTip();
          d3.select(event.currentTarget).classed("is-tip", false);
        });

      svg.on("click", () => {
        pinnedRef.current = null;
        setPinned(null);
        clearHighlight();
        hideTip();
      });
    };

    void rebuild();

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      sim?.stop();
      d3.select(svgEl).on("click", null);
      d3.select(svgEl).selectAll("*").remove();
      if (tip) tip.hidden = true;
    };
  }, [view, viewNodes, viewEdges]);

  return (
    <article className="dream-page">
      <Link to="/creative" className="dream-back">
        ← creative foyer
      </Link>

      <header className="dream-header">
        <h1>Dreams</h1>
        <p>{dreamsAtlas.subtitle}</p>
        <p className="dream-meta">
          {dreamsAtlas.dreamCount} nights · living atlas · typography as instrument
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
      <label className="dream-tune">
        <input
          type="checkbox"
          checked={tuneScores}
          onChange={(e) => setTuneScores(e.target.checked)}
        />
        tune scores
      </label>

      <section className="dream-layout">
        <section className="graph-panel" aria-label="Semantic dream atlas" ref={panelRef}>
          <svg
            id="dreamGraph"
            ref={svgRef}
            role="img"
            aria-label="Living semantic atlas of dream symbols"
          />
          <div className="edge-tip" ref={tipRef} hidden />
        </section>

        <aside className="dream-info" aria-live="polite">
          {!dossier ? (
            <>
              <p className="info-kicker">instrument</p>
              <h2 className="info-title">hover a word</h2>
              <p className="info-count">
                Drag to rearrange · click to pin · double-click to release.
              </p>
              <p className="info-connections">
                Larger type marks foundational motifs. Edges carry kinds — solid
                co-occurrence, dashed emotion, thin rarity. Communities emerge; they
                are not assigned.
              </p>
              <div className="info-secondary">
                <h3>legend</h3>
                <ul className="info-legend">
                  <li>
                    <span className="leg-swatch cat-people" /> people — double ring
                  </li>
                  <li>
                    <span className="leg-swatch cat-places" /> places — solid
                  </li>
                  <li>
                    <span className="leg-swatch cat-objects" /> objects — dashed
                  </li>
                  <li>
                    <span className="leg-swatch cat-emotions" /> emotions — halo
                  </li>
                  <li>
                    <span className="leg-swatch cat-themes" /> themes — light dash
                  </li>
                  <li>
                    <span className="leg-swatch cat-actions" /> actions — core
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="info-kicker">
                {CATEGORY_LABEL[dossier.node.category]} · {LAYER_LABEL[dossier.node.layer]}
                {pinned?.id === dossier.node.id ? " · pinned" : ""}
              </p>
              <h2 className="info-title">{dossier.node.label}</h2>
              <p className="info-count">
                Appears in {dossier.occurrences} dream
                {dossier.occurrences === 1 ? "" : "s"}
                {" · "}
                {dossier.node.tier}
              </p>

              {tuneScores ? (
                <div className="info-block info-tune">
                  <h3>importance tuning</h3>
                  <dl className="tune-grid">
                    <div>
                      <dt>importance</dt>
                      <dd>{dossier.node.importance.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>visual</dt>
                      <dd>{dossier.node.visual.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>frequency</dt>
                      <dd>{dossier.node.metrics.frequency}</dd>
                    </div>
                    <div>
                      <dt>pagerank</dt>
                      <dd>{dossier.node.metrics.pagerank.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>betweenness</dt>
                      <dd>{dossier.node.metrics.betweenness.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>degree</dt>
                      <dd>{dossier.node.metrics.degree.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>neighbors</dt>
                      <dd>{dossier.node.metrics.uniqueNeighbors}</dd>
                    </div>
                    <div>
                      <dt>emotional</dt>
                      <dd>{dossier.node.metrics.emotional.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>persistence</dt>
                      <dd>{dossier.node.metrics.persistence.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>bridge</dt>
                      <dd>{dossier.node.metrics.bridge.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>community bridge</dt>
                      <dd>{dossier.node.metrics.communityBridge ? "yes" : "no"}</dd>
                    </div>
                    <div>
                      <dt>tier</dt>
                      <dd>{dossier.node.tier}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}

              <div className="info-block">
                <h3>definition</h3>
                <p className="info-analysis">{dossier.definition}</p>
              </div>

              {dossier.ascent.length > 1 ? (
                <p className="info-ascent">
                  <span className="info-ascent-label">meaning ascent</span>
                  {dossier.ascent.join(" → ")}
                </p>
              ) : null}

              <div className="info-block">
                <h3>connected concepts</h3>
                {dossier.connected.length ? (
                  <ul className="info-related">
                    {dossier.connected.map((r) => (
                      <li key={`${r.node.id}-${r.kind}`}>
                        <span className="rel-label">{r.node.label}</span>
                        <span className="rel-kind">
                          {EDGE_KIND_LABEL[r.kind]} · w{r.weight}
                        </span>
                        <span className="rel-why">{r.why}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="info-connections">No edges in this view.</p>
                )}
              </div>

              <div className="info-block">
                <h3>representative excerpts</h3>
                <ul className="info-dreams">
                  {dossier.excerpts.map((ex) => (
                    <li key={`${ex.dreamId}-${ex.text.slice(0, 20)}`}>
                      {ex.dateLabel}: {ex.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-block">
                <h3>temporal pattern</h3>
                {dossier.temporal.length ? (
                  <p className="info-temporal">
                    {dossier.temporal
                      .map((t) => t.dateLabel.replace("Entry ", "E"))
                      .join(" · ")}
                  </p>
                ) : (
                  <p className="info-connections">No dated entries linked.</p>
                )}
              </div>

              <div className="info-block">
                <h3>emotional profile</h3>
                {dossier.emotionalProfile.length ? (
                  <ul className="info-emotions">
                    {dossier.emotionalProfile.map((e) => (
                      <li key={e.label}>
                        <span>{e.label}</span>
                        <span className="emo-w">{e.weight}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="info-connections">No strong emotional co-occurrence.</p>
                )}
              </div>

              <div className="info-block">
                <h3>narrative role</h3>
                <p className="info-role">{dossier.narrativeRole}</p>
                <p className="info-connections">{dossier.narrativeNote}</p>
              </div>

              <div className="info-block">
                <h3>interpretation</h3>
                <p className="info-analysis">{dossier.interpretation}</p>
              </div>
            </>
          )}
        </aside>
      </section>
    </article>
  );
}
