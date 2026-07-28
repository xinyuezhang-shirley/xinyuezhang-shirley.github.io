#!/usr/bin/env node
/**
 * Generate a bcrypt hash for OWNER_PASSWORD_HASH.
 * Usage:
 *   node scripts/hash-owner-password.mjs
 *   OWNER_PASSPHRASE='your long passphrase' node scripts/hash-owner-password.mjs
 *
 * Then:
 *   cd workers/portfolio-view-counter
 *   echo -n '$2a$...' | npx wrangler secret put OWNER_PASSWORD_HASH
 *
 * Never commit the plaintext passphrase or paste it into the repo.
 */

import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROUNDS = 12;

async function main() {
  let passphrase = process.env.OWNER_PASSPHRASE || "";
  if (!passphrase) {
    const rl = createInterface({ input, output });
    passphrase = await rl.question("Owner passphrase (not echoed to git): ");
    rl.close();
  }
  passphrase = passphrase.trim();
  if (passphrase.length < 12) {
    console.error("Use at least 12 characters (preferably a long passphrase).");
    process.exit(1);
  }
  const hash = await bcrypt.hash(passphrase, ROUNDS);
  console.log("\nSet this secret (hash only):\n");
  console.log(hash);
  console.log("\nwrangler secret put OWNER_PASSWORD_HASH");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
