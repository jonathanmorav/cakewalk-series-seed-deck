import { describe, expect, it } from "vitest";
import { formatDeckMonth } from "./slides";

describe("formatDeckMonth", () => {
  it("formats a calendar month for the investor-deck cover", () => {
    expect(formatDeckMonth(new Date(2026, 6, 1))).toEqual({
      label: "July 2026",
      dateTime: "2026-07",
    });
  });
});
