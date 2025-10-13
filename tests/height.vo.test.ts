import { describe, expect, test } from "bun:test";
import { Height } from "../src/height.vo";
import { HeightMillimetersError } from "../src/height-milimiters.vo";
import { RoundDown, RoundToDecimal, RoundUp } from "../src/rounding.adapter";

describe("Height", () => {
  test("fromCentimeters", () => {
    expect(Height.fromCentimeters(180).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.04, new RoundDown()).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.06, new RoundUp()).toMillimeters()).toBe(1801);
  });

  test("fromMillimeters", () => {
    expect(Height.fromMillimeters(180).toMillimeters()).toBe(180);
  });

  test("zero factory", () => {
    expect(Height.zero().toMillimeters()).toBe(0);
  });

  test("guards invalid inputs", () => {
    expect(() => Height.fromCentimeters(-1)).toThrow(HeightMillimetersError.Invalid);
    expect(() => Height.fromMillimeters(Number.NaN)).toThrow(HeightMillimetersError.Type);
    expect(() => Height.fromMillimeters(Number.POSITIVE_INFINITY)).toThrow(HeightMillimetersError.Type);
  });

  test("toCentimeters", () => {
    const height = Height.fromCentimeters(180);
    expect(height.toCentimeters()).toBe(180);
    expect(height.toCentimeters(new RoundToDecimal(1))).toBe(180);
    expect(Height.fromMillimeters(1804).toCentimeters(new RoundToDecimal(1))).toBe(180.4);
  });

  test("format", () => {
    expect(Height.fromMillimeters(1804).format()).toBe("180.4 cm");
    expect(Height.fromCentimeters(180).format()).toBe("180 cm");
  });

  test("comparisons", () => {
    const a = Height.fromMillimeters(1800);
    const b = Height.fromCentimeters(180);
    const c = Height.fromMillimeters(1801);

    expect(a.equals(b)).toBe(true);
    expect(a.lessThan(c)).toBe(true);
    expect(c.greaterThan(b)).toBe(true);
    expect(Height.zero().isZero()).toBe(true);
  });

  test("toString", () => {
    expect(Height.fromMillimeters(1804).toString()).toBe("180.4 cm");
  });

  test("toJSON", () => {
    expect(Height.fromMillimeters(1804).toJSON()).toEqual(1804);
  });
});
