import * as v from "valibot";
import type { RoundingStrategy } from "./rounding.strategy";

export const RoundingDecimalError = { Type: "rounding.decimal.type", Invalid: "rounding.decimal.invalid" };

export const RoundingDecimal = v.pipe(
  v.number(RoundingDecimalError.Type),
  v.integer(RoundingDecimalError.Invalid),
  v.minValue(1, RoundingDecimalError.Invalid),
  v.maxValue(100, RoundingDecimalError.Invalid),
  v.brand("RoundingDecimal"),
);

export class RoundingDecimalStrategy implements RoundingStrategy {
  private readonly decimals: number;

  constructor(candidate: number) {
    this.decimals = v.parse(RoundingDecimal, candidate);
  }

  round(value: number): number {
    return Number.parseFloat(value.toFixed(this.decimals));
  }
}
