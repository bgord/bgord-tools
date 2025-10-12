import type { DivisionFactorType } from "./division-factor.vo";
import type { MultiplicationFactorType } from "./multiplication-factor.vo";
import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { WeightGrams } from "./weight-grams.vo";

export class Weight {
  private static readonly GRAMS_PER_KILOGRAM = 1_000;

  private constructor(
    private readonly grams: number,
    private readonly rounding: RoundingPort = new RoundToNearest(),
  ) {}

  static fromKilograms(kilograms: number, rounding: RoundingPort = new RoundToNearest()): Weight {
    const grams = rounding.round(kilograms * Weight.GRAMS_PER_KILOGRAM);

    return new Weight(WeightGrams.parse(grams), rounding);
  }

  static fromGrams(grams: number, rounding: RoundingPort = new RoundToNearest()): Weight {
    return new Weight(WeightGrams.parse(grams), rounding);
  }

  static zero(): Weight {
    return new Weight(0);
  }

  toGrams(): number {
    return this.grams;
  }

  toKilograms(): number {
    const kilograms = this.grams / Weight.GRAMS_PER_KILOGRAM;

    return this.rounding.round(kilograms);
  }

  format(): string {
    return `${this.toKilograms()} kg`;
  }

  add(other: Weight): Weight {
    return new Weight(this.grams + other.grams);
  }

  subtract(other: Weight): Weight {
    const result = this.grams - other.grams;

    return new Weight(result < 0 ? 0 : result);
  }

  multiply(factor: MultiplicationFactorType): Weight {
    const grams = this.rounding.round(this.grams * factor);

    return new Weight(WeightGrams.parse(grams));
  }

  divide(divisor: DivisionFactorType): Weight {
    const grams = this.rounding.round(this.grams / divisor);

    return new Weight(WeightGrams.parse(grams));
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

  toJSON(): { g: number } {
    return { g: this.grams };
  }
}
