import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import {
  CATEGORY_LABEL,
  EDGE_KIND_LABEL,
  conceptDossier,
  dreamsAtlas,
  explainEdge,
  type EdgeKind,
} from "@/work/dreams/dreams-atlas";
import {
  CURATION_STORAGE_KEY,
  emptyCurationOverlay,
  filterSemanticAtlas,
  loadCurationOverlay,
  loadPinnedPositions,
  prominenceExplanation,
  saveCurationOverlay,
  savePinnedPositions,
  type CurationOverlay,
  type SemanticAtlasNode,
  type SemanticEdge,
  type SemanticFilterMode,
} from "@/work/dreams/atlas-semantic";
import { dreamsData } from "@/work/dreams/dreams-data";
import "@/work/dreams/dreams-sky.css";

type SimNode = SemanticAtlasNode &
  d3.SimulationNodeDatum & {
    fontSize: number;
    halfW: number;
    halfH: number;
    r: number;
    haloR: number;
    strokeW: number;
    collide: number;
    displayLabel: string;
  };

type SimLink = d3.SimulationLinkDatum<SimNode> & {
  kind: EdgeKind;
  weight: number;
  note?: string;
  relationshipClass?: string;
};

const SEMANTIC_VIEWS: {
  id: SemanticFilterMode;
  label: string;
  hint: string;
}[] = [
  {
    id: "atlas",
    label: "Semantic Atlas",
    hint: "converging motifs — evidence on demand",
  },
  {
    id: "symbols",
    label: "Symbol Map",
    hint: "more concrete fragments, still budgeted",
  },
  {
    id: "emotions",
    label: "Emotional Landscape",
    hint: "feelings and the motifs they weather",
  },
  {
    id: "narrative",
    label: "Narrative Grammar",
    hint: "actions, transformations, story motion",
  },
  {
    id: "evidence-all",
    label: "All Evidence",
    hint: "research layer — dense complete extraction",
  },
];

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

function forceLabelCollide(gap = 8) {
  let nodes: SimNode[] = [];
  function force(alpha: number) {
    const k = alpha * 0.65;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]!;
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

function fontForVisual(visual: number, tier: SemanticAtlasNode["tier"]): number {
  if (tier === "landmark") return 22 + visual * 12;
  if (tier === "medium") return 14 + visual * 10;
  return 10.5 + visual * 8;
}

function buildSimNodes(
  viewNodes: SemanticAtlasNode[],
  width: number,
  height: number,
  positions: Record<string, { fx: number; fy: number }>,
): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const byId = new Map(viewNodes.map((n) => [n.id, n]));

  return viewNodes.map((n, i) => {
    const v = n.visual;
    const displayLabel =
      n.semanticLevel === "evidence" ? n.label : n.interpretiveLabel || n.label;
    const fontSize = fontForVisual(v, n.tier);
    const { w, h } = measureLabel(displayLabel, fontSize);
    const padX = n.tier === "landmark" ? 14 : n.tier === "medium" ? 11 : 8;
    const padY = n.tier === "landmark" ? 8 : n.tier === "medium" ? 6 : 5;
    const halfW = w / 2 + padX;
    const halfH = h / 2 + padY;
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
    const angle = (i / Math.max(viewNodes.length, 1)) * Math.PI * 2;
    const rad =
      n.semanticLevel === "core_motif"
        ? 40 + (1 - v) * 80
        : n.semanticLevel === "emerging_motif"
          ? 70 + (1 - v) * 100
          : 110 + (1 - v) * 120;

    const saved = positions[n.id];
    const parent = n.parentMotifId ? byId.get(n.parentMotifId) : null;
    const parentAngle = parent
      ? (viewNodes.findIndex((x) => x.id === parent.id) / Math.max(viewNodes.length, 1)) *
        Math.PI *
        2
      : angle;

    const x0 = saved?.fx ?? cx + Math.cos(parentAngle) * rad * (0.55 + v * 0.45);
    const y0 = saved?.fy ?? cy + Math.sin(parentAngle) * rad * (0.55 + v * 0.45);

    return {
      ...n,
      displayLabel,
      fontSize,
      halfW,
      halfH,
      r,
      haloR,
      strokeW,
      collide,
      x: x0,
      y: y0,
      fx: saved ? saved.fx : undefined,
      fy: saved ? saved.fy : undefined,
    };
  });
}

