import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";

describe("UA-only UI copy", () => {
  it("has no untranslated English strings in src/pages and src/components", () => {
    try {
      execFileSync("node", ["scripts/check-ukrainian.mjs"], { stdio: "pipe" });
    } catch (err: any) {
      const out = (err.stderr?.toString() || "") + (err.stdout?.toString() || "");
      throw new Error(out);
    }
    expect(true).toBe(true);
  });
});
