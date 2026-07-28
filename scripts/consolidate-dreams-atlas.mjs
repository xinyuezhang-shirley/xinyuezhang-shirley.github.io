#!/usr/bin/env node
/**
 * Offline consolidation for the Dreams semantic hierarchy.
 *
 * - Never deletes raw atlasNodes in dreams-atlas.ts
 * - High-confidence: apply alias / parent / fragment attaches to atlas-hierarchy.json
 * - Medium/low: write content/dreams/consolidation-candidates.json for review
 *
 * Usage: node scripts/consolidate-dreams-atlas.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

const ATLAS_TS = path.join(root, "src/work/dreams/dreams-atlas.ts");
const HIERARCHY = path.join(root, "src/work/dreams/atlas-hierarchy.json");
const ARCHIVE = path.join(root, "content/dreams/archive/dreams-full.json");
const CANDIDATES = path.join(root, "content/dreams/consolidation-candidates.json");

const ALIAS_CLUSTERS = [
  {
    canonical: "obj-camera",
    aliases: ["photograph", "photographs", "photographing", "camera", "photo", "picture"],
    category: "objects",
  },
  {
    canonical: "obj-homework",
    aliases: ["homework", "homeworks", "assignment"],
    category: "objects",
  },
  {
    canonical: "place-classroom",
    aliases: ["classroom", "classrooms", "class"],
    category: "places",
  },
];

function parseAtlasNodes(src) {
  const nodes = [];
  const chunks = src.split(/\n\s*\{\s*\n\s*id:/).slice(1);
  for (const chunk of chunks) {
    if (!chunk.includes("dreamIds:")) continue;
    const id = chunk.match(/^\s*"([^"]+)"/)?.[1];
    if (!id) continue;
    const label = chunk.match(/label:\s*"([^"]*)"/)?.[1] ?? id;
    const category = chunk.match(/category:\s*"([^"]+)"/)?.[1] ?? "themes";
    const layer = chunk.match(/layer:\s*"([^"]+)"/)?.[1] ?? "literal";
    const dreamBlock = chunk.match(/dreamIds:\s*\[([^\]]*)\]/)?.[1] ?? "";
    const dreamIds = [...dreamBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    const ascentBlock = chunk.match(/ascent:\s*\[([^\]]*)\]/)?.[1] ?? "";
    const ascent = [...ascentBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    const viewsBlock = chunk.match(/views:\s*\[([^\]]*)\]/)?.[1] ?? "";
    const views = [...viewsBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    nodes.push({ id, label, category, layer, dreamIds, ascent, views });
  }
  return nodes;
}

function normalizeLabel(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function singularize(s) {
  if (s.endsWith("ies") && s.length > 4) return s.slice(0, -3) + "y";
  if (s.endsWith("sses")) return s.slice(0, -2);
  if (s.endsWith("s") && !s.endsWith("ss") && s.length > 3) return s.slice(0, -1);
  return s;
}

function nightKey(dream, dreamId) {
  return dream?.dateLabel || dream?.date || dreamId;
}

function main() {
  const atlasSrc = fs.readFileSync(ATLAS_TS, "utf8");
  const nodes = parseAtlasNodes(atlasSrc);
  const hierarchy = JSON.parse(fs.readFileSync(HIERARCHY, "utf8"));
  const archive = JSON.parse(fs.readFileSync(ARCHIVE, "utf8"));
  const dreams = archive.dreams || archive.entries || [];
  const dreamById = new Map(dreams.map((d) => [d.id, d]));

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const candidates = [];
  const applied = [];
  let hierarchyChanged = false;

  // Ensure every atlas node has a hierarchy record
  for (const n of nodes) {
    if (!hierarchy.nodes[n.id]) {
      hierarchy.nodes[n.id] = {
        semanticLevel: n.layer === "theme" ? "emerging_motif" : "evidence",
        state: "new",
        parentMotifId: null,
        interpretiveLabel: n.label,
        aliases: [],
        supportingFragmentIds: [],
        lineage: [],
        manualOverrides: false,
        confidence: 0.4,
      };
      hierarchyChanged = true;
      applied.push({
        type: "seed_hierarchy",
        id: n.id,
        confidence: "high",
        note: "Missing hierarchy record; seeded as evidence/emerging",
      });
    }
  }

  // Distinct dream / night recurrence
  const stats = {};
  for (const n of nodes) {
    const distinctDreams = new Set(n.dreamIds).size;
    const nights = new Set(n.dreamIds.map((id) => nightKey(dreamById.get(id), id))).size;
    stats[n.id] = { distinctDreams, nights, label: n.label, layer: n.layer, category: n.category };
  }

  // Alias clusters: propose merges when synonym labels exist as separate nodes
  const labelIndex = new Map();
  for (const n of nodes) {
    const key = singularize(normalizeLabel(n.label));
    if (!labelIndex.has(key)) labelIndex.set(key, []);
    labelIndex.get(key).push(n);
  }

  for (const cluster of ALIAS_CLUSTERS) {
    const canon = byId.get(cluster.canonical);
    if (!canon) continue;
    const hCanon = hierarchy.nodes[cluster.canonical];
    if (!hCanon || hCanon.manualOverrides) continue;

    for (const n of nodes) {
      if (n.id === cluster.canonical) continue;
      if (n.category !== cluster.category) continue;
      const norm = singularize(normalizeLabel(n.label));
      if (!cluster.aliases.some((a) => singularize(normalizeLabel(a)) === norm)) continue;

      const already = (hCanon.aliases || []).includes(n.label);
      if (!already) {
        hCanon.aliases = [...new Set([...(hCanon.aliases || []), n.label])];
        hierarchyChanged = true;
        applied.push({
          type: "alias",
          canonical: cluster.canonical,
          aliasNode: n.id,
          alias: n.label,
          confidence: "high",
        });
      }

      // Attach alias node as evidence under same parent if any, else under theme from ascent
      const hN = hierarchy.nodes[n.id];
      if (hN && !hN.manualOverrides && hN.semanticLevel === "evidence") {
        if (!hCanon.supportingFragmentIds.includes(n.id)) {
          hCanon.supportingFragmentIds.push(n.id);
          hierarchyChanged = true;
        }
        candidates.push({
          type: "merge_review",
          confidence: "medium",
          from: n.id,
          into: cluster.canonical,
          reason: `Alias cluster (${cluster.category}): "${n.label}" ≈ "${canon.label}"`,
        });
      }
    }
  }

  // Plural/singular duplicate labels
  for (const [key, group] of labelIndex) {
    if (group.length < 2) continue;
    const sorted = [...group].sort(
      (a, b) => b.dreamIds.length - a.dreamIds.length || a.id.localeCompare(b.id),
    );
    const keep = sorted[0];
    for (const other of sorted.slice(1)) {
      candidates.push({
        type: "merge_duplicate_label",
        confidence: "medium",
        from: other.id,
        into: keep.id,
        reason: `Normalized label collision: "${other.label}" / "${keep.label}" → "${key}"`,
      });
    }
  }

  // Attach orphan evidence → nearest motif via ascent terminal or co-theme parent
  const motifs = nodes.filter((n) => {
    const h = hierarchy.nodes[n.id];
    return h && h.semanticLevel !== "evidence";
  });

  for (const n of nodes) {
    const h = hierarchy.nodes[n.id];
    if (!h || h.manualOverrides) continue;
    if (h.semanticLevel !== "evidence") continue;
    if (h.parentMotifId && byId.has(h.parentMotifId)) continue;

    let parent = null;
    // ascent often ends at theme label — map last ascent token to motif
    if (n.ascent?.length) {
      const tip = n.ascent[n.ascent.length - 1];
      parent =
        motifs.find((m) => normalizeLabel(m.label) === normalizeLabel(tip)) ||
        motifs.find((m) => normalizeLabel(hierarchy.nodes[m.id]?.interpretiveLabel || "") === normalizeLabel(tip));
    }
    if (!parent) {
      // Shared dreams with a motif
      let best = null;
      let bestScore = 0;
      const set = new Set(n.dreamIds);
      for (const m of motifs) {
        let shared = 0;
        for (const id of m.dreamIds) if (set.has(id)) shared++;
        if (shared > bestScore) {
          bestScore = shared;
          best = m;
        }
      }
      if (bestScore >= 2) parent = best;
    }

    if (parent) {
      h.parentMotifId = parent.id;
      const ph = hierarchy.nodes[parent.id];
      if (ph && !ph.supportingFragmentIds.includes(n.id)) {
        ph.supportingFragmentIds.push(n.id);
      }
      hierarchyChanged = true;
      applied.push({
        type: "attach_evidence",
        evidence: n.id,
        parent: parent.id,
        confidence: "high",
      });
    } else {
      candidates.push({
        type: "unattached_evidence",
        confidence: "low",
        id: n.id,
        label: n.label,
        distinctDreams: stats[n.id].distinctDreams,
        reason: "No ascent tip or shared-dream motif (≥2) found",
      });
    }
  }

  // Promotion / demotion proposals
  for (const n of nodes) {
    const h = hierarchy.nodes[n.id];
    if (!h || h.manualOverrides) continue;
    const { distinctDreams, nights } = stats[n.id];

    if (
      h.semanticLevel === "evidence" &&
      distinctDreams >= 5 &&
      nights >= 4 &&
      (n.layer === "theme" || n.category === "themes")
    ) {
      candidates.push({
        type: "promote_to_emerging",
        confidence: "medium",
        id: n.id,
        label: n.label,
        distinctDreams,
        nights,
        reason: "High recurrence theme-like evidence",
      });
    }

    if (
      h.semanticLevel === "emerging_motif" &&
      distinctDreams >= 8 &&
      nights >= 6
    ) {
      candidates.push({
        type: "promote_to_core",
        confidence: "medium",
        id: n.id,
        label: n.label,
        distinctDreams,
        nights,
        reason: "Emerging motif with strong cross-night support",
      });
    }

    if (h.semanticLevel === "evidence" && distinctDreams <= 1) {
      if (h.state !== "fading" && h.state !== "archived") {
        h.state = "fading";
        hierarchyChanged = true;
        applied.push({
          type: "decay_fading",
          id: n.id,
          confidence: "high",
          note: "Single-dream evidence → fading",
        });
      }
    }
  }

  // Sync supportingFragmentIds from parentMotifId reverse index
  for (const n of nodes) {
    const h = hierarchy.nodes[n.id];
    if (!h?.parentMotifId) continue;
    const ph = hierarchy.nodes[h.parentMotifId];
    if (!ph) continue;
    if (!ph.supportingFragmentIds.includes(n.id)) {
      ph.supportingFragmentIds.push(n.id);
      hierarchyChanged = true;
    }
  }

  const outCandidates = {
    generatedAt: new Date().toISOString(),
    atlasNodeCount: nodes.length,
    hierarchyVersion: hierarchy.version,
    appliedCount: applied.length,
    candidateCount: candidates.length,
    note: "Medium/low candidates are review-only. High-confidence changes are written to atlas-hierarchy.json unless --dry-run.",
    applied: dryRun ? applied : applied,
    candidates,
    recurrence: Object.fromEntries(
      Object.entries(stats)
        .sort((a, b) => b[1].distinctDreams - a[1].distinctDreams)
        .slice(0, 40),
    ),
  };

  if (!dryRun) {
    fs.mkdirSync(path.dirname(CANDIDATES), { recursive: true });
    fs.writeFileSync(CANDIDATES, JSON.stringify(outCandidates, null, 2) + "\n");
    if (hierarchyChanged) {
      fs.writeFileSync(HIERARCHY, JSON.stringify(hierarchy, null, 2) + "\n");
    }
  }

  console.log(
    JSON.stringify(
      {
        dryRun,
        nodes: nodes.length,
        applied: applied.length,
        candidates: candidates.length,
        hierarchyUpdated: !dryRun && hierarchyChanged,
        candidatesPath: path.relative(root, CANDIDATES),
      },
      null,
      2,
    ),
  );
}

main();
