import { describe, expect, test } from "bun:test";
import { Percentage } from "../src/percentage.service";
import { RoundingUpStrategy } from "../src/rounding-up.strategy";

describe("Percentage", () => {
  test("happy path", () => {
    expect(Percentage.of(0, 2)).toEqual(0);
    expect(Percentage.of(1, 2)).toEqual(50);
    expect(Percentage.of(1, 3)).toEqual(33);
  });

  test("throws - invalid denominator", () => {
    expect(() => Percentage.of(2, 0)).toThrow("percentage.invalid.denominator");
  });

  test("throws - non-finite denominator", () => {
    expect(() => Percentage.of(1, Number.POSITIVE_INFINITY)).toThrow("percentage.invalid.denominator");
    expect(() => Percentage.of(1, Number.NaN)).toThrow("percentage.invalid.denominator");
  });

  test("throws - non-finite numerator", () => {
    expect(() => Percentage.of(Number.NaN, 5)).toThrow("percentage.invalid.numerator");
    expect(() => Percentage.of(Number.POSITIVE_INFINITY, 5)).toThrow("percentage.invalid.numerator");
  });

  test("non-default rounding", () => {
    expect(Percentage.of(1, 3, new RoundingUpStrategy())).toEqual(34);
  });
});
