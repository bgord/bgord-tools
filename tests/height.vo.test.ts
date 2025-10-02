import { describe, expect, test } from "bun:test";
import { Height, HeightUnit } from "../src/height.vo";
import { RoundDown, RoundToDecimal, RoundToNearest, RoundUp } from "../src/rounding.adapter";

describe("Height VO (millimeters canonical)", () => {
  test("creates from centimeters and stores integer millimeters using strategy", () => {
    expect(Height.fromCentimeters(180).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.04, new RoundDown()).toMillimeters()).toBe(1800);
    expect(Height.fromCentimeters(180.06, new RoundUp()).toMillimeters()).toBe(1801);
  });

  test("creates from feet+inches (inches can be fractional) and stores integer millimeters", () => {
    expect(Height.fromFeetInches(5, 11).toMillimeters()).toBe(1803);
    expect(Height.fromFeetInches(6, 0).toMillimeters()).toBe(1829);
  });

  test("creates from millimeters with configurable rounding", () => {
    expect(Height.fromMillimeters(1799.6, new RoundToNearest()).toMillimeters()).toBe(1800);
    expect(Height.fromMillimeters(1799.6, new RoundDown()).toMillimeters()).toBe(1799);
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

  test("converts to feet+inches with a SINGLE rounding step", () => {
    expect(Height.fromCentimeters(180).toFeetInches(new RoundToNearest())).toEqual({ feet: 5, inches: 11 });
    expect(Height.fromMillimeters(70.9 * 25.4).toFeetInches(new RoundDown())).toEqual({
      feet: 5,
      inches: 10,
    });
    expect(Height.fromMillimeters(70.1 * 25.4).toFeetInches(new RoundUp())).toEqual({ feet: 5, inches: 11 });
  });

  test("toFeetInches throws if rounding strategy does not produce an integer inches count", () => {
    expect(() => Height.fromCentimeters(180).toFeetInches(new RoundToDecimal(1))).toThrow();
  });

  test("formats centimeters using default RoundToDecimal(1)", () => {
    expect(Height.fromMillimeters(1804).format(HeightUnit.cm)).toBe("180.4 cm");
    expect(Height.fromCentimeters(180).format(HeightUnit.cm)).toBe("180 cm");
  });

  test("formats feet+inches using default RoundToNearest (whole inches)", () => {
    expect(Height.fromCentimeters(180).format(HeightUnit.ft_in)).toBe("5′11″");
  });

  test("formats ft_in with custom rounding (floor)", () => {
    expect(Height.fromMillimeters(70.9 * 25.4).format(HeightUnit.ft_in, new RoundDown())).toBe("5′10″");
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

  test("serializes/deserializes via millimeters", () => {
    const original = Height.fromMillimeters(1829);
    const restored = Height.fromJSON(original.toJSON());
    expect(restored.equals(original)).toBe(true);
  });

  test("guards invalid inputs", () => {
    expect(() => Height.fromCentimeters(-1)).toThrow();
    expect(() => Height.fromFeetInches(-1, 0)).toThrow();
    expect(() => Height.fromFeetInches(5, -2)).toThrow();
    expect(() => Height.fromMillimeters(Number.NaN)).toThrow();
    expect(() => Height.fromMillimeters(Number.POSITIVE_INFINITY)).toThrow();
  });
});
