import { describe, expect, test } from "bun:test";
import {
  PopulationStandardDeviation,
  PopulationStandardDeviationError,
} from "../src/population-standard-deviation.service";

describe("Standard deviation", () => {
  test("throws - empty array", () => {
    expect(() => PopulationStandardDeviation.calculate([])).toThrow(
      PopulationStandardDeviationError.NotEnoughValues,
    );
  });

  test("throws - single value", () => {
    expect(() => PopulationStandardDeviation.calculate([1])).toThrow(
      PopulationStandardDeviationError.NotEnoughValues,
    );
  });

  test("two values", () => {
    expect(PopulationStandardDeviation.calculate([1, 2])).toEqual(0.5);
  });

  test("three values", () => {
    expect(PopulationStandardDeviation.calculate([1, 2, 3])).toEqual(0.82);
  });

  test("set of numbers", () => {
    expect(PopulationStandardDeviation.calculate([2, 4, 4, 4, 5, 5, 7, 9])).toEqual(2);
    expect(PopulationStandardDeviation.calculate([1, 1, 1, 1, 1, 1, 10])).toEqual(3.15);
  });
});
