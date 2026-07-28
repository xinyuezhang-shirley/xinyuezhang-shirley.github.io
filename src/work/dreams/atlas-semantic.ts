/**
 * Semantic hierarchy layer over the curated dreams atlas.
 * Preserves all raw atlasNodes; controls default visibility + prominence.
 */

import hierarchyData from "@/work/dreams/atlas-hierarchy.json";
import { dreamsData } from "@/work/dreams/dreams-data";
import {
  atlasEdges,
  atlasNodes,
  detectCommunities,
  type AtlasEdge,
  type AtlasNode,
  type AtlasViewId,
  type EdgeKind,
  type EnrichedAtlasNode,
  type ImportanceBreakdown,
  type ImportanceTier,
} from "@/work/dreams/dreams-atlas";

export type SemanticLevel = "core_motif" | "emerging_motif" | "evidence";

export type SemanticState =
  | "new"
  | "emerging"
  | "active"
  | "foundational"
  | "dormant"
  | "fading"
  | "archived";

export type RelationshipClass = "structural" | "active" | "tension" | "evidence";

export type HierarchyNodeRecord = {
  semanticLevel: SemanticLevel;
  state: SemanticState;
  parentMotifId: string | null;
  interpretiveLabel: string;
  aliases: string[];
  supportingFragmentIds: string[];
  lineage: Array<{
    previousLabel: string;
    newLabel: string;
    changeType: string;
    explanation: string;
    at: string;
  }>;
  manualOverrides: boolean;
  confidence: number;
};

export type AtlasHierarchyFile = {
  version: number;
  generatedNote: string;
  coreMotifOrder: string[];
  emergingMotifOrder: string[];
  nodes: Record<string, HierarchyNodeRecord>;
};

export const atlasHierarchy = hierarchyData as AtlasHierarchyFile;

export const USE_SEMANTIC_HIERARCHY = true;

export const DISPLAY_BUDGET = {
  core: 10,
  emerging: 8,
  evidence: 20,
  structuralEdges: 28,
  activeEdges: 8,
};

export type SemanticEdge = AtlasEdge & {
  relationshipClass: RelationshipClass;
  distinctDreamCount: number;
};

export type SemanticAtlasNode = EnrichedAtlasNode & {
  semanticLevel: SemanticLevel;
  state: SemanticState;
  parentMotifId: string | null;
  interpretiveLabel: string;
  supportingFragmentIds: string[];
  lineage: HierarchyNodeRecord["lineage"];
  confidence: number;
  distinctDreams: number;
  distinctNights: number;
  prominence: number;
  firstSeenOrdinal: number | null;
  lastSeenOrdinal: number | null;
  firstSeenLabel: string | null;
  lastSeenLabel: string | null;
};

export type CurationOverlay = {
  version: number;
  hiddenIds: string[];
  promotedIds: string[];
  demotedIds: string[];
  archivedIds: string[];
  pinnedFoundationalIds: string[];
  positions: Record<string, { fx: number; fy: number }>;
};

export const CURATION_STORAGE_KEY = "dreams-atlas:curation:v1";
export const POSITIONS_STORAGE_KEY = `dreams-atlas:positions:v${atlasHierarchy.version}`;

const dreamById = new Map(dreamsData.dreams.map((d) => [d.id, d]));

function nightKey(dreamId: string): string {
  const d = dreamById.get(dreamId);
  return d?.dateLabel || dreamId;
}

function distinctNights(dreamIds: string[]): number {
  return new Set(dreamIds.map(nightKey)).size;
}

function temporalSpan(dreamIds: string[]): {
  first: number | null;
  last: number | null;
  firstLabel: string | null;
  lastLabel: string | null;
} {
  const marks = dreamIds
    .map((id) => dreamById.get(id))
    .filter((d): d is NonNullable<typeof d> => !!d)
    .sort((a, b) => a.ordinal - b.ordinal);
  if (!marks.length) {
    return { first: null, last: null, firstLabel: null, lastLabel: null };
  }
  return {
    first: marks[0]!.ordinal,
    last: marks[marks.length - 1]!.ordinal,
    firstLabel: marks[0]!.dateLabel,
    lastLabel: marks[marks.length - 1]!.dateLabel,
  };
}

function sharedDreamCount(a: string[], b: string[]): number {
  const set = new Set(a);
  let n = 0;
  for (const id of b) if (set.has(id)) n++;
  return n;
}

