import { describe, expect, test } from "bun:test";
import { DivisionFactor } from "../src/division-factor.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";
import { RoundToDecimal } from "../src/rounding.adapter";
import { Weight } from "../src/weight.vo";
import { WeightGramsError } from "../src/weight-grams.vo";

const twoDecimals = new RoundToDecimal(2);
const threeDecimals = new RoundToDecimal(3);

describe("Weight", () => {
  test("creates from kilograms", () => {
    expect(Weight.fromKilograms(0.1).toGrams()).toEqual(100);
    expect(Weight.fromKilograms(0.333).toGrams()).toEqual(333);
    expect(Weight.fromKilograms(20).toGrams()).toEqual(20_000);
  });

  test("converts to kilograms", () => {
    expect(Weight.fromKilograms(10, threeDecimals).toKilograms()).toEqual(10.0);
  });

  test("format", () => {
    expect(Weight.fromKilograms(12.5, twoDecimals).format()).toEqual("12.5 kg");
  });

  test("add/subtract/multiply/divide", () => {
    const a = Weight.fromGrams(19_600);
    const b = a.add(Weight.fromKilograms(0.7));

    expect(b.toGrams()).toEqual(20_300);
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(2_000)).toGrams()).toEqual(0);
    expect(Weight.fromGrams(1_001).multiply(MultiplicationFactor.parse(0.5)).toGrams()).toEqual(501);
    expect(Weight.fromGrams(1_999).divide(DivisionFactor.parse(3)).toGrams()).toEqual(666);
  });

  test("comparisons and predicates use exact integer grams", () => {
    const x = Weight.fromGrams(10_000);
    const y = Weight.fromKilograms(10);
    const z = Weight.fromGrams(10_001);

    expect(x.equals(y)).toEqual(true);
    expect(x.compare(y)).toEqual(0);
    expect(z.compare(y)).toEqual(1);
    expect(x.lessThan(z)).toEqual(true);
    expect(z.greaterThanOrEqual(y)).toEqual(true);
    expect(Weight.zero().isZero()).toEqual(true);
  });

  test("guards invalid inputs", () => {
    expect(() => Weight.fromKilograms(-1)).toThrow(WeightGramsError.Invalid);
  });
});
