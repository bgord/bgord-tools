import { describe, expect, test } from "bun:test";
import { RoundingToNearestStrategy } from "../src/rounding-to-nearest.strategy";
import { ZScore, ZScoreError } from "../src/z-score.service";

describe("Z-score", () => {
  test("throws for empty values array", () => {
    expect(() => new ZScore([])).toThrow(ZScoreError.NotEnoughValues);
  });

  test("works for all zeros", () => {
    expect(new ZScore([0, 0, 0]).calculate(1)).toEqual(Number.POSITIVE_INFINITY);
  });

  test("throws for one value", () => {
    expect(() => new ZScore([1])).toThrow(ZScoreError.NotEnoughValues);
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

  test("non-default rounding", () => {
    expect(new ZScore([1, 1, 1, 2, 2, 3, 3, 3, 10], new RoundingToNearestStrategy()).calculate(1)).toEqual(
      -1,
    );
  });
});
