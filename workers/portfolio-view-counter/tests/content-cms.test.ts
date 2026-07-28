import { describe, expect, it } from "vitest";
import { TOOL_REGISTRY, executeTool } from "../src/tools/registry";
import { stripJpegExif, sniffMimeForTest, ALLOWED_MIME } from "./content-helpers";

describe("content CMS tool permissions", () => {
  it("marks content tools owner-only", () => {
    expect(TOOL_REGISTRY.create_artwork_draft.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.create_photo_collection_draft.allowedRoles).toEqual([
      "owner",
    ]);
    expect(TOOL_REGISTRY.create_dream_draft.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.publish_content_change.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.list_content_drafts.allowedRoles).toEqual(["owner"]);
    expect(TOOL_REGISTRY.unpublish_artwork.allowedRoles).toEqual(["owner"]);
  });

  it("rejects public role for create_artwork_draft", async () => {
    const result = await executeTool(
      "create_artwork_draft",
      { title: "Secret piece", uploadObjectIds: ["upl_x"] },
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

  it("requires confirmation for publish_content_change", async () => {
    const result = await executeTool(
      "publish_content_change",
      { draftId: "drf_x" },
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

  it("requires confirmation for unpublish_artwork", async () => {
    const result = await executeTool(
      "unpublish_artwork",
      { id: "art_x" },
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

describe("upload safety", () => {
  it("allows only known image MIME types", () => {
    expect(ALLOWED_MIME.has("image/jpeg")).toBe(true);
    expect(ALLOWED_MIME.has("image/png")).toBe(true);
    expect(ALLOWED_MIME.has("application/pdf")).toBe(false);
    expect(ALLOWED_MIME.has("image/svg+xml")).toBe(false);
  });

  it("sniffs JPEG/PNG signatures", () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const png = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0,
    ]);
    expect(sniffMimeForTest(jpeg)).toBe("image/jpeg");
    expect(sniffMimeForTest(png)).toBe("image/png");
  });

  it("strips JPEG APP1 EXIF without breaking SOI", () => {
    // Minimal JPEG: SOI + APP1 + SOS payload + EOI
    const jpeg = new Uint8Array([
      0xff, 0xd8, // SOI
      0xff, 0xe1, 0x00, 0x08, 0x45, 0x78, 0x69, 0x66, // APP1 "Exif" stub
      0xff, 0xda, 0x00, 0x02, 0x00, // SOS
      0x01, 0x02, 0x03,
      0xff, 0xd9, // EOI
    ]);
    const stripped = stripJpegExif(jpeg);
    expect(stripped[0]).toBe(0xff);
    expect(stripped[1]).toBe(0xd8);
    // APP1 marker should be gone
    expect([...stripped].includes(0xe1)).toBe(false);
  });
});
