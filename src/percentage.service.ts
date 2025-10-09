import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

// TODO
export const PercentageInvalidDenominatorError = "percentage.invalid.denominator" as const;

export class Percentage {
  static of(numerator: number, denominator: number, rounding: RoundingPort = new RoundToNearest()): number {
    if (denominator === 0) throw new Error(PercentageInvalidDenominatorError);
    if (numerator === 0) return 0;
    return rounding.round((numerator / denominator) * 100);
  }
}
