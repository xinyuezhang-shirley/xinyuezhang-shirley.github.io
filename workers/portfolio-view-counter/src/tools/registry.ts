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
import { createDraft, getDraft, listChanges, listDrafts, parseProposed, updateDraft } from "../content/drafts";
import {
  createArtworkFromDraft,
  createDream,
  createPhotoCollectionFromDraft,
  proposeAtlasChanges,
  reorderArtworks,
  setArtworkStatus,
} from "../content/entities";
import {
  createThought,
  deleteThought,
  listOwnerThoughts,
  resurfaceThought,
  updateThought,
  connectThoughts,
  type ThoughtType,
  type ThoughtVisibility,
} from "../archive/thoughts";
import {
  createWriting,
  listOwnerWriting,
  publishWriting,
  unpublishWriting,
  linkThoughtToWriting,
} from "../archive/writing";

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
  reversible?: boolean;
};

export type ToolContext = {
  db: D1Database;
  role: ToolRole;
  userId: string | null;
  conversationId: string | null;
  searchApiKey?: string;
  searchProvider?: string;
  confirmed?: boolean;
  privateMedia?: R2Bucket;
  publicMedia?: R2Bucket;
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
  create_artwork_draft: {
    name: "create_artwork_draft",
    description: "Create an unpublished artwork draft from title/medium/uploads (not public until publish).",
    inputSchema: z.object({
      title: z.string().min(1).max(200),
      description: z.string().max(4000).optional(),
      medium: z.string().max(200).optional(),
      completedAt: z.string().max(64).optional(),
      section: z.string().max(80).optional(),
      uploadObjectIds: z.array(z.string()).max(12).optional(),
      tags: z.array(z.string().max(40)).max(20).optional(),
      altText: z.string().max(500).optional(),
      displayOrder: z.number().int().optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  publish_content_change: {
    name: "publish_content_change",
    description: "Publish an open content draft after explicit confirmation.",
    inputSchema: z.object({
      draftId: z.string().min(1).max(80),
      confirm: z.literal(true),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 20_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  list_content_changes: {
    name: "list_content_changes",
    description: "List recent website content mutations for the owner.",
    inputSchema: z.object({ limit: z.number().int().min(1).max(50).optional() }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  list_content_drafts: {
    name: "list_content_drafts",
    description: "List open Studio drafts.",
    inputSchema: z.object({ limit: z.number().int().min(1).max(50).optional() }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 5_000,
    privacy: "owner-private" as const,
  },
  create_photo_collection_draft: {
    name: "create_photo_collection_draft",
    description: "Create an unpublished photography collection draft from uploaded file IDs.",
    inputSchema: z.object({
      title: z.string().min(1).max(200),
      description: z.string().max(4000).optional(),
      uploadObjectIds: z.array(z.string()).max(40).optional(),
      coverUploadObjectId: z.string().max(80).optional(),
      locationLabel: z.string().max(200).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  create_dream_draft: {
    name: "create_dream_draft",
    description: "Save a private dream draft (full text never public by default).",
    inputSchema: z.object({
      text: z.string().min(1).max(100_000),
      title: z.string().max(200).optional(),
      dreamDate: z.string().max(64).optional(),
      publicExcerpt: z.string().max(2000).optional(),
      visibility: z
        .enum(["full_private", "private_with_public_excerpt", "fully_public"])
        .optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  preview_atlas_changes: {
    name: "preview_atlas_changes",
    description: "Propose Dream Atlas changes for a saved dream (review only).",
    inputSchema: z.object({ dreamId: z.string().min(1).max(80) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 10_000,
    privacy: "owner-private" as const,
  },
  unpublish_artwork: {
    name: "unpublish_artwork",
    description: "Hide a published artwork from the public Art page.",
    inputSchema: z.object({ artworkId: z.string().min(1).max(80), confirm: z.literal(true) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  reorder_artworks: {
    name: "reorder_artworks",
    description: "Set artwork display order by id list (first = top).",
    inputSchema: z.object({ orderedIds: z.array(z.string()).min(1).max(100) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  create_thought: {
    name: "create_thought",
    description: "Add a thought to the personal archive (default private).",
    inputSchema: z.object({
      text: z.string().min(1).max(8000),
      title: z.string().max(200).optional(),
      type: z
        .enum([
          "fragment",
          "question",
          "observation",
          "contradiction",
          "idea",
          "return",
          "note",
        ])
        .optional(),
      visibility: z
        .enum(["private", "passing", "public", "permanent", "dormant", "archived"])
        .optional(),
      tags: z.array(z.string().max(40)).max(12).optional(),
      perVisitorOnce: z.boolean().optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  update_thought: {
    name: "update_thought",
    description: "Edit a thought's text or metadata.",
    inputSchema: z.object({
      id: z.string().min(1).max(80),
      text: z.string().min(1).max(8000).optional(),
      title: z.string().max(200).nullable().optional(),
      type: z
        .enum([
          "fragment",
          "question",
          "observation",
          "contradiction",
          "idea",
          "return",
          "note",
        ])
        .optional(),
      tags: z.array(z.string().max(40)).max(12).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  search_thoughts: {
    name: "search_thoughts",
    description: "Search owner thoughts by text or filter by visibility.",
    inputSchema: z.object({
      query: z.string().max(200).optional(),
      visibility: z
        .enum(["all", "private", "passing", "public", "permanent", "dormant", "archived"])
        .optional(),
      limit: z.number().int().min(1).max(50).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  set_thought_visibility: {
    name: "set_thought_visibility",
    description: "Change thought visibility (private/passing/public/permanent/dormant/archived).",
    inputSchema: z.object({
      id: z.string().min(1).max(80),
      visibility: z.enum([
        "private",
        "passing",
        "public",
        "permanent",
        "dormant",
        "archived",
      ]),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  set_thought_behavior: {
    name: "set_thought_behavior",
    description: "Set resurfacing / encounter behavior for a thought.",
    inputSchema: z.object({
      id: z.string().min(1).max(80),
      perVisitorOnce: z.boolean().optional(),
      maxPublicEncounters: z.number().int().min(1).max(10000).nullable().optional(),
      resurfaceAfterDays: z.number().int().min(1).max(3650).nullable().optional(),
      expiresAt: z.number().int().nullable().optional(),
      manualWeight: z.number().optional(),
      pinned: z.boolean().optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  archive_thought: {
    name: "archive_thought",
    description: "Archive a thought (retained, removed from active public surface).",
    inputSchema: z.object({ id: z.string().min(1).max(80) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  delete_thought: {
    name: "delete_thought",
    description: "Permanently delete a thought (requires confirmation).",
    inputSchema: z.object({ id: z.string().min(1).max(80), confirm: z.literal(true) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  resurface_thought: {
    name: "resurface_thought",
    description: "Bring a dormant/archived thought back as passing or public.",
    inputSchema: z.object({
      id: z.string().min(1).max(80),
      visibility: z.enum(["passing", "public", "permanent"]).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  connect_thoughts: {
    name: "connect_thoughts",
    description: "Link two thoughts (related_to, contradicts, evolves_into, returns_to).",
    inputSchema: z.object({
      fromId: z.string().min(1).max(80),
      toId: z.string().min(1).max(80),
      relationshipType: z.string().min(1).max(40),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  link_thought_to_writing: {
    name: "link_thought_to_writing",
    description: "Link a thought to a writing piece (seed, expanded_into, etc.).",
    inputSchema: z.object({
      thoughtId: z.string().min(1).max(80),
      writingId: z.string().min(1).max(80),
      relationshipType: z.string().min(1).max(40).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  thoughts_to_writing_draft: {
    name: "thoughts_to_writing_draft",
    description: "Create a writing draft seeded by one or more thoughts (does not auto-write).",
    inputSchema: z.object({
      thoughtIds: z.array(z.string()).min(1).max(20),
      title: z.string().max(200).optional(),
      type: z.string().max(40).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 10_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  create_writing_draft: {
    name: "create_writing_draft",
    description: "Create an empty writing draft and return its id/slug for the editor.",
    inputSchema: z.object({
      title: z.string().max(200).optional(),
      type: z.string().max(40).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  list_writing: {
    name: "list_writing",
    description: "List writing drafts/pieces for the owner.",
    inputSchema: z.object({
      status: z.enum(["all", "draft", "private", "public", "archived"]).optional(),
      limit: z.number().int().min(1).max(50).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  open_writing: {
    name: "open_writing",
    description: "Resolve a writing piece id/slug and return the editor path.",
    inputSchema: z.object({
      id: z.string().max(80).optional(),
      query: z.string().max(200).optional(),
    }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: false,
    timeoutMs: 8_000,
    privacy: "owner-private" as const,
  },
  publish_writing: {
    name: "publish_writing",
    description: "Publish a writing piece after explicit confirmation.",
    inputSchema: z.object({ id: z.string().min(1).max(80), confirm: z.literal(true) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 15_000,
    privacy: "owner-private" as const,
    reversible: true,
  },
  unpublish_writing: {
    name: "unpublish_writing",
    description: "Unpublish a writing piece (make private).",
    inputSchema: z.object({ id: z.string().min(1).max(80), confirm: z.literal(true) }),
    allowedRoles: ["owner"] as ToolRole[],
    requiresConfirmation: true,
    timeoutMs: 10_000,
    privacy: "owner-private" as const,
    reversible: true,
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
      case "create_artwork_draft": {
        const userId = requireOwner(ctx);
        const draft = await createDraft(ctx.db, {
          ownerId: userId,
          contentType: "artwork",
          operationType: "create",
          proposedData: args,
          conversationId: ctx.conversationId,
        });
        await updateDraft(ctx.db, userId, draft.id, {
          validationStatus: "valid",
          previewStatus: "ready",
        });
        data = {
          status: "drafted",
          draftId: draft.id,
          title: args.title,
          message:
            "Artwork draft saved privately — not on the public site. Publish with confirm.",
        };
        break;
      }
      case "create_photo_collection_draft": {
        const userId = requireOwner(ctx);
        const draft = await createDraft(ctx.db, {
          ownerId: userId,
          contentType: "photo_collection",
          operationType: "create",
          proposedData: args,
          conversationId: ctx.conversationId,
        });
        await updateDraft(ctx.db, userId, draft.id, {
          validationStatus: "valid",
          previewStatus: "ready",
        });
        data = {
          status: "drafted",
          draftId: draft.id,
          title: args.title,
          imageCount: Array.isArray(args.uploadObjectIds) ? args.uploadObjectIds.length : 0,
        };
        break;
      }
      case "create_dream_draft": {
        const userId = requireOwner(ctx);
        const draft = await createDraft(ctx.db, {
          ownerId: userId,
          contentType: "dream",
          operationType: "create",
          proposedData: {
            rawPrivateText: args.text,
            title: args.title,
            dreamDate: args.dreamDate,
            publicExcerpt: args.publicExcerpt,
            visibility: args.visibility || "full_private",
          },
          conversationId: ctx.conversationId,
        });
        // Private dreams may save immediately as private records + keep draft link
        const dream = await createDream(
          ctx.db,
          userId,
          {
            rawPrivateText: String(args.text),
            title: typeof args.title === "string" ? args.title : null,
            dreamDate: typeof args.dreamDate === "string" ? args.dreamDate : null,
            publicExcerpt: typeof args.publicExcerpt === "string" ? args.publicExcerpt : null,
            visibility: "full_private",
          },
          { conversationId: ctx.conversationId, draftId: draft.id },
        );
        await updateDraft(ctx.db, userId, draft.id, {
          status: "published",
          targetContentId: (dream as { id?: string })?.id ?? null,
        });
        data = {
          status: "saved_privately",
          draftId: draft.id,
          dreamId: (dream as { id?: string })?.id,
          visibility: "full_private",
        };
        break;
      }
      case "publish_content_change": {
        const userId = requireOwner(ctx);
        const draft = await getDraft(ctx.db, userId, String(args.draftId));
        if (!draft || draft.status !== "open") {
          throw new Error("tool_draft_unavailable");
        }
        const proposed = parseProposed<Record<string, unknown>>(draft);
        if (draft.content_type === "artwork") {
          data = await createArtworkFromDraft(
            ctx.db,
            userId,
            {
              title: String(proposed.title || "Untitled"),
              description: (proposed.description as string) || null,
              medium: (proposed.medium as string) || null,
              completedAt: (proposed.completedAt as string) || null,
              section: (proposed.section as string) || "Recent Work",
              tags: Array.isArray(proposed.tags) ? (proposed.tags as string[]) : [],
              altText: (proposed.altText as string) || null,
              uploadObjectIds: Array.isArray(proposed.uploadObjectIds)
                ? (proposed.uploadObjectIds as string[])
                : [],
              displayOrder:
                typeof proposed.displayOrder === "number" ? proposed.displayOrder : 0,
              status: "published",
            },
            {
              conversationId: ctx.conversationId,
              draftId: draft.id,
              privateBucket: ctx.privateMedia,
              publicBucket: ctx.publicMedia,
            },
          );
        } else if (draft.content_type === "photo_collection") {
          data = await createPhotoCollectionFromDraft(
            ctx.db,
            userId,
            {
              title: String(proposed.title || "Untitled"),
              description: (proposed.description as string) || null,
              uploadObjectIds: Array.isArray(proposed.uploadObjectIds)
                ? (proposed.uploadObjectIds as string[])
                : [],
              coverUploadObjectId: (proposed.coverUploadObjectId as string) || null,
              status: "published",
            },
            {
              conversationId: ctx.conversationId,
              draftId: draft.id,
              privateBucket: ctx.privateMedia,
              publicBucket: ctx.publicMedia,
            },
          );
        } else {
          throw new Error("tool_unsupported_publish");
        }
        await updateDraft(ctx.db, userId, draft.id, { status: "published" });
        break;
      }
      case "list_content_changes": {
        const userId = requireOwner(ctx);
        data = await listChanges(
          ctx.db,
          userId,
          typeof args.limit === "number" ? args.limit : 20,
        );
        break;
      }
      case "list_content_drafts": {
        const userId = requireOwner(ctx);
        data = await listDrafts(ctx.db, userId, {
          limit: typeof args.limit === "number" ? args.limit : 20,
        });
        break;
      }
      case "preview_atlas_changes": {
        const userId = requireOwner(ctx);
        data = await proposeAtlasChanges(ctx.db, userId, String(args.dreamId));
        break;
      }
      case "unpublish_artwork": {
        const userId = requireOwner(ctx);
        data = await setArtworkStatus(ctx.db, userId, String(args.artworkId), "hidden");
        break;
      }
      case "reorder_artworks": {
        const userId = requireOwner(ctx);
        data = await reorderArtworks(ctx.db, userId, args.orderedIds as string[]);
        break;
      }
      case "create_thought": {
        const userId = requireOwner(ctx);
        data = await createThought(ctx.db, userId, {
          text: String(args.text),
          title: args.title as string | undefined,
          type: args.type as ThoughtType | undefined,
          visibility: (args.visibility as ThoughtVisibility) || "private",
          tags: args.tags as string[] | undefined,
          perVisitorOnce: args.perVisitorOnce as boolean | undefined,
          conversationId: ctx.conversationId,
        });
        break;
      }
      case "update_thought": {
        const userId = requireOwner(ctx);
        data = await updateThought(ctx.db, userId, String(args.id), {
          text: args.text as string | undefined,
          title: args.title as string | null | undefined,
          type: args.type as ThoughtType | undefined,
          tags: args.tags as string[] | undefined,
        });
        break;
      }
      case "search_thoughts": {
        const userId = requireOwner(ctx);
        const items = await listOwnerThoughts(ctx.db, userId, {
          query: args.query as string | undefined,
          visibility: (args.visibility as string) || "all",
          limit: typeof args.limit === "number" ? args.limit : 20,
        });
        data = {
          items: items.map((t) => ({
            id: t.id,
            text: (t.edited_text || t.text).slice(0, 280),
            visibility: t.visibility,
            type: t.type,
            updated_at: t.updated_at,
          })),
        };
        break;
      }
      case "set_thought_visibility": {
        const userId = requireOwner(ctx);
        data = await updateThought(ctx.db, userId, String(args.id), {
          visibility: args.visibility as ThoughtVisibility,
        });
        break;
      }
      case "set_thought_behavior": {
        const userId = requireOwner(ctx);
        data = await updateThought(ctx.db, userId, String(args.id), {
          perVisitorOnce: args.perVisitorOnce as boolean | undefined,
          maxPublicEncounters: args.maxPublicEncounters as number | null | undefined,
          resurfaceAfterDays: args.resurfaceAfterDays as number | null | undefined,
          expiresAt: args.expiresAt as number | null | undefined,
          manualWeight: args.manualWeight as number | undefined,
          pinned: args.pinned as boolean | undefined,
        });
        break;
      }
      case "archive_thought": {
        const userId = requireOwner(ctx);
        data = await updateThought(ctx.db, userId, String(args.id), {
          visibility: "archived",
        });
        break;
      }
      case "delete_thought": {
        const userId = requireOwner(ctx);
        await deleteThought(ctx.db, userId, String(args.id));
        data = { deleted: true, id: args.id };
        break;
      }
      case "resurface_thought": {
        const userId = requireOwner(ctx);
        data = await resurfaceThought(
          ctx.db,
          userId,
          String(args.id),
          (args.visibility as ThoughtVisibility) || "passing",
        );
        break;
      }
      case "connect_thoughts": {
        const userId = requireOwner(ctx);
        data = await connectThoughts(
          ctx.db,
          userId,
          String(args.fromId),
          String(args.toId),
          String(args.relationshipType),
        );
        break;
      }
      case "link_thought_to_writing": {
        const userId = requireOwner(ctx);
        data = await linkThoughtToWriting(
          ctx.db,
          userId,
          String(args.thoughtId),
          String(args.writingId),
          String(args.relationshipType || "seed"),
        );
        break;
      }
      case "thoughts_to_writing_draft": {
        const userId = requireOwner(ctx);
        const thoughtIds = args.thoughtIds as string[];
        const piece = await createWriting(ctx.db, userId, {
          title: (args.title as string) || "Untitled",
          type: (args.type as string) || "essay",
          thoughtIds,
          conversationId: ctx.conversationId,
        });
        data = {
          writingId: piece.id,
          slug: piece.slug,
          editorPath: `/writing/edit/${piece.id}`,
          thoughtIds,
        };
        break;
      }
      case "create_writing_draft": {
        const userId = requireOwner(ctx);
        const piece = await createWriting(ctx.db, userId, {
          title: (args.title as string) || "Untitled",
          type: (args.type as string) || "essay",
          conversationId: ctx.conversationId,
        });
        data = {
          writingId: piece.id,
          slug: piece.slug,
          editorPath: `/writing/edit/${piece.id}`,
        };
        break;
      }
      case "list_writing": {
        const userId = requireOwner(ctx);
        const items = await listOwnerWriting(ctx.db, userId, {
          status: (args.status as string) || "all",
          limit: typeof args.limit === "number" ? args.limit : 20,
        });
        data = {
          items: items.map((w) => ({
            id: w.id,
            slug: w.slug,
            title: w.title,
            status: w.status,
            updated_at: w.updated_at,
            editorPath: `/writing/edit/${w.id}`,
          })),
        };
        break;
      }
      case "open_writing": {
        const userId = requireOwner(ctx);
        const items = await listOwnerWriting(ctx.db, userId, { limit: 40 });
        let piece = args.id
          ? items.find((w) => w.id === args.id)
          : undefined;
        if (!piece && args.query) {
          const q = String(args.query).toLowerCase();
          piece = items.find(
            (w) =>
              w.title.toLowerCase().includes(q) || w.slug.toLowerCase().includes(q),
          );
        }
        if (!piece) throw new Error("writing_not_found");
        data = {
          writingId: piece.id,
          slug: piece.slug,
          title: piece.title,
          status: piece.status,
          editorPath: `/writing/edit/${piece.id}`,
          publicPath: piece.status === "public" ? `/writing/${piece.slug}` : null,
        };
        break;
      }
      case "publish_writing": {
        const userId = requireOwner(ctx);
        data = await publishWriting(ctx.db, userId, String(args.id));
        break;
      }
      case "unpublish_writing": {
        const userId = requireOwner(ctx);
        data = await unpublishWriting(ctx.db, userId, String(args.id));
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
