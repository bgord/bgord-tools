import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { RoundingDecimal } from "../src/rounding-decimal.vo";

describe("RoundingDecimal", () => {
  test("happy path", () => {
    const valid = [0, 1, 2, 100];

    for (const value of valid) {
      expect(v.safeParse(RoundingDecimal, value).success).toEqual(true);
    }
  });

  test("rejects non-number", () => {
    expect(() => v.parse(RoundingDecimal, "")).toThrow("rounding.decimal.type");
    expect(() => v.parse(RoundingDecimal, null)).toThrow("rounding.decimal.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(RoundingDecimal, 1.5)).toThrow("rounding.decimal.type");
  });

  test("rejects out of range", () => {
    expect(() => v.parse(RoundingDecimal, -1)).toThrow("rounding.decimal.invalid");
    expect(() => v.parse(RoundingDecimal, 101)).toThrow("rounding.decimal.invalid");
  });
});
