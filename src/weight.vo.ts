import { z } from "zod/v4";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export enum WeightUnit {
  kg = "kg",
  lb = "lb",
}

export const WeightNonFiniteError = { error: "weight.non_finite" } as const;
export const WeightNegativeError = { error: "weight.negative" } as const;
export const WeightNonPositiveError = { error: "weight.non_positive" } as const;
export const WeightGramsNonNegativeError = { error: "weight.grams_non_negative" } as const;

const WeightQuantityNumber = z
  .number(WeightNonFiniteError)
  .refine(Number.isFinite, WeightNonFiniteError)
  .min(0, WeightNegativeError);

const DivisionScalarNumber = z
  .number(WeightNonFiniteError)
  .refine(Number.isFinite, WeightNonFiniteError)
  .gt(0, WeightNonPositiveError);

const CanonicalGramsInteger = z
  .number(WeightGramsNonNegativeError)
  .int(WeightGramsNonNegativeError)
  .min(0, WeightGramsNonNegativeError);

export class Weight {
  private static readonly GRAMS_PER_KILOGRAM = 1_000;
  private static readonly POUNDS_PER_KILOGRAM = 2.2046226218487757;
  private static readonly KILOGRAMS_PER_POUND = 1 / Weight.POUNDS_PER_KILOGRAM;

  private constructor(private readonly grams: number) {}

  static fromKilograms(kilograms: number): Weight {
    const kilogramsParsed = WeightQuantityNumber.parse(kilograms);
    const gramsRounded = Math.round(kilogramsParsed * Weight.GRAMS_PER_KILOGRAM);
    const grams = CanonicalGramsInteger.parse(gramsRounded);
    return new Weight(grams);
  }

  static fromPounds(pounds: number): Weight {
    const poundsParsed = WeightQuantityNumber.parse(pounds);
    const gramsRounded = Math.round(poundsParsed * Weight.KILOGRAMS_PER_POUND * Weight.GRAMS_PER_KILOGRAM);
    const grams = CanonicalGramsInteger.parse(gramsRounded);
    return new Weight(grams);
  }

  static fromGrams(grams: number): Weight {
    const gramsParsed = WeightQuantityNumber.parse(grams);
    const gramsRounded = Math.round(gramsParsed);
    const integerGrams = CanonicalGramsInteger.parse(gramsRounded);
    return new Weight(integerGrams);
  }

  static zero(): Weight {
    return new Weight(0);
  }

  toGrams(): number {
    return this.grams;
  }

  toKilograms(rounding?: RoundingPort): number {
    const kilograms = this.grams / Weight.GRAMS_PER_KILOGRAM;
    return rounding ? rounding.round(kilograms) : kilograms;
  }

  toPounds(rounding?: RoundingPort): number {
    const pounds = (this.grams / Weight.GRAMS_PER_KILOGRAM) * Weight.POUNDS_PER_KILOGRAM;
    return rounding ? rounding.round(pounds) : pounds;
  }

  format(unit: WeightUnit, rounding: RoundingPort = new RoundToDecimal(2)): string {
    const value = unit === WeightUnit.kg ? this.toKilograms(rounding) : this.toPounds(rounding);
    return `${value.toString()} ${unit}`;
  }

  add(other: Weight): Weight {
    return new Weight(this.grams + other.grams);
  }

  subtract(other: Weight): Weight {
    const result = this.grams - other.grams;
    return new Weight(result < 0 ? 0 : result);
  }

  multiply(factor: number): Weight {
    const factorParsed = WeightQuantityNumber.parse(factor);
    const gramsRounded = Math.round(this.grams * factorParsed);
    const grams = CanonicalGramsInteger.parse(gramsRounded);
    return new Weight(grams);
  }

  divideByScalar(divisor: number): Weight {
    const divisorParsed = DivisionScalarNumber.parse(divisor);
    const gramsRounded = Math.round(this.grams / divisorParsed);
    const grams = CanonicalGramsInteger.parse(gramsRounded);
    return new Weight(grams);
  }

  equals(other: Weight): boolean {
    return this.grams === other.grams;
  }

  compare(other: Weight): -1 | 0 | 1 {
    if (this.grams === other.grams) return 0;
    return this.grams < other.grams ? -1 : 1;
  }

  greaterThan(other: Weight): boolean {
    return this.grams > other.grams;
  }

  greaterThanOrEqual(other: Weight): boolean {
    return this.grams >= other.grams;
  }

  lessThan(other: Weight): boolean {
    return this.grams < other.grams;
  }

  lessThanOrEqual(other: Weight): boolean {
    return this.grams <= other.grams;
  }

  isZero(): boolean {
    return this.grams === 0;
  }

  isPositive(): boolean {
    return this.grams > 0;
  }

  toJSON(): { g: number } {
    return { g: this.grams };
  }

  static fromJSON(input: { g: number }): Weight {
    return Weight.fromGrams(input.g);
  }
}
