import { describe, expect, test } from "bun:test";
import { Height } from "../src/height.vo";
import { HeightMillimetersError } from "../src/height-milimiters.vo";
import { RoundDown, RoundToDecimal, RoundUp } from "../src/rounding.adapter";

describe("Height", () => {
  test("creates from centimeters and stores integer millimeters using strategy", () => {
    expect(Height.fromCentimeters(180).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.04, new RoundDown()).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.06, new RoundUp()).toMillimeters()).toBe(1801);
  });

  test("zero factory", () => {
    expect(Height.zero().toMillimeters()).toBe(0);
  });

  test("converts to centimeters with optional rounding", () => {
    const height = Height.fromCentimeters(180);
    expect(height.toCentimeters()).toBe(180);
    expect(height.toCentimeters(new RoundToDecimal(1))).toBe(180);
    expect(Height.fromMillimeters(1804).toCentimeters(new RoundToDecimal(1))).toBe(180.4);
  });

  test("formats centimeters using default RoundToDecimal(1)", () => {
    expect(Height.fromMillimeters(1804).format()).toBe("180.4 cm");
    expect(Height.fromCentimeters(180).format()).toBe("180 cm");
  });

  test("compares exactly via integer millimeters", () => {
    const a = Height.fromMillimeters(1800);
    const b = Height.fromCentimeters(180);
    const c = Height.fromMillimeters(1801);

    expect(a.equals(b)).toBe(true);
    expect(a.compare(b)).toBe(0);
    expect(c.compare(b)).toBe(1);
    expect(a.lessThan(c)).toBe(true);
    expect(c.greaterThan(b)).toBe(true);
    expect(Height.zero().isZero()).toBe(true);
  });

  test("guards invalid inputs", () => {
    expect(() => Height.fromCentimeters(-1)).toThrow(HeightMillimetersError.Invalid);
    expect(() => Height.fromMillimeters(Number.NaN)).toThrow(HeightMillimetersError.Type);
    expect(() => Height.fromMillimeters(Number.POSITIVE_INFINITY)).toThrow(HeightMillimetersError.Type);
  });
});