export function classifyEdge(
  edge: AtlasEdge,
  byId: Map<string, AtlasNode>,
): { relationshipClass: RelationshipClass; distinctDreamCount: number } {
  const src = byId.get(edge.source);
  const tgt = byId.get(edge.target);
  const distinctDreamCount =
    src && tgt ? sharedDreamCount(src.dreamIds, tgt.dreamIds) || edge.weight : edge.weight;

  const hSrc = atlasHierarchy.nodes[edge.source];
  const hTgt = atlasHierarchy.nodes[edge.target];
  const bothMotifs =
    hSrc &&
    hTgt &&
    hSrc.semanticLevel !== "evidence" &&
    hTgt.semanticLevel !== "evidence";

  if (edge.kind === "symbolic" && bothMotifs && edge.weight >= 2) {
    return { relationshipClass: "structural", distinctDreamCount };
  }
  if (bothMotifs && (edge.kind === "causal" || edge.weight >= 3) && distinctDreamCount >= 2) {
    return { relationshipClass: "structural", distinctDreamCount };
  }
  if (bothMotifs && distinctDreamCount >= 2) {
    return { relationshipClass: "active", distinctDreamCount };
  }
  if (edge.kind === "emotional" && edge.weight >= 3 && bothMotifs) {
    return { relationshipClass: "active", distinctDreamCount };
  }
  return { relationshipClass: "evidence", distinctDreamCount };
}

export function enrichSemanticEdges(edges: AtlasEdge[] = atlasEdges): SemanticEdge[] {
  const byId = new Map(atlasNodes.map((n) => [n.id, n]));
  return edges.map((e) => {
    const { relationshipClass, distinctDreamCount } = classifyEdge(e, byId);
    return { ...e, relationshipClass, distinctDreamCount };
  });
}

function normalize(values: number[]): number[] {
  const max = Math.max(...values, 0);
  const min = Math.min(...values);
  const span = Math.max(max - min, 1e-9);
  return values.map((v) => (v - min) / span);
}

function applyDecayState(
  base: SemanticState,
  level: SemanticLevel,
  distinctDreams: number,
  lastOrdinal: number | null,
  maxOrdinal: number,
): SemanticState {
  if (base === "archived") return "archived";
  if (level === "evidence" && distinctDreams <= 1) return "fading";
  if (level === "core_motif" || level === "emerging_motif") {
    if (lastOrdinal != null && maxOrdinal - lastOrdinal > maxOrdinal * 0.55) {
      return "dormant";
    }
  }
  return base;
}

function computeProminence(args: {
  distinctDreams: number;
  distinctNights: number;
  crossCats: number;
  centrality: number;
  persist: number;
  recency: number;
  manualPin: boolean;
  level: SemanticLevel;
}): number {
  const dream = Math.log1p(args.distinctDreams);
  const night = Math.log1p(args.distinctNights);
  let raw =
    dream * 0.28 +
    night * 0.22 +
    args.crossCats * 0.1 +
    args.centrality * 0.18 +
    args.persist * 0.1 +
    args.recency * 0.08 +
    (args.manualPin ? 0.15 : 0);

  if (args.level === "core_motif") raw *= 1.35;
  else if (args.level === "emerging_motif") raw *= 1.1;
  else raw *= 0.55;

  return raw;
}

function editorialFromProminence(
  rank: number,
  n: number,
  level: SemanticLevel,
): { visual: number; tier: ImportanceTier } {
  if (level === "core_motif") {
    const t = Math.max(0, 1 - rank / Math.max(n - 1, 1));
    return { visual: 0.82 + t * 0.18, tier: "landmark" };
  }
  if (level === "emerging_motif") {
    const t = Math.max(0, 1 - rank / Math.max(n - 1, 1));
    return { visual: 0.42 + t * 0.28, tier: "medium" };
  }
  const t = Math.max(0, 1 - rank / Math.max(n - 1, 1));
  return { visual: 0.06 + Math.pow(t, 1.5) * 0.28, tier: "small" };
}

