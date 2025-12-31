import { describe, expect, test } from "bun:test";
import { Height } from "../src/height.vo";
import { HeightMillimeters } from "../src/height-milimiters.vo";
import { RoundingDecimalStrategy } from "../src/rounding-decimal.strategy";
import { RoundingDownStrategy } from "../src/rounding-down.strategy";
import { RoundingUpStrategy } from "../src/rounding-up.strategy";

describe("Height", () => {
  test("fromCentimeters", () => {
    expect(Height.fromCentimeters(180).toMillimeters()).toEqual(1800);
    expect(Height.fromCentimeters(180.04, new RoundingDownStrategy()).toMillimeters()).toEqual(1800);
    expect(Height.fromCentimeters(180.06, new RoundingUpStrategy()).toMillimeters()).toEqual(1801);
  });

  test("fromMillimeters", () => {
    expect(Height.fromMillimeters(180).toMillimeters()).toEqual(180);
  });

  test("fromMillimetersSafe", () => {
    expect(Height.fromMillimetersSafe(HeightMillimeters.parse(100)).toMillimeters()).toEqual(100);
  });

  test("zero factory", () => {
    expect(Height.zero().toMillimeters()).toEqual(0);
  });

  test("guards invalid inputs", () => {
    expect(() => Height.fromCentimeters(-1)).toThrow("height.millimeters.invalid");
    expect(() => Height.fromMillimeters(Number.NaN)).toThrow("height.millimeters.type");
    expect(() => Height.fromMillimeters(Number.POSITIVE_INFINITY)).toThrow("height.millimeters.type");
  });

  test("toCentimeters", () => {
    const height = Height.fromCentimeters(180);

    expect(height.toCentimeters()).toEqual(180);
    expect(height.toCentimeters(new RoundingDecimalStrategy(1))).toEqual(180);
    expect(Height.fromMillimeters(1804).toCentimeters(new RoundingDecimalStrategy(1))).toEqual(180.4);
  });

  test("format", () => {
    expect(Height.fromMillimeters(1804).format()).toEqual("180.4 cm");
    expect(Height.fromCentimeters(180).format()).toEqual("180 cm");
  });

  test("comparisons", () => {
    const a = Height.fromMillimeters(1800);
    const b = Height.fromCentimeters(180);
    const c = Height.fromMillimeters(1801);

    expect(a.equals(b)).toEqual(true);
    expect(a.lessThan(c)).toEqual(true);
    expect(c.greaterThan(b)).toEqual(true);
    expect(Height.zero().isZero()).toEqual(true);
  });

  test("toString", () => {
    expect(Height.fromMillimeters(1804).toString()).toEqual("180.4 cm");
  });

  test("toJSON", () => {
    expect(Height.fromMillimeters(1804).toJSON()).toEqual(1804);
  });
});
