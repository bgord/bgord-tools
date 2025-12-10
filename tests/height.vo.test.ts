import { describe, expect, test } from "bun:test";
import { Height } from "../src/height.vo";
import { HeightMillimeters, HeightMillimetersError } from "../src/height-milimiters.vo";
import { RoundDown, RoundToDecimal, RoundUp } from "../src/rounding.adapter";

describe("Height", () => {
  test("fromCentimeters", () => {
    expect(Height.fromCentimeters(180).toMillimeters()).toEqual(1800);
    expect(Height.fromCentimeters(180.04, new RoundDown()).toMillimeters()).toEqual(1800);
    expect(Height.fromCentimeters(180.06, new RoundUp()).toMillimeters()).toEqual(1801);
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
    expect(() => Height.fromCentimeters(-1)).toThrow(HeightMillimetersError.Invalid);
    expect(() => Height.fromMillimeters(Number.NaN)).toThrow(HeightMillimetersError.Type);
    expect(() => Height.fromMillimeters(Number.POSITIVE_INFINITY)).toThrow(HeightMillimetersError.Type);
  });

  test("toCentimeters", () => {
    const height = Height.fromCentimeters(180);
    expect(height.toCentimeters()).toEqual(180);
    expect(height.toCentimeters(new RoundToDecimal(1))).toEqual(180);
    expect(Height.fromMillimeters(1804).toCentimeters(new RoundToDecimal(1))).toEqual(180.4);
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
