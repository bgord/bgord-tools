import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export const PercentageError = {
  InvalidNumerator: "percentage.invalid.numerator",
  InvalidDenominator: "percentage.invalid.denominator",
};

export class Percentage {
  static of(
    numerator: number,
    denominator: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): number {
    if (!Number.isFinite(numerator)) throw new Error(PercentageError.InvalidNumerator);
    if (!Number.isFinite(denominator) || denominator === 0) {
      throw new Error(PercentageError.InvalidDenominator);
    }

    return rounding.round((numerator / denominator) * 100);
  }
}
