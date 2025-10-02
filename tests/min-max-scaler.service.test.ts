import { describe, expect, test } from "bun:test";
import {
  MinMaxEmptyArrayError,
  MinMaxInvalidBoundError,
  MinMaxInvalidMinMaxError,
  MinMaxScaledOutOfBoundsError,
  MinMaxScaler,
  MinMaxValueOutOfRangeError,
} from "../src/min-max-scaler.service";

describe("MinMaxScaler", () => {
  describe("scale", () => {
    test("scales a value within a custom bound", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 100, bound: { lower: 10, upper: 20 } });

      const original = 50;
      const scaled = 15;

      const result = scaler.scale(original);
      expect(result).toEqual({ original, scaled, isMin: false, isMax: false });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: false,
        isUpperBound: false,
        original,
        scaled,
      });
    });

    test("scales with 2-decimal rounding inside custom [0,9] bound", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 27, bound: { lower: 0, upper: 9 } });

      const original = 5;
      const scaled = 1.67;

      const result = scaler.scale(original);
      expect(result).toEqual({ scaled, original, isMin: false, isMax: false });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: false,
        isUpperBound: false,
        original: 5.01,
        scaled,
      });
    });

    test("scales with default bound [0,1]", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 100 });

      const original = 50;
      const scaled = 0.5;

      const result = scaler.scale(original);
      expect(result).toEqual({ scaled, original, isMin: false, isMax: false });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: false,
        isUpperBound: false,
        original,
        scaled,
      });
    });

    test("handles the minimum value", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 100, bound: { lower: 10, upper: 20 } });

      const original = 0;
      const scaled = 10;

      const result = scaler.scale(original);
      expect(result).toEqual({ scaled, original, isMin: true, isMax: false });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: true,
        isUpperBound: false,
        original,
        scaled,
      });
    });

    test("handles the maximum value", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 100, bound: { lower: 10, upper: 20 } });

      const original = 100;
      const scaled = 20;

      const result = scaler.scale(original);
      expect(result).toEqual({ scaled, original, isMin: false, isMax: true });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: false,
        isUpperBound: true,
        original,
        scaled,
      });
    });

    test("handles min = max (degenerate range)", () => {
      const scaler = new MinMaxScaler({ min: 100, max: 100, bound: { lower: 10, upper: 20 } });

      const original = 100;
      const scaled = 15;

      const result = scaler.scale(original);
      expect(result).toEqual({ scaled, original, isMin: true, isMax: true });

      expect(scaler.descale(result.scaled)).toEqual({
        isLowerBound: false,
        isUpperBound: false,
        original,
        scaled,
      });
    });

    test("throws for invalid min/max config (min > max)", () => {
      expect(() => new MinMaxScaler({ min: 100, max: 0, bound: { lower: 0, upper: 10 } })).toThrow(
        MinMaxInvalidMinMaxError,
      );
    });

    test("throws for invalid bound config (lower >= upper)", () => {
      expect(() => new MinMaxScaler({ min: 0, max: 10, bound: { lower: 20, upper: 10 } })).toThrow(
        MinMaxInvalidBoundError,
      );
      expect(() => new MinMaxScaler({ min: 0, max: 10, bound: { lower: 10, upper: 10 } })).toThrow(
        MinMaxInvalidBoundError,
      );
    });

    test("throws when value is out of [min, max] range", () => {
      expect(() => new MinMaxScaler({ min: 0, max: 10 }).scale(15)).toThrow(MinMaxValueOutOfRangeError);
    });
  });

  describe("descale", () => {
    test("throws when scaled value is out of [lower, upper] bounds", () => {
      const scaler = new MinMaxScaler({ min: 0, max: 100, bound: { lower: 10, upper: 20 } });

      expect(() => scaler.descale(5)).toThrow(MinMaxScaledOutOfBoundsError);
      expect(() => scaler.descale(25)).toThrow(MinMaxScaledOutOfBoundsError);
    });
  });

  describe("getMinMax", () => {
    test("throws for empty arrays", () => {
      expect(() => MinMaxScaler.getMinMax([] as number[])).toThrow(MinMaxEmptyArrayError);
    });

    test("returns min and max for single-value arrays", () => {
      expect(MinMaxScaler.getMinMax([10])).toEqual({ min: 10, max: 10 });
    });

    test("returns the minimum and maximum values from an array", () => {
      expect(MinMaxScaler.getMinMax([10, 5, 20, 15, 30])).toEqual({ min: 5, max: 30 });
    });
  });
});
