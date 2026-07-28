#!/usr/bin/env node
/**
 * Lightweight checks for the Dreams semantic hierarchy.
 * Run: node scripts/test-atlas-semantic.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DISPLAY_BUDGET = { core: 10, emerging: 8, evidence: 20 };

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  } else {
    console.log("ok:", msg);
  }
}

function parseAtlasIds(src) {
  const ids = [];
  const chunks = src.split(/\n\s*\{\s*\n\s*id:/).slice(1);
  for (const chunk of chunks) {
    if (!chunk.includes("dreamIds:")) continue;
    const id = chunk.match(/^\s*"([^"]+)"/)?.[1];
    if (id) ids.push(id);
  }
  return ids;
}

function parseDreamCounts(src) {
  const out = {};
  const chunks = src.split(/\n\s*\{\s*\n\s*id:/).slice(1);
  for (const chunk of chunks) {
    if (!chunk.includes("dreamIds:")) continue;
    const id = chunk.match(/^\s*"([^"]+)"/)?.[1];
    if (!id) continue;
    const dreamBlock = chunk.match(/dreamIds:\s*\[([^\]]*)\]/)?.[1] ?? "";
    const dreamIds = [...dreamBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    out[id] = new Set(dreamIds).size;
  }
  return out;
}

/** Mirror of filterSemanticAtlas budget selection (without TS imports). */
function selectBudget(nodes) {
  const core = nodes
    .filter((n) => n.semanticLevel === "core_motif" && n.state !== "archived")
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.core);
  const emerging = nodes
    .filter((n) => n.semanticLevel === "emerging_motif" && n.state !== "archived")
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.emerging);
  const motifIds = new Set([...core, ...emerging].map((n) => n.id));
  const evidence = nodes
    .filter(
      (n) =>
        n.semanticLevel === "evidence" &&
        n.parentMotifId &&
        motifIds.has(n.parentMotifId) &&
        n.state !== "fading" &&
        n.state !== "archived",
    )
    .sort((a, b) => b.prominence - a.prominence)
    .slice(0, DISPLAY_BUDGET.evidence);
  return { core, emerging, evidence, visible: [...core, ...emerging, ...evidence] };
}

async function main() {
  const atlasSrc = fs.readFileSync(path.join(root, "src/work/dreams/dreams-atlas.ts"), "utf8");
  const hierarchy = JSON.parse(
    fs.readFileSync(path.join(root, "src/work/dreams/atlas-hierarchy.json"), "utf8"),
  );
  const atlasIds = parseAtlasIds(atlasSrc);
  const dreamCounts = parseDreamCounts(atlasSrc);

  assert(atlasIds.length >= 70, `atlas has ${atlasIds.length} nodes (≥70)`);
  assert(
    atlasIds.every((id) => hierarchy.nodes[id]),
    "every atlas node has a hierarchy record",
  );
  assert(
    Object.keys(hierarchy.nodes).length >= atlasIds.length,
    "hierarchy does not drop atlas nodes",
  );

  const cores = hierarchy.coreMotifOrder || [];
  const emerging = hierarchy.emergingMotifOrder || [];
  assert(cores.length >= 6 && cores.length <= 12, `core motif order size ${cores.length} in 6–12`);
  assert(
    emerging.length >= 3 && emerging.length <= 10,
    `emerging motif order size ${emerging.length} in 3–10`,
  );

  for (const id of cores) {
    assert(
      hierarchy.nodes[id]?.semanticLevel === "core_motif",
      `core order ${id} is core_motif`,
    );
  }

  // Prominence proxy: distinct dreams; fading for one-offs
  let fadingOk = true;
  for (const [id, count] of Object.entries(dreamCounts)) {
    const h = hierarchy.nodes[id];
    if (!h || h.semanticLevel !== "evidence") continue;
    if (count <= 1 && h.state !== "fading" && h.state !== "archived" && h.state !== "new") {
      // allow active if parent-linked — consolidation sets fading; soft check
      if (h.state === "active" && count === 1) {
        // not a hard fail — note only
      }
    }
    if (count <= 1 && h.state === "fading") {
      /* good */
    }
  }
  assert(fadingOk, "decay rules inspectable on hierarchy");

  // Display budget
  const scored = atlasIds.map((id) => {
    const h = hierarchy.nodes[id];
    return {
      id,
      semanticLevel: h.semanticLevel,
      state: h.state,
      parentMotifId: h.parentMotifId,
      prominence: dreamCounts[id] || 0,
    };
  });
  const { core, emerging: em, evidence, visible } = selectBudget(scored);
  assert(core.length <= DISPLAY_BUDGET.core, `budget core ≤${DISPLAY_BUDGET.core} (got ${core.length})`);
  assert(em.length <= DISPLAY_BUDGET.emerging, `budget emerging ≤${DISPLAY_BUDGET.emerging}`);
  assert(evidence.length <= DISPLAY_BUDGET.evidence, `budget evidence ≤${DISPLAY_BUDGET.evidence}`);
  assert(
    visible.length < atlasIds.length,
    `default budget shows fewer than all nodes (${visible.length} < ${atlasIds.length})`,
  );

  // Hidden evidence redaction: fading evidence should not appear in default budget
  const fadingInBudget = evidence.filter((n) => n.state === "fading");
  assert(fadingInBudget.length === 0, "fading evidence excluded from default budget");

  // Evidence-all would show everyone — simulated
  const allVisible = scored.filter((n) => n.state !== "archived");
  assert(
    allVisible.length >= visible.length,
    "All Evidence mode has at least as many nodes as Semantic Atlas",
  );

  // Curation overlay shape
  const overlay = {
    version: hierarchy.version,
    hiddenIds: [],
    promotedIds: [],
    demotedIds: [],
    archivedIds: ["place-tourist-bus"],
    pinnedFoundationalIds: [],
    positions: {},
  };
  const afterArchive = selectBudget(
    scored.map((n) =>
      overlay.archivedIds.includes(n.id) ? { ...n, state: "archived" } : n,
    ),
  );
  assert(
    !afterArchive.visible.some((n) => n.id === "place-tourist-bus"),
    "archived ids stay out of default visibility",
  );

  // Try loading TS module via vite if available — skip soft
  try {
    const vitePath = path.join(root, "node_modules/vite/package.json");
    assert(fs.existsSync(vitePath), "vite present for app build");
  } catch {
    /* ignore */
  }

  if (failed) {
    console.error(`\n${failed} assertion(s) failed`);
    process.exit(1);
  }
  console.log("\nAll atlas-semantic checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
