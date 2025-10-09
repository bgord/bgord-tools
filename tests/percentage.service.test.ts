import { describe, expect, test } from "bun:test";
import { Percentage, PercentageError } from "../src/percentage.service";
import { RoundUp } from "../src/rounding.adapter";

describe("Percentage", () => {
  test("throws for an invalid denominator", () => {
    expect(() => Percentage.of(2, 0)).toThrow(PercentageError.InvalidDenominator);
  });

  test("works correctly for the 0 numerator", () => {
    expect(Percentage.of(0, 2)).toBe(0);
  });

  test("works correctly for an integer result", () => {
    expect(Percentage.of(1, 2)).toBe(50);
  });

  test("works correctly with default to nearest rounding", () => {
    expect(Percentage.of(1, 3)).toBe(33);
  });

  test("works correctly with round up rounding", () => {
    expect(Percentage.of(1, 3, new RoundUp())).toBe(34);
  });
});
