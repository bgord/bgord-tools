import { describe, expect, test } from "bun:test";
import { MinMaxScaler } from "../src/min-max-scaler.service";

describe("MinMaxScaler", () => {
  test("scale - default bound", () => {
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

  test("scale - custom bound", () => {
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

  test("scale - custom bound - 2 decimals rounding", () => {
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

  test("scale - minimum value", () => {
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

  test("scale - maximum value", () => {
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

  test("scale - min equals to max", () => {
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

  test("scale - non-zero min value", () => {
    const scaler = new MinMaxScaler({ min: 50, max: 100, bound: { lower: 0, upper: 10 } });

    const result = scaler.scale(75);

    expect(result.scaled).toBe(5);
    expect(result.original).toBe(75);
  });

  test("scale - throws for invalid min/max config", () => {
    expect(() => new MinMaxScaler({ min: 100, max: 0, bound: { lower: 0, upper: 10 } })).toThrow(
      "min.max.scaler.invalid.min.max",
    );
  });

  test("scale - throws for invalid bound config", () => {
    expect(() => new MinMaxScaler({ min: 0, max: 10, bound: { lower: 20, upper: 10 } })).toThrow(
      "min.max.scaler.invalid.bound",
    );
    expect(() => new MinMaxScaler({ min: 0, max: 10, bound: { lower: 10, upper: 10 } })).toThrow(
      "min.max.scaler.invalid.bound",
    );
  });

  test("scale - throws when value is bigger than configured range", () => {
    expect(() => new MinMaxScaler({ min: 0, max: 10 }).scale(15)).toThrow(
      "min.max.scaler.value.out.of.range",
    );
  });

  test("scale - throws when value is less than configured range", () => {
    const scaler = new MinMaxScaler({ min: 10, max: 20 });

    expect(() => scaler.scale(5)).toThrow("min.max.scaler.value.out.of.range");
  });

  test("descale - throws when scaled value is out of bounds", () => {
    const scaler = new MinMaxScaler({ min: 0, max: 100, bound: { lower: 10, upper: 20 } });

    expect(() => scaler.descale(5)).toThrow("min.max.scaler.scaled.out.of.bounds");
    expect(() => scaler.descale(25)).toThrow("min.max.scaler.scaled.out.of.bounds");
  });

  test("getMinMax - happy path", () => {
    expect(MinMaxScaler.getMinMax([10, 5, 20, 15, 30])).toEqual({ min: 5, max: 30 });
  });

  test("getMinMax - empty array", () => {
    expect(() => MinMaxScaler.getMinMax([])).toThrow("min.max.scaler.empty.array");
  });

  test("getMinMax - single-value arrays", () => {
    expect(MinMaxScaler.getMinMax([10])).toEqual({ min: 10, max: 10 });
  });
});
