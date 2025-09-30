import { z } from "zod/v4";
import { type RoundingStrategy, RoundToDecimal } from "./rounding.service";

const FiniteNumericValue = z.number().refine(Number.isFinite, { message: "Expected a finite number" });
const NonNegativeNumericValue = FiniteNumericValue.min(0, { message: "Must be greater than or equal to 0" });
const PositiveNumericValue = FiniteNumericValue.gt(0, { message: "Must be greater than 0" });
const NonNegativeIntegerGrams = FiniteNumericValue.int().min(0, {
  message: "Grams must be an integer greater than or equal to 0",
});

export enum WeightUnit {
  kg = "kg",
  lb = "lb",
}

export class Weight {
  private static readonly GRAMS_PER_KILOGRAM = 1_000;
  private static readonly POUNDS_PER_KILOGRAM = 2.2046226218487757;
  private static readonly KILOGRAMS_PER_POUND = 1 / Weight.POUNDS_PER_KILOGRAM;

  private constructor(private readonly valueGrams: number) {}

  static fromKilograms(kilograms: number): Weight {
    NonNegativeNumericValue.parse(kilograms);
    const gramsRounded = Math.round(kilograms * Weight.GRAMS_PER_KILOGRAM);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  static fromPounds(pounds: number): Weight {
    NonNegativeNumericValue.parse(pounds);
    const gramsRounded = Math.round(pounds * Weight.KILOGRAMS_PER_POUND * Weight.GRAMS_PER_KILOGRAM);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  static fromGrams(grams: number): Weight {
    NonNegativeNumericValue.parse(grams);
    const gramsRounded = Math.round(grams);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  static zero(): Weight {
    return new Weight(0);
  }

  toGrams(): number {
    return this.valueGrams;
  }

  toKilograms(roundingStrategy?: RoundingStrategy): number {
    const kilograms = this.valueGrams / Weight.GRAMS_PER_KILOGRAM;
    return roundingStrategy ? roundingStrategy.round(kilograms) : kilograms;
  }

  toPounds(roundingStrategy?: RoundingStrategy): number {
    const pounds = (this.valueGrams / Weight.GRAMS_PER_KILOGRAM) * Weight.POUNDS_PER_KILOGRAM;
    return roundingStrategy ? roundingStrategy.round(pounds) : pounds;
  }

  rounded(roundingStrategy: RoundingStrategy, unit: WeightUnit): Weight {
    if (unit === WeightUnit.kg) {
      const roundedKilograms = NonNegativeNumericValue.parse(roundingStrategy.round(this.toKilograms()));
      const gramsRounded = Math.round(roundedKilograms * Weight.GRAMS_PER_KILOGRAM);
      NonNegativeIntegerGrams.parse(gramsRounded);
      return new Weight(gramsRounded);
    }

    const roundedPounds = NonNegativeNumericValue.parse(roundingStrategy.round(this.toPounds()));
    const gramsRounded = Math.round(roundedPounds * Weight.KILOGRAMS_PER_POUND * Weight.GRAMS_PER_KILOGRAM);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  format(unit: WeightUnit, options?: { rounding?: RoundingStrategy; trimTrailingZeros?: boolean }): string {
    const roundingStrategy = options?.rounding ?? new RoundToDecimal(2);

    const numericValue =
      unit === WeightUnit.kg ? this.toKilograms(roundingStrategy) : this.toPounds(roundingStrategy);

    const text = options?.trimTrailingZeros
      ? Number.parseFloat(numericValue.toString()).toString()
      : numericValue.toString();

    return `${text} ${unit}`;
  }

  add(other: Weight): Weight {
    return new Weight(this.valueGrams + other.valueGrams);
  }

  subtract(other: Weight): Weight {
    const next = this.valueGrams - other.valueGrams;
    return new Weight(next < 0 ? 0 : next);
  }

  multiply(factor: number): Weight {
    NonNegativeNumericValue.parse(factor);
    const gramsRounded = Math.round(this.valueGrams * factor);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  divideByScalar(divisor: number): Weight {
    PositiveNumericValue.parse(divisor);
    const gramsRounded = Math.round(this.valueGrams / divisor);
    NonNegativeIntegerGrams.parse(gramsRounded);
    return new Weight(gramsRounded);
  }

  equals(other: Weight): boolean {
    return this.valueGrams === other.valueGrams;
  }

  compare(other: Weight): -1 | 0 | 1 {
    if (this.valueGrams === other.valueGrams) return 0;
    return this.valueGrams < other.valueGrams ? -1 : 1;
  }

  greaterThan(other: Weight): boolean {
    return this.valueGrams > other.valueGrams;
  }

  greaterThanOrEqual(other: Weight): boolean {
    return this.valueGrams >= other.valueGrams;
  }

  lessThan(other: Weight): boolean {
    return this.valueGrams < other.valueGrams;
  }

  lessThanOrEqual(other: Weight): boolean {
    return this.valueGrams <= other.valueGrams;
  }

  isZero(): boolean {
    return this.valueGrams === 0;
  }

  isPositive(): boolean {
    return this.valueGrams > 0;
  }

  toJSON(): { g: number } {
    return { g: this.valueGrams };
  }

  static fromJSON(input: { g: number }): Weight {
    return Weight.fromGrams(input.g);
  }
}
