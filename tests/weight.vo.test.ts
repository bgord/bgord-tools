import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DivisionFactor } from "../src/division-factor.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";
import { RoundingDecimalStrategy } from "../src/rounding-decimal.strategy";
import { RoundingUpStrategy } from "../src/rounding-up.strategy";
import { Weight } from "../src/weight.vo";
import { WeightGrams } from "../src/weight-grams.vo";

const twoDecimals = new RoundingDecimalStrategy(2);
const threeDecimals = new RoundingDecimalStrategy(3);

const factor = v.parse(DivisionFactor, 3);

describe("Weight", () => {
  test("fromKilograms", () => {
    expect(Weight.fromKilograms(0.1).get()).toEqual(v.parse(WeightGrams, 100));
    expect(Weight.fromKilograms(0.333).get()).toEqual(v.parse(WeightGrams, 333));
    expect(Weight.fromKilograms(20).get()).toEqual(v.parse(WeightGrams, 20_000));
  });

  test("fromGrams", () => {
    expect(Weight.fromGrams(5).get()).toEqual(v.parse(WeightGrams, 5));
  });

  test("guards invalid inputs", () => {
    expect(() => Weight.fromKilograms(-1)).toThrow("weight.grams.invalid");
  });

  test("toKilograms", () => {
    expect(Weight.fromKilograms(10, threeDecimals).toKilograms()).toEqual(10.0);
    expect(Weight.fromGrams(1500).toKilograms()).toEqual(1.5);
    expect(Weight.fromGrams(100).toKilograms()).toEqual(0.1);
  });

  test("format", () => {
    expect(Weight.fromKilograms(12.5, twoDecimals).format()).toEqual("12500 g");
  });

  test("operations", () => {
    const a = Weight.fromGrams(19_600);
    const b = a.add(Weight.fromKilograms(0.7));

    expect(b.get()).toEqual(v.parse(WeightGrams, 20_300));
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(2_000)).get()).toEqual(v.parse(WeightGrams, 0));
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(1_000)).get()).toEqual(v.parse(WeightGrams, 0));
    expect(Weight.fromGrams(1_001).multiply(v.parse(MultiplicationFactor, 0.5)).get()).toEqual(
      v.parse(WeightGrams, 501),
    );
    expect(Weight.fromGrams(1_999).divide(factor).get()).toEqual(v.parse(WeightGrams, 666));
  });

  test("rounding", () => {
    const up = new RoundingUpStrategy();
    const base = Weight.fromGrams(101, up);

    expect(base.divide(factor).divide(factor).get()).toEqual(v.parse(WeightGrams, 12));
    expect(base.add(Weight.zero()).divide(factor).get()).toEqual(v.parse(WeightGrams, 34));
    expect(base.multiply(v.parse(MultiplicationFactor, 0.5)).divide(factor).get()).toEqual(
      v.parse(WeightGrams, 17),
    );
  });

  test("equals", () => {
    const a = Weight.fromGrams(1800);
    const b = Weight.fromGrams(180);

    expect(a.equals(a)).toEqual(true);
    expect(a.equals(b)).toEqual(false);
  });

  test("isGreaterThan", () => {
    const a = Weight.fromGrams(1800);
    const b = Weight.fromGrams(180);

    expect(a.isGreaterThan(a)).toEqual(false);
    expect(a.isGreaterThan(b)).toEqual(true);
  });

  test("isSmallerThan", () => {
    const a = Weight.fromGrams(180);
    const b = Weight.fromGrams(1800);

    expect(a.isSmallerThan(a)).toEqual(false);
    expect(a.isSmallerThan(b)).toEqual(true);
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
