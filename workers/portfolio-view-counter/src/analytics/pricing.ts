/** Model pricing lookup + estimated cost. */

export type UsageTokens = {
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
};

export async function estimateCostUsd(
  db: D1Database,
  args: { provider: string; model: string; at: number; usage: UsageTokens },
): Promise<number> {
  const row = await db
    .prepare(
      `SELECT input_cost_per_million, cached_input_cost_per_million, output_cost_per_million
       FROM model_pricing
       WHERE provider = ? AND model = ?
         AND effective_from <= ?
         AND (effective_until IS NULL OR effective_until > ?)
       ORDER BY effective_from DESC LIMIT 1`,
    )
    .bind(args.provider, args.model, args.at, args.at)
    .first<{
      input_cost_per_million: number;
      cached_input_cost_per_million: number | null;
      output_cost_per_million: number;
    }>();

  if (!row) return 0;

  const cached = Math.min(args.usage.cachedTokens, args.usage.inputTokens);
  const uncachedInput = Math.max(0, args.usage.inputTokens - cached);
  const cachedRate = row.cached_input_cost_per_million ?? row.input_cost_per_million;
  const cost =
    (uncachedInput / 1_000_000) * row.input_cost_per_million +
    (cached / 1_000_000) * cachedRate +
    (args.usage.outputTokens / 1_000_000) * row.output_cost_per_million;
  return Math.round(cost * 1_000_000) / 1_000_000;
}

export function extractUsageFromOpenAI(payload: unknown): UsageTokens {
  const empty = { inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
  if (!payload || typeof payload !== "object") return empty;
  const usage = (payload as { usage?: Record<string, unknown> }).usage;
  if (!usage) return empty;

  const input =
    num(usage.input_tokens) ||
    num(usage.prompt_tokens) ||
    0;
  const output =
    num(usage.output_tokens) ||
    num(usage.completion_tokens) ||
    0;
  const cached =
    num(usage.input_tokens_details && (usage.input_tokens_details as { cached_tokens?: unknown }).cached_tokens) ||
    num(usage.cached_tokens) ||
    0;

  return { inputTokens: input, outputTokens: output, cachedTokens: cached };
}

function num(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0;
}
