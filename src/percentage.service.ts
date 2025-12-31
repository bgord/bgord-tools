import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export const PercentageError = { InvalidDenominator: "percentage.invalid.denominator" };

export class Percentage {
  static of(
    numerator: number,
    denominator: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): number {
    if (denominator === 0) throw new Error(PercentageError.InvalidDenominator);
    return rounding.round((numerator / denominator) * 100);
  }
}
