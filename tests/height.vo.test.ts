import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Height } from "../src/height.vo";
import { HeightMillimeters } from "../src/height-millimeters.vo";
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
    expect(Height.fromMillimetersSafe(v.parse(HeightMillimeters, 100)).toMillimeters()).toEqual(100);
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
    expect(height.toCentimeters()).toEqual(180);
    expect(Height.fromMillimeters(1804).toCentimeters()).toEqual(180.4);
  });

  test("equals", () => {
    const a = Height.fromCentimeters(1800);
    const b = Height.fromCentimeters(180);

    expect(a.equals(a)).toEqual(true);
    expect(a.equals(b)).toEqual(false);
  });

  test("isGreaterThan", () => {
    const a = Height.fromCentimeters(1800);
    const b = Height.fromCentimeters(180);

    expect(a.isGreaterThan(a)).toEqual(false);
    expect(a.isGreaterThan(b)).toEqual(true);
  });

  test("isSmallerThan", () => {
    const a = Height.fromCentimeters(180);
    const b = Height.fromCentimeters(1800);

    expect(a.isSmallerThan(a)).toEqual(false);
    expect(a.isSmallerThan(b)).toEqual(true);
  });

  test("isZero", () => {
    expect(Height.zero().isZero()).toEqual(true);
    expect(Height.fromCentimeters(180).isZero()).toEqual(false);
  });

  test("get", () => {
    expect(Height.fromMillimeters(1804).get()).toEqual(v.parse(HeightMillimeters, 1804));
  });

  test("toString", () => {
    expect(Height.fromMillimeters(1804).toString()).toEqual("1804");
  });

  test("toJSON", () => {
    expect(Height.fromMillimeters(1804).toJSON()).toEqual(1804);
  });
});
