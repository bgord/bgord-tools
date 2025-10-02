import { describe, expect, test } from "bun:test";
import { RoundToNearest } from "../src/rounding.adapter";
import { ZScore } from "../src/z-score.service";

describe("Z-score", () => {
  test("throws for empty values array", () => {
    expect(() => new ZScore([])).toThrow("At least two values are needed");
  });

  test("throws for one value", () => {
    expect(() => new ZScore([1])).toThrow("At least two values are needed");
  });

  test("works for two values", () => {
    expect(new ZScore([1, 2]).calculate(1)).toEqual(-1);
  });

  test("works for two values", () => {
    expect(new ZScore([1, 2]).calculate(2)).toEqual(1);
  });

  test("works for a set of values", () => {
    expect(new ZScore([1, 1, 1, 2, 2, 3, 3, 3, 10]).calculate(2)).toEqual(-0.34);
  });

  test("works for a non-default rounding", () => {
    expect(new ZScore([1, 1, 1, 2, 2, 3, 3, 3, 10], new RoundToNearest()).calculate(1)).toEqual(-1);
  });

  test("works for all zeros", () => {
    expect(new ZScore([0, 0, 0], new RoundToNearest()).calculate(1)).toEqual(Number.POSITIVE_INFINITY);
  });
});
