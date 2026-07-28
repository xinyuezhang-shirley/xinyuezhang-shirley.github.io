import { describe, expect, it } from "vitest";
import { TOOL_REGISTRY, executeTool } from "../src/tools/registry";
import { toPublicThought, type ThoughtRow } from "../src/archive/thoughts";

describe("thought / writing tool permissions", () => {
  it("marks thought and writing tools owner-only", () => {
    expect(TOOL_REGISTRY.create_thought.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.search_thoughts.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.delete_thought.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.delete_thought.requiresConfirmation).toBe(true);
    expect(TOOL_REGISTRY.publish_writing.requiresConfirmation).toBe(true);
    expect(TOOL_REGISTRY.create_writing_draft.allowedRoles).toEqual(["owner"]);
  });

  it("rejects public create_thought", async () => {
    const result = await executeTool(
      "create_thought",
      { text: "should not save" },
      {
        db: {} as D1Database,
        role: "public",
        userId: null,
        conversationId: null,
      },
    );
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/tool_forbidden|forbidden/);
  });

  it("requires confirmation for delete_thought", async () => {
    const result = await executeTool(
      "delete_thought",
      { id: "th_x", confirm: true },
      {
        db: {} as D1Database,
        role: "owner",
        userId: "usr_x",
        conversationId: null,
        confirmed: false,
      },
    );
    expect(result.ok).toBe(false);
    expect(result.error).toBe("confirmation_required");
  });

  it("requires confirmation for publish_writing", async () => {
    const result = await executeTool(
      "publish_writing",
      { id: "wrt_x", confirm: true },
      {
        db: {} as D1Database,
        role: "owner",
        userId: "usr_x",
        conversationId: null,
        confirmed: false,
      },
    );
    expect(result.ok).toBe(false);
    expect(result.error).toBe("confirmation_required");
  });
});

describe("public thought payload", () => {
  it("strips private fields", () => {
    const row: ThoughtRow = {
      id: "th_1",
      owner_id: "usr_secret",
      text: "hello",
      title: null,
      type: "fragment",
      visibility: "passing",
      created_at: 1,
      updated_at: 1,
      published_at: 1,
      dormant_at: null,
      archived_at: null,
      expires_at: null,
      max_public_encounters: null,
      public_encounter_count: 3,
      last_surfaced_at: null,
      resurface_after_days: 30,
      per_visitor_once: 1,
      manual_weight: 2,
      pinned: 0,
      source_conversation_id: "conv_secret",
      source_message_id: "msg_secret",
      original_text: "hello",
      edited_text: null,
      behavior_json: "{}",
    };
    const pub = toPublicThought(row);
    expect(pub).toEqual({
      id: "th_1",
      text: "hello",
      title: null,
      type: "fragment",
      visibility: "passing",
      created_at: 1,
      pinned: false,
    });
    expect(JSON.stringify(pub)).not.toMatch(/secret|conversation|behavior|owner/i);
  });
});
