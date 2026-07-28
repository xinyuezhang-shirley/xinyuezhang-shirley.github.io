/**
 * Extensible tool registry with role permissions + confirmation flags.
 * Backend validates every call — LLM requests are never trusted alone.
 */

import { z } from "zod";
import type { OwnerRole } from "../lib/auth";
import * as memories from "../owner/memories";
import * as notes from "../owner/notes";
import * as conversations from "../owner/conversations";
import { searchWeb } from "./searchWeb";
import { searchPortfolioContent } from "./portfolioSearch";

export type ToolRole = OwnerRole;

export type ToolDefinition<TIn extends z.ZodTypeAny = z.ZodTypeAny> = {
  name: string;
  description: string;
  inputSchema: TIn;
  allowedRoles: ToolRole[];
  /** Future consequential actions require explicit confirmation. */
  requiresConfirmation: boolean;
  timeoutMs: number;
  privacy: "public" | "owner-private" | "system-secret";
};

export type ToolContext = {
  db: D1Database;
  role: ToolRole;
  userId: string | null;
  conversationId: string | null;
  searchApiKey?: string;
  searchProvider?: string;
  confirmed?: boolean;
};

export type ToolResult = {
  ok: boolean;
  name: string;
  data?: unknown;
  error?: string;
  durationMs: number;
};

const saveMemoryInput = z.object({
  content: z.string().min(1).max(4000),
  category: z.string().max(64).optional(),
  importance: z.number().min(0).max(1).optional(),
});

const memoryIdInput = z.object({ id: z.string().min(1).max(80) });
const searchInput = z.object({
  query: z.string().min(1).max(200),
  limit: z.number().int().min(1).max(20).optional(),
});

const createNoteInput = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(50_000),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

