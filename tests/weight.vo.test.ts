import { describe, expect, test } from "bun:test";
import { DivisionFactor } from "../src/division-factor.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";
import { RoundingDecimalStrategy } from "../src/rounding-decimal.strategy";
import { Weight } from "../src/weight.vo";

const twoDecimals = new RoundingDecimalStrategy(2);
const threeDecimals = new RoundingDecimalStrategy(3);

describe("Weight", () => {
  test("fromKilograms", () => {
    expect(Weight.fromKilograms(0.1).get()).toEqual(100);
    expect(Weight.fromKilograms(0.333).get()).toEqual(333);
    expect(Weight.fromKilograms(20).get()).toEqual(20_000);
  });

  test("fromGrams", () => {
    expect(Weight.fromGrams(5).get()).toEqual(5);
  });

  test("guards invalid inputs", () => {
    expect(() => Weight.fromKilograms(-1)).toThrow("weight.grams.invalid");
  });

  test("toKilograms", () => {
    expect(Weight.fromKilograms(10, threeDecimals).toKilograms()).toEqual(10.0);
  });

  test("format", () => {
    expect(Weight.fromKilograms(12.5, twoDecimals).format()).toEqual("12500 g");
  });

  test("operations", () => {
    const a = Weight.fromGrams(19_600);
    const b = a.add(Weight.fromKilograms(0.7));

    expect(b.get()).toEqual(20_300);
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(2_000)).get()).toEqual(0);
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(1_000)).get()).toEqual(0);
    expect(Weight.fromGrams(1_001).multiply(MultiplicationFactor.parse(0.5)).get()).toEqual(501);
    expect(Weight.fromGrams(1_999).divide(DivisionFactor.parse(3)).get()).toEqual(666);
  });

  test("equals", () => {
    const a = Weight.fromGrams(1800);
    const b = Weight.fromGrams(180);

    expect(a.equals(a)).toEqual(true);
    expect(a.equals(b)).toEqual(false);
  });

  test("greaterThan", () => {
    const a = Weight.fromGrams(1800);
    const b = Weight.fromGrams(180);

    expect(a.greaterThan(a)).toEqual(false);
    expect(a.greaterThan(b)).toEqual(true);
  });

  test("lessThan", () => {
    const a = Weight.fromGrams(180);
    const b = Weight.fromGrams(1800);

    expect(a.lessThan(a)).toEqual(false);
    expect(a.lessThan(b)).toEqual(true);
  });

  test("isZero", () => {
    const a = Weight.fromGrams(10);

    expect(Weight.zero().isZero()).toEqual(true);
    expect(a.isZero()).toEqual(false);
  });

  test("toString", () => {
    expect(Weight.fromGrams(1804).toString()).toEqual("1804 g");
  });

  test("toJSON", () => {
    expect(Weight.fromGrams(1804).toJSON()).toEqual(1804);
  });
});