/** Build fully scored semantic nodes from curated atlas + hierarchy. */
export function buildSemanticNodes(
  overlay?: CurationOverlay | null,
): SemanticAtlasNode[] {
  const edges = enrichSemanticEdges();
  const communities = detectCommunities(atlasNodes, atlasEdges);
  const maxOrdinal = Math.max(1, ...dreamsData.dreams.map((d) => d.ordinal));

  // Lightweight centrality proxy: degree among structural/active edges
  const structuralAdj = new Map<string, number>();
  for (const n of atlasNodes) structuralAdj.set(n.id, 0);
  for (const e of edges) {
    if (e.relationshipClass === "evidence") continue;
    structuralAdj.set(e.source, (structuralAdj.get(e.source) ?? 0) + e.weight);
    structuralAdj.set(e.target, (structuralAdj.get(e.target) ?? 0) + e.weight);
  }
  const centRaw = atlasNodes.map((n) => structuralAdj.get(n.id) ?? 0);
  const nCent = normalize(centRaw);

  const pinned = new Set(overlay?.pinnedFoundationalIds ?? []);
  const hidden = new Set(overlay?.hiddenIds ?? []);
  const promoted = new Set(overlay?.promotedIds ?? []);
  const demoted = new Set(overlay?.demotedIds ?? []);
  const archived = new Set(overlay?.archivedIds ?? []);

  type Draft = {
    node: AtlasNode;
    h: HierarchyNodeRecord;
    level: SemanticLevel;
    state: SemanticState;
    distinctDreams: number;
    distinctNights: number;
    prominence: number;
    crossCats: number;
    persist: number;
    recency: number;
    span: ReturnType<typeof temporalSpan>;
    centrality: number;
    i: number;
  };

  const drafts: Draft[] = atlasNodes.map((node, i) => {
    const h = atlasHierarchy.nodes[node.id] ?? {
      semanticLevel: "evidence" as const,
      state: "active" as const,
      parentMotifId: null,
      interpretiveLabel: node.label,
      aliases: [],
      supportingFragmentIds: [],
      lineage: [],
      manualOverrides: false,
      confidence: 0.5,
    };

    let level = h.semanticLevel;
    if (promoted.has(node.id)) level = "emerging_motif";
    if (demoted.has(node.id)) level = "evidence";
    if (pinned.has(node.id)) level = "core_motif";

    let state = h.state;
    if (archived.has(node.id) || hidden.has(node.id)) state = "archived";

    const distinctDreams = new Set(node.dreamIds).size;
    const nights = distinctNights(node.dreamIds);
    const span = temporalSpan(node.dreamIds);

    const neighCats = new Set<string>();
    for (const e of edges) {
      const other =
        e.source === node.id ? e.target : e.target === node.id ? e.source : null;
      if (!other) continue;
      const on = atlasNodes.find((x) => x.id === other);
      if (on) neighCats.add(on.category);
    }

    const persist =
      span.first != null && span.last != null
        ? (span.last - span.first) / maxOrdinal
        : 0;
    const recency =
      span.last != null ? 1 - (maxOrdinal - span.last) / maxOrdinal : 0;

    state = applyDecayState(state, level, distinctDreams, span.last, maxOrdinal);

    const prominence = computeProminence({
      distinctDreams,
      distinctNights: nights,
      crossCats: Math.max(0, neighCats.size - 1) / 7,
      centrality: nCent[i] ?? 0,
      persist,
      recency,
      manualPin: pinned.has(node.id),
      level,
    });

    return {
      node,
      h,
      level,
      state,
      distinctDreams,
      distinctNights: nights,
      prominence,
      crossCats: neighCats.size,
      persist,
      recency,
      span,
      centrality: nCent[i] ?? 0,
      i,
    };
  });

  // Normalize prominence within level bands for clearer size differences
  for (const level of ["core_motif", "emerging_motif", "evidence"] as SemanticLevel[]) {
    const idxs = drafts.map((d, i) => (d.level === level ? i : -1)).filter((i) => i >= 0);
    const vals = idxs.map((i) => drafts[i]!.prominence);
    const normed = normalize(vals.length ? vals : [0]);
    idxs.forEach((di, j) => {
      drafts[di]!.prominence = 0.15 + normed[j]! * 0.85;
    });
  }

  const byLevelRank = new Map<string, number>();
  for (const level of ["core_motif", "emerging_motif", "evidence"] as SemanticLevel[]) {
    const group = drafts
      .filter((d) => d.level === level)
      .sort((a, b) => b.prominence - a.prominence || a.node.label.localeCompare(b.node.label));
    group.forEach((d, rank) => byLevelRank.set(d.node.id, rank));
  }

  return drafts.map((d) => {
    const rank = byLevelRank.get(d.node.id) ?? 0;
    const levelCount = drafts.filter((x) => x.level === d.level).length;
    const { visual, tier } = editorialFromProminence(rank, levelCount, d.level);
    const visualFinal =
      d.state === "dormant" || d.state === "fading"
        ? visual * 0.72
        : visual * 0.85 + d.prominence * 0.15;

    const metrics: ImportanceBreakdown = {
      frequency: d.distinctDreams,
      recurrence: Math.log1p(d.distinctDreams) / Math.log1p(30),
      degree: d.crossCats,
      uniqueNeighbors: d.crossCats,
      pagerank: d.centrality,
      betweenness: d.centrality,
      emotional: 0,
      persistence: d.persist,
      bridge: 0,
      communityBridge: false,
      importance: d.prominence,
    };

    const supporting =
      d.h.supportingFragmentIds.length > 0
        ? d.h.supportingFragmentIds
        : drafts
            .filter((x) => x.h.parentMotifId === d.node.id)
            .map((x) => x.node.id);

    return {
      ...d.node,
      count: d.distinctDreams,
      excerpts: d.node.dreamIds.slice(0, 3).map((id) => {
        const dream = dreamById.get(id);
        return {
          dreamId: id,
          dateLabel: dream?.dateLabel ?? "",
          title: dream?.title ?? "",
          text: dream?.excerpt ?? "",
        };
      }),
      degree: d.crossCats,
      weightedDegree: d.centrality,
      uniqueNeighbors: d.crossCats,
      score: visualFinal,
      importance: d.prominence,
      visual: visualFinal,
      tier,
      metrics,
      community: communities.get(d.node.id),
      semanticLevel: d.level,
      state: d.state,
      parentMotifId: d.h.parentMotifId,
      interpretiveLabel: d.h.interpretiveLabel || d.node.label,
      supportingFragmentIds: supporting,
      lineage: d.h.lineage ?? [],
      confidence: d.h.confidence,
      distinctDreams: d.distinctDreams,
      distinctNights: d.distinctNights,
      prominence: d.prominence,
      firstSeenOrdinal: d.span.first,
      lastSeenOrdinal: d.span.last,
      firstSeenLabel: d.span.firstLabel,
      lastSeenLabel: d.span.lastLabel,
    };
  });
}

