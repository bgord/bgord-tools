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

  test("non-default rounding", () => {
    expect(Percentage.of(1, 3, new RoundingUpStrategy())).toEqual(34);
  });
});
