/** Persona observation candidates + versioned profiles. */

import { newId } from "../lib/crypto";

export type PersonaObservationRow = {
  id: string;
  user_id: string;
  observation: string;
  category: string | null;
  confidence: number;
  evidence_message_ids: string | null;
  status: "candidate" | "approved" | "rejected" | "archived";
  created_at: number;
  reviewed_at: number | null;
};

export type PersonaVersionRow = {
  id: string;
  user_id: string;
  version_number: number;
  profile_json: string;
  change_summary: string | null;
  source_observation_ids: string | null;
  created_at: number;
  activated_at: number | null;
};

export async function createPersonaObservation(
  db: D1Database,
  userId: string,
  args: {
    observation: string;
    category?: string | null;
    confidence?: number;
    evidenceMessageIds?: string[];
  },
): Promise<PersonaObservationRow> {
  const now = Date.now();
  const id = newId("pobs");
  const evidence = args.evidenceMessageIds
    ? JSON.stringify(args.evidenceMessageIds.slice(0, 20))
    : null;
  const observation = args.observation.trim().slice(0, 1000);
  const confidence = Math.min(1, Math.max(0, args.confidence ?? 0.5));

  await db
    .prepare(
      `INSERT INTO persona_observations
       (id, user_id, observation, category, confidence, evidence_message_ids, status, created_at, reviewed_at)
       VALUES (?, ?, ?, ?, ?, ?, 'candidate', ?, NULL)`,
    )
    .bind(
      id,
      userId,
      observation,
      args.category?.slice(0, 64) ?? null,
      confidence,
      evidence,
      now,
    )
    .run();

  return {
    id,
    user_id: userId,
    observation,
    category: args.category?.slice(0, 64) ?? null,
    confidence,
    evidence_message_ids: evidence,
    status: "candidate",
    created_at: now,
    reviewed_at: null,
  };
}

export async function listPersonaObservations(
  db: D1Database,
  userId: string,
  opts?: { status?: string; limit?: number },
): Promise<PersonaObservationRow[]> {
  const limit = Math.min(Math.max(opts?.limit ?? 50, 1), 100);
  if (opts?.status) {
    return (
      (
        await db
          .prepare(
            `SELECT id, user_id, observation, category, confidence, evidence_message_ids, status, created_at, reviewed_at
             FROM persona_observations WHERE user_id = ? AND status = ?
             ORDER BY created_at DESC LIMIT ?`,
          )
          .bind(userId, opts.status, limit)
          .all<PersonaObservationRow>()
      ).results ?? []
    );
  }
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, observation, category, confidence, evidence_message_ids, status, created_at, reviewed_at
           FROM persona_observations WHERE user_id = ?
           ORDER BY created_at DESC LIMIT ?`,
        )
        .bind(userId, limit)
        .all<PersonaObservationRow>()
    ).results ?? []
  );
}

export async function updatePersonaObservation(
  db: D1Database,
  userId: string,
  id: string,
  patch: {
    status?: "candidate" | "approved" | "rejected" | "archived";
    observation?: string;
  },
): Promise<PersonaObservationRow | null> {
  const existing = await db
    .prepare(
      `SELECT id, user_id, observation, category, confidence, evidence_message_ids, status, created_at, reviewed_at
       FROM persona_observations WHERE id = ? AND user_id = ? LIMIT 1`,
    )
    .bind(id, userId)
    .first<PersonaObservationRow>();
  if (!existing) return null;

  const now = Date.now();
  const status = patch.status ?? existing.status;
  const observation =
    patch.observation !== undefined
      ? patch.observation.trim().slice(0, 1000)
      : existing.observation;
  const reviewedAt = patch.status ? now : existing.reviewed_at;

  await db
    .prepare(
      `UPDATE persona_observations SET observation = ?, status = ?, reviewed_at = ?
       WHERE id = ? AND user_id = ?`,
    )
    .bind(observation, status, reviewedAt, id, userId)
    .run();

  return {
    ...existing,
    observation,
    status,
    reviewed_at: reviewedAt,
  };
}

export async function getActivePersonaProfile(
  db: D1Database,
  userId: string,
): Promise<Record<string, unknown> | null> {
  const row = await db
    .prepare(
      `SELECT profile_json FROM persona_versions
       WHERE user_id = ? AND activated_at IS NOT NULL
       ORDER BY activated_at DESC LIMIT 1`,
    )
    .bind(userId)
    .first<{ profile_json: string }>();
  if (!row) return null;
  try {
    return JSON.parse(row.profile_json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function listPersonaVersions(
  db: D1Database,
  userId: string,
): Promise<PersonaVersionRow[]> {
  return (
    (
      await db
        .prepare(
          `SELECT id, user_id, version_number, profile_json, change_summary,
                  source_observation_ids, created_at, activated_at
           FROM persona_versions WHERE user_id = ?
           ORDER BY version_number DESC LIMIT 50`,
        )
        .bind(userId)
        .all<PersonaVersionRow>()
    ).results ?? []
  );
}

export async function createPersonaVersion(
  db: D1Database,
  userId: string,
  args: {
    profile: Record<string, unknown>;
    changeSummary?: string;
    sourceObservationIds?: string[];
    activate?: boolean;
  },
): Promise<PersonaVersionRow> {
  const latest = await db
    .prepare(
      "SELECT MAX(version_number) as max_v FROM persona_versions WHERE user_id = ?",
    )
    .bind(userId)
    .first<{ max_v: number | null }>();
  const versionNumber = (latest?.max_v ?? 0) + 1;
  const now = Date.now();
  const id = newId("pver");
  const profileJson = JSON.stringify(args.profile).slice(0, 50_000);
  const source = args.sourceObservationIds
    ? JSON.stringify(args.sourceObservationIds.slice(0, 50))
    : null;

  if (args.activate) {
    await db
      .prepare(
        "UPDATE persona_versions SET activated_at = NULL WHERE user_id = ? AND activated_at IS NOT NULL",
      )
      .bind(userId)
      .run();
  }

  await db
    .prepare(
      `INSERT INTO persona_versions
       (id, user_id, version_number, profile_json, change_summary, source_observation_ids, created_at, activated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      userId,
      versionNumber,
      profileJson,
      args.changeSummary?.slice(0, 500) ?? null,
      source,
      now,
      args.activate ? now : null,
    )
    .run();

  return {
    id,
    user_id: userId,
    version_number: versionNumber,
    profile_json: profileJson,
    change_summary: args.changeSummary?.slice(0, 500) ?? null,
    source_observation_ids: source,
    created_at: now,
    activated_at: args.activate ? now : null,
  };
}