export type SemanticFilterMode = AtlasViewId | "evidence-all";

export type SemanticGraphSlice = {
  nodes: SemanticAtlasNode[];
  edges: SemanticEdge[];
  /** Nodes hidden by budget but available for local reveal */
  reserve: SemanticAtlasNode[];
};

/**
 * Apply display budget for the default converging atlas.
 * evidence-all / symbols can show denser evidence.
 */
export function filterSemanticAtlas(
  mode: SemanticFilterMode,
  opts?: {
    overlay?: CurationOverlay | null;
    asOfOrdinal?: number | null;
    focusId?: string | null;
    hoverId?: string | null;
  },
): SemanticGraphSlice {
  const all = buildSemanticNodes(opts?.overlay);
  const edges = enrichSemanticEdges();
  const asOf = opts?.asOfOrdinal ?? null;

  let pool = all.filter((n) => n.state !== "archived");
  if (asOf != null) {
    pool = pool.filter(
      (n) => n.firstSeenOrdinal == null || n.firstSeenOrdinal <= asOf,
    );
  }

  // View membership from curated views (evidence-all = all)
  if (mode !== "evidence-all" && mode !== "atlas") {
    pool = pool.filter((n) => n.views.includes(mode));
  }

  if (mode === "evidence-all") {
    const ids = new Set(pool.map((n) => n.id));
    return {
      nodes: pool,
      edges: edges.filter((e) => ids.has(e.source) && ids.has(e.target)),
      reserve: [],
    };
  }

  if (mode === "symbols") {
    // Evidence-heavy but still capped
    const motifs = pool.filter((n) => n.semanticLevel !== "evidence");
    const evidence = pool
      .filter((n) => n.semanticLevel === "evidence")
      .sort((a, b) => b.prominence - a.prominence)
      .slice(0, 40);
    const nodes = [...motifs, ...evidence];
    const ids = new Set(nodes.map((n) => n.id));
    return {
      nodes,
      edges: edges.filter(
        (e) =>
          ids.has(e.source) &&
          ids.has(e.target) &&
          (e.kind === "cooccur" || e.kind === "symbolic"),
      ),
      reserve: pool.filter((n) => !ids.has(n.id)),
    };
  }

  // Default Semantic Atlas / emotions / narrative — converging budget
  const core = pool
    .filter((n) => n.semanticLevel === "core_motif")
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.core);

  const emerging = pool
    .filter((n) => n.semanticLevel === "emerging_motif")
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.emerging);

  const motifIds = new Set([...core, ...emerging].map((n) => n.id));

  // Strongest evidence attached to visible motifs
  const evidence = pool
    .filter(
      (n) =>
        n.semanticLevel === "evidence" &&
        n.parentMotifId &&
        motifIds.has(n.parentMotifId) &&
        n.state !== "fading",
    )
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.evidence);

  // Local reveal around focus/hover
  const focus = opts?.focusId || opts?.hoverId;
  const localExtra: SemanticAtlasNode[] = [];
  if (focus) {
    const neigh = new Set<string>();
    for (const e of edges) {
      if (e.source === focus) neigh.add(e.target);
      if (e.target === focus) neigh.add(e.source);
    }
    for (const n of pool) {
      if (neigh.has(n.id) || n.parentMotifId === focus || n.id === focus) {
        localExtra.push(n);
      }
    }
    // children evidence of focused motif
    for (const n of pool) {
      if (n.parentMotifId === focus) localExtra.push(n);
    }
  }

  const byId = new Map<string, SemanticAtlasNode>();
  for (const n of [...core, ...emerging, ...evidence, ...localExtra]) {
    byId.set(n.id, n);
  }
  let nodes = [...byId.values()];

  if (mode === "emotions") {
    nodes = nodes.filter(
      (n) =>
        n.category === "emotions" ||
        n.semanticLevel !== "evidence" ||
        n.views.includes("emotions"),
    );
  } else if (mode === "narrative") {
    nodes = nodes.filter(
      (n) =>
        n.category === "actions" ||
        n.category === "transformations" ||
        n.semanticLevel !== "evidence" ||
        n.views.includes("narrative"),
    );
  }

  const ids = new Set(nodes.map((n) => n.id));
  const structural = edges
    .filter(
      (e) =>
        ids.has(e.source) &&
        ids.has(e.target) &&
        e.relationshipClass === "structural",
    )
    .sort((a, b) => b.weight - a.weight || b.distinctDreamCount - a.distinctDreamCount)
    .slice(0, DISPLAY_BUDGET.structuralEdges);

  const active = edges
    .filter(
      (e) =>
        ids.has(e.source) &&
        ids.has(e.target) &&
        e.relationshipClass === "active",
    )
    .sort((a, b) => b.weight - a.weight)
    .slice(0, DISPLAY_BUDGET.activeEdges);

  // On focus, also show local evidence edges
  const localEdges =
    focus != null
      ? edges.filter(
          (e) =>
            (e.source === focus || e.target === focus) &&
            ids.has(e.source) &&
            ids.has(e.target),
        )
      : [];

  const edgeMap = new Map<string, SemanticEdge>();
  for (const e of [...structural, ...active, ...localEdges]) {
    edgeMap.set(`${e.source}|${e.target}|${e.kind}`, e);
  }

  return {
    nodes,
    edges: [...edgeMap.values()],
    reserve: all.filter((n) => !ids.has(n.id) && n.state !== "archived"),
  };
}

