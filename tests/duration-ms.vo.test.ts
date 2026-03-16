import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DurationMs } from "../src/duration-ms.vo";

describe("DurationMs", () => {
  test("happy path", () => {
    expect(v.safeParse(DurationMs, 0).success).toEqual(true);
    expect(v.safeParse(DurationMs, 10_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(DurationMs, null)).toThrow("duration.invalid");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(DurationMs, "123")).toThrow("duration.invalid");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(DurationMs, 1.5)).toThrow("duration.invalid");
  });
});