const updateNoteInput = z.object({
  id: z.string().min(1).max(80),
  title: z.string().max(200).optional(),
  body: z.string().max(50_000).optional(),
  appendBody: z.string().max(20_000).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

const webSearchInput = z.object({
  query: z.string().min(1).max(300),
  limit: z.number().int().min(1).max(5).optional(),
});

export const TOOL_REGISTRY = {
  search_web: {
    name: "search_web",
    description: "Search the public web for current factual information.",
    inputSchema: webSearchInput,
    allowedRoles: ["public", "owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 12_000,
    privacy: "public" as const,
  },
  search_portfolio_content: {
    name: "search_portfolio_content",
    description: "Search Shirley’s public portfolio knowledge.",
    inputSchema: searchInput,
    allowedRoles: ["public", "owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 3_000,
    privacy: "public" as const,
  },
  save_memory: {
    name: "save_memory",
    description: "Save an explicit long-term memory for the owner.",
    inputSchema: saveMemoryInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  search_memories: {
    name: "search_memories",
    description: "Search owner long-term memories.",
    inputSchema: searchInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  list_memories: {
    name: "list_memories",
    description: "List recent owner memories.",
    inputSchema: z.object({ limit: z.number().int().min(1).max(50).optional() }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  update_memory: {
    name: "update_memory",
    description: "Update an existing memory by id.",
    inputSchema: z.object({
      id: z.string().min(1).max(80),
      content: z.string().max(4000).optional(),
      category: z.string().max(64).optional(),
      importance: z.number().min(0).max(1).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  archive_memory: {
    name: "archive_memory",
    description: "Archive a memory (soft delete).",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  delete_memory: {
    name: "delete_memory",
    description: "Permanently delete a memory.",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  create_note: {
    name: "create_note",
    description: "Create an editable note document.",
    inputSchema: createNoteInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  get_note: {
    name: "get_note",
    description: "Get a note by id.",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  search_notes: {
    name: "search_notes",
    description: "Search owner notes.",
    inputSchema: searchInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  list_notes: {
    name: "list_notes",
    description: "List recent notes.",
    inputSchema: z.object({ limit: z.number().int().min(1).max(50).optional() }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  update_note: {
    name: "update_note",
    description: "Update or append to a note.",
    inputSchema: updateNoteInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  archive_note: {
    name: "archive_note",
    description: "Archive a note.",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  delete_note: {
    name: "delete_note",
    description: "Permanently delete a note.",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  search_conversations: {
    name: "search_conversations",
    description: "Search prior owner conversation summaries.",
    inputSchema: searchInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  get_conversation_summary: {
    name: "get_conversation_summary",
    description: "Get one owner conversation summary by id.",
    inputSchema: memoryIdInput,
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
} as const;

export type ToolName = keyof typeof TOOL_REGISTRY;

export function getToolCatalogForRole(role: ToolRole): Array<{
  name: string;
  description: string;
  requiresConfirmation: boolean;
}> {
  return Object.values(TOOL_REGISTRY)
    .filter((t) => (t.allowedRoles as ToolRole[]).includes(role))
    .map((t) => ({
      name: t.name,
      description: t.description,
      requiresConfirmation: t.requiresConfirmation,
    }));
}

function assertRole(tool: { allowedRoles: ToolRole[]; name: string }, role: ToolRole) {
  if (!tool.allowedRoles.includes(role)) {
    throw new Error(`tool_forbidden:${tool.name}`);
  }
}

function requireOwner(ctx: ToolContext): string {
  if (ctx.role !== "owner" || !ctx.userId) throw new Error("tool_forbidden");
  return ctx.userId;
}

const MAX_TOOL_RESULT_CHARS = 6000;

function clipResult(data: unknown): unknown {
  const raw = JSON.stringify(data);
  if (raw.length <= MAX_TOOL_RESULT_CHARS) return data;
  return { truncated: true, preview: raw.slice(0, MAX_TOOL_RESULT_CHARS) };
}

export async function executeTool(
  name: string,
  rawArgs: unknown,
  ctx: ToolContext,
): Promise<ToolResult> {
  const started = Date.now();
  const def = TOOL_REGISTRY[name as ToolName];
  if (!def) {
    return { ok: false, name, error: "unknown_tool", durationMs: Date.now() - started };
  }

  try {
    assertRole(def, ctx.role);
    if (def.requiresConfirmation && !ctx.confirmed) {
      return {
        ok: false,
        name,
        error: "confirmation_required",
        durationMs: Date.now() - started,
      };
    }

    const parsed = def.inputSchema.safeParse(rawArgs);
    if (!parsed.success) {
      return { ok: false, name, error: "invalid_args", durationMs: Date.now() - started };
    }

    const args = parsed.data as Record<string, unknown>;
    let data: unknown;

    switch (name as ToolName) {
      case "search_web": {
        data = await searchWeb({
          query: String(args.query),
          limit: typeof args.limit === "number" ? args.limit : 3,
          apiKey: ctx.searchApiKey,
          provider: ctx.searchProvider,
        });
        break;
      }
      case "search_portfolio_content": {
        data = searchPortfolioContent(String(args.query), typeof args.limit === "number" ? args.limit : 4);
        break;
      }
      case "save_memory": {
        const userId = requireOwner(ctx);
        data = await memories.createMemory(ctx.db, userId, {
          content: String(args.content),
          category: typeof args.category === "string" ? args.category : null,
          importance: typeof args.importance === "number" ? args.importance : undefined,
          sourceConversationId: ctx.conversationId,
        });
        break;
      }
      case "search_memories": {
        const userId = requireOwner(ctx);
        data = await memories.searchMemories(
          ctx.db,
          userId,
          String(args.query),
          typeof args.limit === "number" ? args.limit : 8,
        );
        break;
      }
      case "list_memories": {
        const userId = requireOwner(ctx);
        data = await memories.listMemories(ctx.db, userId, {
          limit: typeof args.limit === "number" ? args.limit : 20,
        });
        break;
      }
      case "update_memory": {
        const userId = requireOwner(ctx);
        data = await memories.updateMemory(ctx.db, userId, String(args.id), {
          content: typeof args.content === "string" ? args.content : undefined,
          category: typeof args.category === "string" ? args.category : undefined,
          importance: typeof args.importance === "number" ? args.importance : undefined,
        });
        break;
      }
      case "archive_memory": {
        const userId = requireOwner(ctx);
        data = await memories.updateMemory(ctx.db, userId, String(args.id), { archived: true });
        break;
      }
      case "delete_memory": {
        const userId = requireOwner(ctx);
        data = { deleted: await memories.deleteMemory(ctx.db, userId, String(args.id)) };
        break;
      }
      case "create_note": {
        const userId = requireOwner(ctx);
        data = await notes.createNote(ctx.db, userId, {
          title: String(args.title),
          body: String(args.body),
          tags: Array.isArray(args.tags) ? (args.tags as string[]) : null,
        });
        break;
      }
      case "get_note": {
        const userId = requireOwner(ctx);
        data = await notes.getNote(ctx.db, userId, String(args.id));
        break;
      }
      case "search_notes": {
        const userId = requireOwner(ctx);
        data = await notes.searchNotes(
          ctx.db,
          userId,
          String(args.query),
          typeof args.limit === "number" ? args.limit : 8,
        );
        break;
      }
      case "list_notes": {
        const userId = requireOwner(ctx);
        data = await notes.listNotes(ctx.db, userId, {
          limit: typeof args.limit === "number" ? args.limit : 20,
        });
        break;
      }
      case "update_note": {
        const userId = requireOwner(ctx);
        data = await notes.updateNote(ctx.db, userId, String(args.id), {
          title: typeof args.title === "string" ? args.title : undefined,
          body: typeof args.body === "string" ? args.body : undefined,
          appendBody: typeof args.appendBody === "string" ? args.appendBody : undefined,
          tags: Array.isArray(args.tags) ? (args.tags as string[]) : undefined,
        });
        break;
      }
      case "archive_note": {
        const userId = requireOwner(ctx);
        data = await notes.updateNote(ctx.db, userId, String(args.id), { archived: true });
        break;
      }
      case "delete_note": {
        const userId = requireOwner(ctx);
        data = { deleted: await notes.deleteNote(ctx.db, userId, String(args.id)) };
        break;
      }
      case "search_conversations": {
        const userId = requireOwner(ctx);
        data = await conversations.searchOwnerConversationSummaries(
          ctx.db,
          userId,
          String(args.query),
          typeof args.limit === "number" ? args.limit : 5,
        );
        break;
      }
      case "get_conversation_summary": {
        const userId = requireOwner(ctx);
        data = await conversations.getConversationForOwner(ctx.db, userId, String(args.id));
        break;
      }
      default:
        return { ok: false, name, error: "unhandled_tool", durationMs: Date.now() - started };
    }

    const durationMs = Date.now() - started;
    console.log(
      JSON.stringify({
        event: "tool_ok",
        tool: name,
        role: ctx.role,
        duration_ms: durationMs,
      }),
    );
    return { ok: true, name, data: clipResult(data), durationMs };
  } catch (err) {
    const durationMs = Date.now() - started;
    const code = err instanceof Error ? err.message : "tool_error";
    console.log(
      JSON.stringify({
        event: "tool_fail",
        tool: name,
        role: ctx.role,
        code: code.startsWith("tool_") ? code : "tool_error",
        duration_ms: durationMs,
      }),
    );
    return {
      ok: false,
      name,
      error: code.startsWith("tool_") ? code : "tool_error",
      durationMs,
    };
  }
}

/**
 * How to add a future adapter (Drive, Gmail, Calendar, …):
 * 1. Add a ToolDefinition to TOOL_REGISTRY with allowedRoles + requiresConfirmation.
 * 2. Implement execute logic in the switch (or a dedicated adapter module).
 * 3. Keep secrets in wrangler secrets; never return tokens to the model.
 * 4. Treat adapter output as untrusted text in prompts.
 */
