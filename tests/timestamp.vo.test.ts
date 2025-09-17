import { describe, expect, test } from "bun:test";
import { Timestamp } from "../src/timestamp.vo";

describe("Timestamp", () => {
  test("parses a valid positive integer", () => {
    expect(Timestamp.safeParse(Date.now()).success).toEqual(true);
  });

  test("accepts 0", () => {
    expect(Timestamp.safeParse(0).success).toEqual(true);
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
});
