import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      // Allow portfolio knowledge import from worker tests
      "@": path.resolve(__dirname, "../../src"),
    },
  },
});
