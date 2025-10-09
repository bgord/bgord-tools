import { describe, expect, test } from "bun:test";
import { DurationMs, DurationMsError } from "../src/duration-ms.vo";

describe("DurationMs", () => {
  test("accepts 0", () => {
    expect(DurationMs.safeParse(0).success).toEqual(true);
  });

  test("accepts valid duration", () => {
    expect(DurationMs.safeParse(10_000).success).toEqual(true);
  });

  test("accepts MAX_SAFE_INTEGER", () => {
    expect(DurationMs.safeParse(Number.MAX_SAFE_INTEGER).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => DurationMs.parse(null)).toThrow(DurationMsError.Invalid);
  });

  test("rejects non-number - string", () => {
    expect(() => DurationMs.parse("123")).toThrow(DurationMsError.Invalid);
  });

  test("rejects fractions", () => {
    expect(() => DurationMs.parse(1.5)).toThrow(DurationMsError.Invalid);
  });

  test("rejects NaN", () => {
    expect(() => DurationMs.parse(Number.NaN)).toThrow(DurationMsError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => DurationMs.parse(Number.POSITIVE_INFINITY)).toThrow(DurationMsError.Invalid);
  });
});
