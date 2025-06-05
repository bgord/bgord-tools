import { describe, expect, test } from "bun:test";

import { Timestamp } from "../src/timestamp.vo";

describe("Timestamp", () => {
  test("parses a valid positive integer", () => {
    const now = Date.now();
    const parsed = Timestamp.parse(now);
    expect(parsed).toBe(now);
  });

  test("throws on negative numbers", () => {
    expect(() => Timestamp.parse(-123)).toThrow();
  });

  test("throws on non-integer numbers", () => {
    expect(() => Timestamp.parse(123.45)).toThrow();
  });

  test("throws on non-number values", () => {
    expect(() => Timestamp.parse("123" as any)).toThrow();
  });

  test("defaults to current timestamp", () => {
    const before = Date.now();
    const parsed = Timestamp.parse(undefined);
    const after = Date.now();

    expect(parsed).toBeGreaterThanOrEqual(before);
    expect(parsed).toBeLessThanOrEqual(after);
  });
});
