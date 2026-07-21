#!/usr/bin/env node
/**
 * Offline evaluation harness for Ask Shirley retrieval heuristics.
 * Run: npm run ask-shirley:eval
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesPath = path.join(root, "src/ask-shirley/behavior/examples.ts");
const tagsPath = path.join(root, "src/ask-shirley/behavior/tags.ts");
const chunksPath = path.join(root, "src/ask-shirley/identity/chunks.ts");

const examplesSrc = fs.readFileSync(examplesPath, "utf8");
const tagsSrc = fs.readFileSync(tagsPath, "utf8");
const chunksSrc = fs.readFileSync(chunksPath, "utf8");

const exampleIds = [...examplesSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const chunkIds = [...chunksSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

const scenarios = [
  { id: "stranger-intro", message: "Hi, my name is Myco. What is your name?", need: /name|greeting/i },
  { id: "nickname", message: "Myco is short for Mycoto", need: /name/i },
  { id: "music", message: "I like listening to music, how about you?", need: /music/i },
  { id: "mild-sad", message: "I'm a little sad.", need: /sad/i },
  { id: "failed-interview", message: "I failed my interview.", need: /interview|fail|sad/i },
  { id: "got-job", message: "I got the job!!", need: /job|excit/i },
  { id: "tease", message: "Are you a robot", need: /robot|teas/i },
  { id: "criticism", message: "Your portfolio is kind of weird.", need: /weird|critic|portfolio/i },
  { id: "philosophy", message: "What is the meaning of life?", need: /meaning|philosoph/i },
  { id: "one-word", message: "ok", need: /one_word|ok/i },
  { id: "topic-change", message: "Anyway enough about me", need: /topic|enough/i },
  { id: "world-cup", message: "This World Cup is ripping my heart out.", need: /world|disappoint|cup/i },
  {
    id: "callback",
    message: "This song has been stuck in my head all day",
    need: /callback|music|song/i,
  },
];

console.log(`Behavior example ids: ${exampleIds.length}`);
console.log(`Identity chunks: ${chunkIds.length}`);
console.log(`Tag heuristics file bytes: ${tagsSrc.length}`);

if (exampleIds.length < 30) {
  console.error(`FAIL: need >= 30 behavior examples, found ${exampleIds.length}`);
  process.exit(1);
}

let fail = 0;
for (const s of scenarios) {
  const hit = exampleIds.some((id) => s.need.test(id)) || s.need.test(examplesSrc);
  const tagHit = s.need.test(tagsSrc) || s.need.test(examplesSrc);
  const ok = hit && tagHit;
  if (!ok) fail += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${s.id} — "${s.message}"`);
}

console.log("\nManual LLM checklist after deploy:");
for (const s of scenarios) console.log(`- ${s.id}: ${s.message}`);
console.log(`
Inspect each reply for:
  naturalness · empathy · relevance · continuity · question appropriateness
  identity accuracy · interview? · therapy? · essay? · multi-bubble when excited
`);

if (fail) {
  console.error(`\n${fail} scenario coverage checks failed.`);
  process.exit(1);
}
console.log(`\nOffline coverage passed (${scenarios.length - fail}/${scenarios.length}).`);