function drawNode(g: d3.Selection<SVGGElement, SimNode, null, unknown>, d: SimNode) {
  const lift = g.append("g").attr("class", "node-lift");
  const cat = d.category;

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

  const hitPad = d.tier === "landmark" ? 6 : d.tier === "medium" ? 3 : 1;
  lift
    .append("rect")
    .attr("class", "node-hit")
    .attr("x", -d.halfW - hitPad)
    .attr("y", -d.halfH - hitPad)
    .attr("width", (d.halfW + hitPad) * 2)
    .attr("height", (d.halfH + hitPad) * 2);

  // Hide most evidence labels until hover/active (CSS + class)
  const showLabel =
    d.semanticLevel !== "evidence" || d.tier !== "small";

  lift
    .append("text")
    .attr(
      "class",
      `node-label tier-${d.tier} level-${d.semanticLevel} state-${d.state}${showLabel ? "" : " is-evidence-label"}`,
    )
    .attr("font-size", `${d.fontSize}px`)
    .attr("font-weight", d.tier === "landmark" ? 600 : 500)
    .attr("dy", "0.32em")
    .attr("text-anchor", "middle")
    .text(d.displayLabel);
}

export default function CreativeDreams() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<SemanticFilterMode>("atlas");
  const [hovered, setHovered] = useState<SemanticAtlasNode | null>(null);
  const [pinned, setPinned] = useState<SemanticAtlasNode | null>(null);
  const [overlay, setOverlay] = useState<CurationOverlay>(() =>
    loadCurationOverlay() ?? emptyCurationOverlay(),
  );
  const [positions, setPositions] = useState(() => loadPinnedPositions());
  const [asOf, setAsOf] = useState<number | null>(null);
  const [tuneScores, setTuneScores] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("atlasDebug");
  });
  const pinnedRef = useRef<SemanticAtlasNode | null>(null);
  pinnedRef.current = pinned;

  const maxOrdinal = useMemo(
    () => Math.max(1, ...dreamsData.dreams.map((d) => d.ordinal)),
    [],
  );

  const slice = useMemo(
    () =>
      filterSemanticAtlas(view, {
        overlay,
        asOfOrdinal: asOf,
        // Expand neighborhood on pin only — hover highlights without rebuilding layout
        focusId: pinned?.id ?? null,
      }),
    [view, overlay, asOf, pinned?.id],
  );

  const viewNodes = slice.nodes;
  const viewEdges: SemanticEdge[] = slice.edges;
  const active = pinned ?? hovered;

  const dossier = useMemo(() => {
    if (!active) return null;
    return conceptDossier(active, viewEdges, viewNodes);
  }, [active, viewEdges, viewNodes]);

  const viewMeta = SEMANTIC_VIEWS.find((v) => v.id === view)!;

  const updateOverlay = useCallback((next: CurationOverlay) => {
    setOverlay(next);
    saveCurationOverlay(next);
  }, []);

  const exportCuration = useCallback(() => {
    const blob = new Blob(
      [JSON.stringify({ overlay, positions, exportedAt: Date.now() }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dreams-atlas-curation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [overlay, positions]);

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
      const linkLayer = g.append("g").attr("class", "links");
      const nodeLayer = g.append("g").attr("class", "nodes");

      const nodes = buildSimNodes(viewNodes, width, height, positions);
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
            relationshipClass: e.relationshipClass,
          };
        })
        .filter((l): l is SimLink => l !== null);

      const linkSel = linkLayer
        .selectAll("line")
        .data(links)
        .join("line")
        .attr(
          "class",
          (d) =>
            `link link-${d.kind} rel-${d.relationshipClass || "evidence"}`,
        )
        .attr("stroke-width", (d) => 0.55 + d.weight * 0.55)
        .attr("opacity", (d) =>
          d.relationshipClass === "structural"
            ? 0.22 + Math.min(d.weight, 4) * 0.06
            : 0.1 + Math.min(d.weight, 4) * 0.04,
        );

      const nodeSel = nodeLayer
        .selectAll<SVGGElement, SimNode>("g")
        .data(nodes, (d) => d.id)
        .join("g")
        .attr(
          "class",
          (d) =>
            `node-group cat-${d.category} layer-${d.layer} level-${d.semanticLevel} state-${d.state}`,
        )
        .attr("tabindex", 0)
        .attr("role", "button")
        .attr(
          "aria-label",
          (d) =>
            `${d.displayLabel}, ${d.semanticLevel.replace("_", " ")}, ${d.state}, ${CATEGORY_LABEL[d.category]}, ${d.distinctDreams} dreams`,
        )
        .classed("tier-landmark", (d) => d.tier === "landmark")
        .classed("tier-medium", (d) => d.tier === "medium")
        .classed("tier-small", (d) => d.tier === "small")
        .classed("is-dormant", (d) => d.state === "dormant" || d.state === "fading");

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
        for (const n of nodes) {
          if (n.parentMotifId === activeNode.id) connected.add(n.id);
          if (activeNode.parentMotifId && n.id === activeNode.parentMotifId) {
            connected.add(n.id);
          }
        }
        nodeSel
          .classed("is-dimmed", (d) => !connected.has(d.id))
          .classed("is-active", (d) => d.id === activeNode.id)
          .classed("is-neighbor", (d) => connected.has(d.id) && d.id !== activeNode.id)
          .classed("show-evidence-label", (d) => connected.has(d.id));
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
          .classed("is-neighbor", false)
          .classed("show-evidence-label", false);
        linkSel.classed("is-dimmed", false).classed("is-active", false);
      }

      if (sim) sim.stop();

      // Soft orbit: evidence pulled toward parent motif
      const parentForce = (alpha: number) => {
        for (const n of nodes) {
          if (!n.parentMotifId || n.semanticLevel !== "evidence") continue;
          const parent = nodeById.get(n.parentMotifId);
          if (!parent || parent.x == null || parent.y == null) continue;
          const k = alpha * 0.08;
          n.vx = (n.vx ?? 0) + ((parent.x ?? 0) - (n.x ?? 0)) * k;
          n.vy = (n.vy ?? 0) + ((parent.y ?? 0) - (n.y ?? 0)) * k;
        }
      };

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
            .strength((d) =>
              d.relationshipClass === "structural"
                ? 0.18 + d.weight * 0.04
                : 0.08 + d.weight * 0.03,
            ),
        )
        .force(
          "charge",
          d3
            .forceManyBody<SimNode>()
            .strength((d) =>
              d.semanticLevel === "core_motif"
                ? -90 - d.visual * 140
                : -35 - d.visual * 90,
            )
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
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.035))
        .force(
          "x",
          d3
            .forceX<SimNode>(width / 2)
            .strength((d) => (d.semanticLevel === "core_motif" ? 0.035 : 0.015)),
        )
        .force(
          "y",
          d3
            .forceY<SimNode>(height / 2)
            .strength((d) => (d.semanticLevel === "core_motif" ? 0.035 : 0.015)),
        )
        .force("parentOrbit", parentForce as d3.Force<SimNode, undefined>)
        .velocityDecay(0.58)
        .alphaDecay(0.022)
        .alphaMin(0.0008)
        .alpha(0.7);

      sim.on("tick", () => {
        for (const n of nodes) {
          n.x = Math.max(n.halfW + 8, Math.min(width - n.halfW - 8, n.x ?? 0));
          n.y = Math.max(n.halfH + 8, Math.min(height - n.halfH - 8, n.y ?? 0));
        }
        paint();
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
          d.fx = d.x;
          d.fy = d.y;
          setPositions((prev) => {
            const next = {
              ...prev,
              [d.id]: { fx: d.x ?? 0, fy: d.y ?? 0 },
            };
            savePinnedPositions(next);
            return next;
          });
        });

      nodeSel.call(drag);

      nodeSel
        .on("mouseenter", (_event, d) => {
          setHovered(d);
          highlight(d);
        })
        .on("focus", (_event, d) => {
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
          sim?.alpha(0.08).restart();
        })
        .on("dblclick", (event, d) => {
          event.stopPropagation();
          d.fx = null;
          d.fy = null;
          setPositions((prev) => {
            const next = { ...prev };
            delete next[d.id];
            savePinnedPositions(next);
            return next;
          });
          sim?.alpha(0.1).restart();
        });

      linkSel
        .on("mouseenter", (event, d) => {
          const s = d.source as SimNode;
          const t = d.target as SimNode;
          const why = explainEdge(d.kind, d.weight, d.note);
          showTip(
            `<strong>${s.displayLabel}</strong> — <strong>${t.displayLabel}</strong><br/><span>${EDGE_KIND_LABEL[d.kind]}${d.relationshipClass ? ` · ${d.relationshipClass}` : ""}</span><br/>${why}`,
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

      const pin = pinnedRef.current;
      if (pin) {
        const still = nodes.find((n) => n.id === pin.id);
        if (still) highlight(still);
      }
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
  }, [view, viewNodes, viewEdges, positions]);

  const semanticActive = active as SemanticAtlasNode | null;

  return (
    <article className="dream-page">
      <Link to="/creative" className="dream-back">
        ← creative foyer
      </Link>

      <header className="dream-header">
        <h1>Dreams</h1>
        <p>{dreamsAtlas.subtitle}</p>
        <p className="dream-meta">
          {dreamsAtlas.dreamCount} nights · converging atlas · evidence on demand
        </p>
      </header>

      <nav className="dream-views" aria-label="Atlas views">
        {SEMANTIC_VIEWS.map((v) => (
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

      <div className="dream-controls-row">
        <label className="dream-tune">
          <input
            type="checkbox"
            checked={tuneScores}
            onChange={(e) => setTuneScores(e.target.checked)}
          />
          tune scores
        </label>
        <label className="dream-asof">
          as of
          <input
            type="range"
            min={1}
            max={maxOrdinal}
            value={asOf ?? maxOrdinal}
            aria-label="Show atlas as of dream ordinal"
            onChange={(e) => {
              const v = Number(e.target.value);
              setAsOf(v >= maxOrdinal ? null : v);
            }}
          />
          <span>{asOf == null ? "now" : `night ${asOf}`}</span>
        </label>
        <button type="button" className="dream-curate-btn" onClick={exportCuration}>
          export curation
        </button>
      </div>

      <section className="dream-layout">
        <section className="graph-panel" aria-label="Semantic dream atlas" ref={panelRef}>
          <svg
            id="dreamGraph"
            ref={svgRef}
            role="img"
            aria-label="Living semantic atlas of dream motifs"
          />
          <div className="edge-tip" ref={tipRef} hidden />
        </section>

        <aside className="dream-info" aria-live="polite">
          {!dossier || !semanticActive ? (
            <>
              <p className="info-kicker">how to read</p>
              <h2 className="info-title">motifs, not every noun</h2>
              <p className="info-count">
                Drag to rearrange · click to pin · double-click to release a pinned
                position.
              </p>
              <p className="info-connections">
                Large opaque words are core motifs — durable ideas across nights.
                Medium words are emerging. Concrete fragments stay mostly hidden
                until you hover or pin a motif. All Evidence restores the dense
                research graph. Nothing is deleted from the archive.
              </p>
              <div className="info-secondary">
                <h3>legend</h3>
                <ul className="info-legend">
                  <li>
                    <span className="leg-swatch cat-themes" /> core / emerging motifs
                  </li>
                  <li>
                    <span className="leg-swatch cat-objects" /> evidence fragments
                  </li>
                  <li>
                    <span className="leg-swatch cat-emotions" /> emotions — halo
                  </li>
                  <li>faded large = dormant foundational motif</li>
                  <li>small bright = newly emerging</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <p className="info-kicker">
                {semanticActive.semanticLevel.replace(/_/g, " ")} · {semanticActive.state}
                {" · "}
                {CATEGORY_LABEL[dossier.node.category]}
                {pinned?.id === dossier.node.id ? " · pinned" : ""}
              </p>
              <h2 className="info-title">{semanticActive.interpretiveLabel}</h2>
              {semanticActive.interpretiveLabel !== semanticActive.label ? (
                <p className="info-count">also known as “{semanticActive.label}”</p>
              ) : null}
              <p className="info-count">
                {semanticActive.distinctDreams} dream
                {semanticActive.distinctDreams === 1 ? "" : "s"} ·{" "}
                {semanticActive.distinctNights} night
                {semanticActive.distinctNights === 1 ? "" : "s"}
                {semanticActive.firstSeenLabel
                  ? ` · first ${semanticActive.firstSeenLabel}`
                  : ""}
                {semanticActive.lastSeenLabel
                  ? ` · last ${semanticActive.lastSeenLabel}`
                  : ""}
              </p>
              <p className="info-connections">{prominenceExplanation(semanticActive)}</p>

              {tuneScores ? (
                <div className="info-block info-tune">
                  <h3>prominence</h3>
                  <dl className="tune-grid">
                    <div>
                      <dt>prominence</dt>
                      <dd>{semanticActive.prominence.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>visual</dt>
                      <dd>{semanticActive.visual.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>confidence</dt>
                      <dd>{semanticActive.confidence.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt>tier</dt>
                      <dd>{semanticActive.tier}</dd>
                    </div>
                  </dl>
                </div>
              ) : null}

              <div className="info-block">
                <h3>why this exists</h3>
                <p className="info-analysis">{dossier.definition}</p>
              </div>

              {semanticActive.supportingFragmentIds.length > 0 ? (
                <div className="info-block">
                  <h3>supporting fragments</h3>
                  <ul className="info-related">
                    {semanticActive.supportingFragmentIds.slice(0, 12).map((id) => {
                      const frag =
                        viewNodes.find((n) => n.id === id) ||
                        slice.reserve.find((n) => n.id === id);
                      return (
                        <li key={id}>
                          <span className="rel-label">{frag?.label ?? id}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {semanticActive.lineage.length > 0 ? (
                <div className="info-block">
                  <h3>lineage</h3>
                  <ul className="info-related">
                    {semanticActive.lineage.map((l, i) => (
                      <li key={`${l.previousLabel}-${i}`}>
                        <span className="rel-label">
                          {l.previousLabel} → {l.newLabel}
                        </span>
                        <span className="rel-why">{l.explanation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

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
                <h3>curate</h3>
                <div className="info-curate-actions">
                  <button
                    type="button"
                    onClick={() =>
                      updateOverlay({
                        ...overlay,
                        pinnedFoundationalIds: overlay.pinnedFoundationalIds.includes(
                          semanticActive.id,
                        )
                          ? overlay.pinnedFoundationalIds.filter(
                              (id) => id !== semanticActive.id,
                            )
                          : [...overlay.pinnedFoundationalIds, semanticActive.id],
                      })
                    }
                  >
                    {overlay.pinnedFoundationalIds.includes(semanticActive.id)
                      ? "unpin foundational"
                      : "pin foundational"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateOverlay({
                        ...overlay,
                        promotedIds: [...new Set([...overlay.promotedIds, semanticActive.id])],
                        demotedIds: overlay.demotedIds.filter((id) => id !== semanticActive.id),
                      })
                    }
                  >
                    promote
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateOverlay({
                        ...overlay,
                        demotedIds: [...new Set([...overlay.demotedIds, semanticActive.id])],
                        promotedIds: overlay.promotedIds.filter((id) => id !== semanticActive.id),
                        pinnedFoundationalIds: overlay.pinnedFoundationalIds.filter(
                          (id) => id !== semanticActive.id,
                        ),
                      })
                    }
                  >
                    demote to evidence
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateOverlay({
                        ...overlay,
                        archivedIds: [...new Set([...overlay.archivedIds, semanticActive.id])],
                      })
                    }
                  >
                    archive from default
                  </button>
                </div>
                <p className="info-connections">
                  Curation is stored in this browser ({CURATION_STORAGE_KEY}). Export to
                  commit changes into the hierarchy file.
                </p>
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
