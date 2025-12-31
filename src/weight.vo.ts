import type { DivisionFactorType } from "./division-factor.vo";
import type { MultiplicationFactorType } from "./multiplication-factor.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";
import { WeightGrams, type WeightGramsType } from "./weight-grams.vo";

export class Weight {
  private static readonly GRAMS_PER_KILOGRAM = 1_000;

  private constructor(
    private readonly grams: WeightGramsType,
    private readonly rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ) {}

  static fromKilograms(
    kilograms: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Weight {
    const grams = rounding.round(kilograms * Weight.GRAMS_PER_KILOGRAM);

    return new Weight(WeightGrams.parse(grams), rounding);
  }

  static fromGrams(grams: number, rounding: RoundingStrategy = new RoundingToNearestStrategy()): Weight {
    return new Weight(WeightGrams.parse(grams), rounding);
  }

  static zero(): Weight {
    return new Weight(WeightGrams.parse(0));
  }

  get(): number {
    return this.grams;
  }

  toKilograms(): number {
    const kilograms = this.grams / Weight.GRAMS_PER_KILOGRAM;

    return this.rounding.round(kilograms);
  }

  format(): string {
    return `${this.grams} g`;
  }

  add(other: Weight): Weight {
    return new Weight(WeightGrams.parse(this.grams + other.grams));
  }

  subtract(other: Weight): Weight {
    const result = this.grams - other.grams;

    return new Weight(WeightGrams.parse(result <= 0 ? 0 : result));
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

  greaterThan(other: Weight): boolean {
    return this.grams > other.grams;
  }

  lessThan(other: Weight): boolean {
    return this.grams < other.grams;
  }

  isZero(): boolean {
    return this.grams === 0;
  }

  toString(): string {
    return this.format();
  }

  toJSON(): number {
    return this.grams;
  }
}
