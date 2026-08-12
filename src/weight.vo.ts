import * as v from "valibot";
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

    return new Weight(v.parse(WeightGrams, grams), rounding);
  }

  static fromGrams(grams: number, rounding: RoundingStrategy = new RoundingToNearestStrategy()): Weight {
    return new Weight(v.parse(WeightGrams, grams), rounding);
  }

  static zero(): Weight {
    return new Weight(v.parse(WeightGrams, 0));
  }

  get(): WeightGramsType {
    return this.grams;
  }

  toKilograms(): number {
    return this.grams / Weight.GRAMS_PER_KILOGRAM;
  }

  format(): string {
    return `${this.grams} g`;
  }

  add(other: Weight): Weight {
    return new Weight(v.parse(WeightGrams, this.grams + other.grams), this.rounding);
  }

  subtract(other: Weight): Weight {
    const result = this.grams - other.grams;

    return new Weight(v.parse(WeightGrams, Math.max(0, result)), this.rounding);
  }

  multiply(factor: MultiplicationFactorType): Weight {
    const grams = this.rounding.round(this.grams * factor);

    return new Weight(v.parse(WeightGrams, grams), this.rounding);
  }

  divide(divisor: DivisionFactorType): Weight {
    const grams = this.rounding.round(this.grams / divisor);

    return new Weight(v.parse(WeightGrams, grams), this.rounding);
  }

  equals(other: Weight): boolean {
    return this.grams === other.grams;
  }

  isGreaterThan(other: Weight): boolean {
    return this.grams > other.grams;
  }

  isSmallerThan(other: Weight): boolean {
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
