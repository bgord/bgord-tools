import { describe, expect, test } from "bun:test";
import {
  PopulationStandardDeviation,
  PopulationStandardDeviationError,
} from "../src/population-standard-deviation.service";

describe("Standard deviation", () => {
  test("throws an error for an empty set of values", () => {
    expect(() => PopulationStandardDeviation.calculate([])).toThrow(
      PopulationStandardDeviationError.NotEnoughValues,
    );
  });

  test("throws an error for a single value", () => {
    expect(() => PopulationStandardDeviation.calculate([1])).toThrow(
      PopulationStandardDeviationError.NotEnoughValues,
    );
  });

  test("calculates standard deviation for two values", () => {
    expect(PopulationStandardDeviation.calculate([1, 2])).toEqual(0.5);
  });

  test("calculates standard deviation for three values", () => {
    expect(PopulationStandardDeviation.calculate([1, 2, 3])).toEqual(0.82);
  });

  test("calculates standard deviation for a set of numbers", () => {
    expect(PopulationStandardDeviation.calculate([2, 4, 4, 4, 5, 5, 7, 9])).toEqual(2);
  });

  test("calculates standard deviation for another set of numbers", () => {
    expect(PopulationStandardDeviation.calculate([1, 1, 1, 1, 1, 1, 10])).toEqual(3.15);
  });
});
