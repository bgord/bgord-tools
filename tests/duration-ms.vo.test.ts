import { describe, expect, test } from "bun:test";
import { DurationMs, DurationMsError } from "../src/duration-ms.vo";

describe("DurationMs", () => {
  test("happy path", () => {
    expect(DurationMs.safeParse(0).success).toEqual(true);
    expect(DurationMs.safeParse(10_000).success).toEqual(true);
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
});