export async function activatePersonaVersion(
  db: D1Database,
  userId: string,
  versionId: string,
): Promise<boolean> {
  const row = await db
    .prepare("SELECT id FROM persona_versions WHERE id = ? AND user_id = ? LIMIT 1")
    .bind(versionId, userId)
    .first<{ id: string }>();
  if (!row) return false;
  const now = Date.now();
  await db
    .prepare(
      "UPDATE persona_versions SET activated_at = NULL WHERE user_id = ? AND activated_at IS NOT NULL",
    )
    .bind(userId)
    .run();
  await db
    .prepare("UPDATE persona_versions SET activated_at = ? WHERE id = ? AND user_id = ?")
    .bind(now, versionId, userId)
    .run();
  return true;
}

export async function clearPersonaLearning(
  db: D1Database,
  userId: string,
): Promise<void> {
  await db
    .prepare("DELETE FROM persona_observations WHERE user_id = ?")
    .bind(userId)
    .run();
  await db.prepare("DELETE FROM persona_versions WHERE user_id = ?").bind(userId).run();
}

/**
 * Heuristic candidate extraction — no LLM. Bounded, conservative.
 * Skips auth-like strings, code fences, and short one-offs.
 */
export function extractCandidateObservations(
  messages: Array<{ id?: string; role: string; content: string }>,
): Array<{
  observation: string;
  category: string;
  confidence: number;
  evidenceMessageIds: string[];
}> {
  const out: Array<{
    observation: string;
    category: string;
    confidence: number;
    evidenceMessageIds: string[];
  }> = [];

  const correctionPatterns: Array<{ re: RegExp; observation: string; category: string }> = [
    {
      re: /\bi don'?t talk like that\b/i,
      observation: "Avoid phrasing Shirley marks as unlike her voice.",
      category: "voice_correction",
    },
    {
      re: /\btoo formal\b/i,
      observation: "Prefer less formal wording in imitation.",
      category: "formality",
    },
    {
      re: /\bempathy first\b/i,
      observation: "Validate emotion before advice when someone is upset.",
      category: "empathy_pattern",
    },
    {
      re: /\bdon'?t interview\b/i,
      observation: "Do not interview; avoid a question after every message.",
      category: "question_cadence",
    },
  ];

  for (const m of messages) {
    if (m.role !== "user") continue;
    const text = m.content.trim();
    if (text.length < 8 || text.length > 500) continue;
    if (/^\/owner\b/i.test(text)) continue;
    if (/```/.test(text)) continue;
    if (/^\s*[{[]/.test(text)) continue;

    for (const p of correctionPatterns) {
      if (p.re.test(text)) {
        out.push({
          observation: p.observation,
          category: p.category,
          confidence: 0.85,
          evidenceMessageIds: m.id ? [m.id] : [],
        });
      }
    }
  }

  return out.slice(0, 3);
}
