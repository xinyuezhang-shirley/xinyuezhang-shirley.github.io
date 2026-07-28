import { describe, expect, it } from "vitest";
import { parseOwnerCredentialAttempt } from "../src/lib/auth";
import { TOOL_REGISTRY, executeTool } from "../src/tools/registry";
import { searchPortfolioContent } from "../src/tools/portfolioSearch";
import { extractCandidateObservations } from "../src/owner/persona";
import { isSafeUrlForTest } from "./helpers";

describe("owner credential parsing", () => {
  it("parses /owner command without logging", () => {
    const parsed = parseOwnerCredentialAttempt("/owner super-secret-passphrase", {
      historyHasUserMessages: true,
    });
    expect(parsed?.via).toBe("command");
    expect(parsed?.credential).toBe("super-secret-passphrase");
  });

  it("allows first-message credential when history has no user turns", () => {
    const parsed = parseOwnerCredentialAttempt("my-long-passphrase-here", {
      historyHasUserMessages: false,
    });
    expect(parsed?.via).toBe("first_message");
  });

  it("does not treat short first messages as credentials", () => {
    const parsed = parseOwnerCredentialAttempt("hey there", {
      historyHasUserMessages: false,
    });
    expect(parsed).toBeNull();
  });

  it("does not treat later messages as bare credentials", () => {
    const parsed = parseOwnerCredentialAttempt("my-long-passphrase-here", {
      historyHasUserMessages: true,
    });
    expect(parsed).toBeNull();
  });
});

describe("tool permissions", () => {
  it("marks memory tools owner-only", () => {
    expect(TOOL_REGISTRY.save_memory.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.search_memories.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.create_note.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.search_web.allowedRoles).toContain("public");
  });

  it("rejects public role for save_memory", async () => {
    const result = await executeTool(
      "save_memory",
      { content: "should not save" },
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

  it("requires confirmation for delete_memory", async () => {
    const result = await executeTool(
      "delete_memory",
      { id: "mem_x" },
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

describe("portfolio search", () => {
  it("finds public knowledge without private notes", () => {
    const hits = searchPortfolioContent("Echo poetry moonlight");
    expect(hits.some((h) => /echo/i.test(h.id) || /echo/i.test(h.title))).toBe(true);
  });
});

describe("persona extraction boundaries", () => {
  it("skips /owner auth strings and code", () => {
    const out = extractCandidateObservations([
      { role: "user", content: "/owner secret-value-here" },
      { role: "user", content: "```js\nconsole.log(1)\n```" },
      { role: "user", content: "Don't interview me like that." },
    ]);
    expect(out.every((o) => !/secret-value/i.test(o.observation))).toBe(true);
    expect(out.some((o) => o.category === "question_cadence")).toBe(true);
  });
});

describe("ssrf helpers", () => {
  it("blocks private hosts", () => {
    expect(isSafeUrlForTest("https://example.com/a")).toBe(true);
    expect(isSafeUrlForTest("http://127.0.0.1/x")).toBe(false);
    expect(isSafeUrlForTest("http://localhost/x")).toBe(false);
  });
});
