import { describe, expect, it } from "vitest";

import { Timestamp } from "../src/timestamp.vo";

describe("Timestamp", () => {
  it("parses a valid positive integer", () => {
    const now = Date.now();
    const parsed = Timestamp.parse(now);
    expect(parsed).toBe(now);
  });

  it("throws on negative numbers", () => {
    expect(() => Timestamp.parse(-123)).toThrow();
  });

  it("throws on non-integer numbers", () => {
    expect(() => Timestamp.parse(123.45)).toThrow();
  });

  it("throws on non-number values", () => {
    expect(() => Timestamp.parse("123" as any)).toThrow();
  });

  it("defaults to current timestamp", () => {
    const before = Date.now();
    const parsed = Timestamp.parse(undefined);
    const after = Date.now();

    expect(parsed).toBeGreaterThanOrEqual(before);
    expect(parsed).toBeLessThanOrEqual(after);
  });
});
