import { describe, expect, test } from "bun:test";
import { RoundToDecimal } from "../src/rounding.service";
import { Weight, WeightUnit } from "../src/weight.vo";

const oneDecimal = new RoundToDecimal(1);
const twoDecimals = new RoundToDecimal(2);
const threeDecimals = new RoundToDecimal(3);

describe("Weight VO (grams canonical)", () => {
  test("creates from kilograms and stores exact integer grams", () => {
    expect(Weight.fromKilograms(0.1).toGrams()).toBe(100);
    expect(Weight.fromKilograms(0.333).toGrams()).toBe(333);
    expect(Weight.fromKilograms(20).toGrams()).toBe(20_000);
  });

  test("creates from pounds and stores exact integer grams", () => {
    expect(Weight.fromPounds(44.092).toGrams()).toBe(20_000);
  });

  test("creates from grams and coerces to nearest integer gram", () => {
    expect(Weight.fromGrams(1999.6).toGrams()).toBe(2_000);
    expect(Weight.fromGrams(1999.4).toGrams()).toBe(1_999);
  });

  test("converts to kilograms/pounds with optional rounding strategy", () => {
    expect(Weight.fromKilograms(10).toKilograms(threeDecimals)).toBe(10.0);
    expect(Weight.fromKilograms(10).toPounds(threeDecimals)).toBe(22.046);
  });

  test("format() returns human strings with strategy, thinSpace and trim options", () => {
    const weight = Weight.fromKilograms(12.5);
    expect(weight.format(WeightUnit.kg, twoDecimals)).toBe("12.5 kg");
    expect(weight.format(WeightUnit.lb, oneDecimal)).toBe("27.6 lb");
  });

  test("arithmetic: add/subtract/multiply/divide keep integer grams invariant", () => {
    const a = Weight.fromGrams(19_600);
    const b = a.add(Weight.fromKilograms(0.7));

    expect(b.toGrams()).toBe(20_300);
    expect(Weight.fromGrams(1_000).subtract(Weight.fromGrams(2_000)).toGrams()).toBe(0);
    expect(Weight.fromGrams(1_001).multiply(0.5).toGrams()).toBe(501);
    expect(Weight.fromGrams(1_999).divideByScalar(3).toGrams()).toBe(666);
  });

  test("comparisons and predicates use exact integer grams", () => {
    const x = Weight.fromGrams(10_000);
    const y = Weight.fromKilograms(10);
    const z = Weight.fromGrams(10_001);

    expect(x.equals(y)).toBe(true);
    expect(x.compare(y)).toBe(0);
    expect(z.compare(y)).toBe(1);
    expect(x.lessThan(z)).toBe(true);
    expect(z.greaterThanOrEqual(y)).toBe(true);
    expect(Weight.zero().isZero()).toBe(true);
    expect(Weight.fromGrams(1).isPositive()).toBe(true);
  });

  test("serializes/deserializes via grams", () => {
    const original = Weight.fromGrams(77_500);
    const json = original.toJSON();
    const restored = Weight.fromJSON(json);
    expect(restored.equals(original)).toBe(true);
  });

  test("guards invalid inputs (negative, NaN, Infinity, zero/negative divisors)", () => {
    expect(() => Weight.fromKilograms(-1)).toThrow();
    expect(() => Weight.fromPounds(Number.POSITIVE_INFINITY)).toThrow();
    expect(() => Weight.fromGrams(Number.NaN)).toThrow();
    expect(() => Weight.fromGrams(1_000).divideByScalar(0)).toThrow();
    expect(() => Weight.fromGrams(1_000).divideByScalar(-2)).toThrow();
    expect(() => Weight.fromGrams(1_000).multiply(-1)).toThrow();
  });

  test("rounding strategies are used only for read, not storage", () => {
    const weight = Weight.fromKilograms(20.3333);
    expect(weight.toGrams()).toBe(20_333);
    expect(weight.toKilograms(twoDecimals)).toBe(20.33);
  });
});
