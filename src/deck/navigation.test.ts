import { describe, expect, it } from "vitest";
import { clampSlideIndex, normalizeHash, slideIndexFromHash } from "./navigation";

describe("deck navigation helpers", () => {
  it("normalizes plain and encoded hashes", () => {
    expect(normalizeHash("#flow")).toBe("flow");
    expect(normalizeHash("#the%20ask")).toBe("the ask");
    expect(normalizeHash("")).toBe("");
  });

  it("resolves known slide hashes and falls back to the cover", () => {
    const ids = ["cover", "flow", "close"];
    expect(slideIndexFromHash(ids, "#flow")).toBe(1);
    expect(slideIndexFromHash(ids, "#missing")).toBe(0);
  });

  it("clamps navigation to the available slide range", () => {
    expect(clampSlideIndex(-4, 7)).toBe(0);
    expect(clampSlideIndex(3, 7)).toBe(3);
    expect(clampSlideIndex(99, 7)).toBe(6);
    expect(clampSlideIndex(1, 0)).toBe(0);
  });
});