export function loadCurationOverlay(): CurationOverlay | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURATION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CurationOverlay;
  } catch {
    return null;
  }
}

export function saveCurationOverlay(overlay: CurationOverlay): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURATION_STORAGE_KEY, JSON.stringify(overlay));
}

export function emptyCurationOverlay(): CurationOverlay {
  return {
    version: atlasHierarchy.version,
    hiddenIds: [],
    promotedIds: [],
    demotedIds: [],
    archivedIds: [],
    pinnedFoundationalIds: [],
    positions: {},
  };
}

export function loadPinnedPositions(): Record<string, { fx: number; fy: number }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, { fx: number; fy: number }>;
  } catch {
    return {};
  }
}

export function savePinnedPositions(
  positions: Record<string, { fx: number; fy: number }>,
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions));
}

export function prominenceExplanation(node: SemanticAtlasNode): string {
  const parts = [
    `${node.distinctDreams} distinct dream${node.distinctDreams === 1 ? "" : "s"}`,
    `${node.distinctNights} night${node.distinctNights === 1 ? "" : "s"}`,
    `level ${node.semanticLevel.replace("_", " ")}`,
    `state ${node.state}`,
  ];
  if (node.firstSeenLabel && node.lastSeenLabel) {
    parts.push(`span ${node.firstSeenLabel} → ${node.lastSeenLabel}`);
  }
  return parts.join(" · ");
}

export { type EdgeKind, type ImportanceTier };
