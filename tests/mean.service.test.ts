import { describe, expect, test } from "bun:test";
import { Mean } from "../src/mean.service";
import { RoundingToNearestStrategy } from "../src/rounding-to-nearest.strategy";

describe("Mean", () => {
  test("throws for empty values array", () => {
    expect(() => Mean.calculate([])).toThrow("mean.not.enough.values");
  });

  test("works for one value", () => {
    expect(Mean.calculate([1])).toEqual(1);
  });

  test("works for two values", () => {
    expect(Mean.calculate([1, 2])).toEqual(1.5);
  });

  test("works for three values", () => {
    expect(Mean.calculate([1, 3, 6])).toEqual(3.33);
  });

  test("works for all zeros", () => {
    expect(Mean.calculate([0, 0, 0])).toEqual(0);
  });

  test("non-default rounding", () => {
    expect(Mean.calculate([1, 3, 6], new RoundingToNearestStrategy())).toEqual(3);
  });
});
