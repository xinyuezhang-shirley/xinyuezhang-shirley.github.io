#!/usr/bin/env node
/**
 * Reads content/dreams/raw/*.txt + lexicon/seeds → src/content/dreams/catalog.json
 * Regenerates aggregates when new approved raw notes are added.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const rawDir = path.join(root, "content/dreams/raw");
const lexiconPath = path.join(root, "content/dreams/lexicon.json");
const seedsPath = path.join(root, "content/dreams/seeds.json");
const outPath = path.join(root, "src/content/dreams/catalog.json");

function parseRawFile(filePath) {
  const base = path.basename(filePath);
  const pkMatch = base.match(/^(\d+)_/);
  const id = pkMatch ? pkMatch[1] : base.replace(/\.txt$/i, "");
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  let title = "";
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("TITLE:")) {
      title = line.slice(6).trim();
      continue;
    }
    if (line.startsWith("FOLDER:")) continue;
    if (line.trim() === "") {
      bodyStart = i + 1;
      break;
    }
  }
  let body = lines.slice(bodyStart).join("\n").trim();
  // Strip Apple Notes / recording attachment garbage.
  body = body
    .replace(/com\.apple\.[\w.-]+/gi, " ")
    .replace(/\$[A-Z0-9-]{10,}/g, " ")
    .replace(/\[\.?h2[^\]]*\]?/gi, " ")
    .replace(/\\[A-Za-z]!?\w*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { id, sourceFile: base, rawTitle: title, body };
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ");
}

function termMatches(hay, term) {
  const t = normalize(term).trim();
  if (!t) return false;
  if (t.includes(" ")) return hay.includes(t);
  // Word-boundary match for single tokens (avoids "key" in "mickey").
  const re = new RegExp(`(?:^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:[^a-z0-9]|$)`);
  return re.test(hay);
}

function matchLexicon(body, entries) {
  const hay = normalize(body);
  const hits = [];
  for (const entry of entries) {
    const matched = entry.terms.some((term) => termMatches(hay, term));
    if (matched) hits.push({ id: entry.id, label: entry.label });
  }
  return hits;
}

function buildIndex(dreams, field) {
  const map = new Map();
  for (const dream of dreams) {
    for (const item of dream[field]) {
      if (!map.has(item.id)) {
        map.set(item.id, { id: item.id, label: item.label, count: 0, dreamIds: [] });
      }
      const row = map.get(item.id);
      row.count += 1;
      if (!row.dreamIds.includes(dream.id)) row.dreamIds.push(dream.id);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function relatedDreams(dream, all) {
  const score = new Map();
  const mine = new Set([
    ...dream.symbols.map((s) => `s:${s.id}`),
    ...dream.places.map((p) => `p:${p.id}`),
    ...dream.people.map((p) => `r:${p.id}`),
    ...dream.emotions.map((e) => `e:${e.id}`),
  ]);
  for (const other of all) {
    if (other.id === dream.id) continue;
    let shared = 0;
    const sharedLabels = [];
    for (const s of other.symbols) {
      if (mine.has(`s:${s.id}`)) {
        shared += 2;
        sharedLabels.push(s.label);
      }
    }
    for (const p of other.places) {
      if (mine.has(`p:${p.id}`)) {
        shared += 2;
        sharedLabels.push(p.label);
      }
    }
    for (const p of other.people) {
      if (mine.has(`r:${p.id}`)) {
        shared += 1;
        sharedLabels.push(p.label);
      }
    }
    for (const e of other.emotions) {
      if (mine.has(`e:${e.id}`)) {
        shared += 1;
        sharedLabels.push(e.label);
      }
    }
    if (shared > 0) score.set(other.id, { id: other.id, score: shared, shared: [...new Set(sharedLabels)] });
  }
  return [...score.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function main() {
  const lexicon = JSON.parse(fs.readFileSync(lexiconPath, "utf8"));
  const seeds = JSON.parse(fs.readFileSync(seedsPath, "utf8"));
  const files = fs
    .readdirSync(rawDir)
    .filter((f) => f.endsWith(".txt"))
    .sort((a, b) => {
      const pa = Number(a.match(/^(\d+)/)?.[1] || 0);
      const pb = Number(b.match(/^(\d+)/)?.[1] || 0);
      return pa - pb;
    });

  if (files.length === 0) {
    console.error("No raw dream files in", rawDir);
    process.exit(1);
  }

  const parsed = files.map((f) => parseRawFile(path.join(rawDir, f)));

  const dreams = parsed.map((entry, index) => {
    const seed = seeds.dreams[entry.id] || {};
    const symbols = matchLexicon(entry.body, lexicon.symbols);
    const places = matchLexicon(entry.body, lexicon.places);
    const people = matchLexicon(entry.body, lexicon.people);
    const emotions = matchLexicon(entry.body, lexicon.emotions);

    const title =
      seed.title ||
      entry.rawTitle.replace(/…$/, "").replace(/\s+/g, " ").trim().slice(0, 48) ||
      `Dream ${entry.id}`;

    const excerpt =
      seed.excerpt ||
      entry.body
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 140)
        .replace(/\s+\S*$/, "") + "…";

    const interpretation =
      seed.interpretation ||
      `Motifs observed: ${[...symbols, ...places]
        .slice(0, 4)
        .map((x) => x.label)
        .join(", ") || "sparse imagery"}. Interpretation pending review.`;

    return {
      id: entry.id,
      sourceFile: entry.sourceFile,
      ordinal: index + 1,
      dateLabel: `Entry ${String(index + 1).padStart(2, "0")}`,
      title,
      atmosphere: seed.atmosphere || "unspecified",
      symbols,
      places,
      people,
      emotions,
      excerpt,
      interpretation,
      previewSymbols: symbols.slice(0, 2).map((s) => s.label),
      related: [],
    };
  });

  for (const dream of dreams) {
    dream.related = relatedDreams(dream, dreams).map((r) => ({
      id: r.id,
      title: dreams.find((d) => d.id === r.id)?.title || r.id,
      shared: r.shared.slice(0, 3),
    }));
  }

  const symbolIndex = buildIndex(dreams, "symbols");
  const peopleIndex = buildIndex(dreams, "people");
  const placesIndex = buildIndex(dreams, "places");
  const emotionIndex = buildIndex(dreams, "emotions");

  const connections = [];
  for (const dream of dreams) {
    for (const rel of dream.related) {
      const key = [dream.id, rel.id].sort().join("::");
      if (connections.some((c) => c.key === key)) continue;
      connections.push({
        key,
        a: dream.id,
        b: rel.id,
        aTitle: dream.title,
        bTitle: rel.title,
        shared: rel.shared,
      });
    }
  }

  const patterns = (seeds.patterns || []).filter((p) =>
    p.evidence.every((id) => dreams.some((d) => d.id === id)),
  );

  const trajectories = (seeds.trajectories || []).filter((t) =>
    t.dreamIds.every((id) => dreams.some((d) => d.id === id)),
  );

  // Never ship raw note filenames (they can contain private names) or full bodies.
  const publicDreams = dreams.map(({ sourceFile: _sourceFile, ...rest }) => rest);

  const catalog = {
    generatedAt: new Date().toISOString(),
    opening: seeds.opening,
    dreamCount: publicDreams.length,
    dreams: publicDreams,
    symbolIndex,
    peopleIndex,
    placesIndex,
    emotionIndex,
    patterns,
    trajectories,
    connections,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + "\n");
  console.log(`Wrote ${publicDreams.length} dreams → ${path.relative(root, outPath)}`);
}

main();
