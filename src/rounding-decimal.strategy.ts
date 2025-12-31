import { z } from "zod/v4";
import type { RoundingStrategy } from "./rounding.strategy";

export const RoundingDecimalError = { Type: "rounding.decimal.type", Invalid: "rounding.decimal.invalid" };

// Stryker disable all
export const RoundingDecimal = z
  // Stryker restore all
  .number(RoundingDecimalError.Type)
  .int(RoundingDecimalError.Invalid)
  .min(1, RoundingDecimalError.Invalid)
  .max(100, RoundingDecimalError.Invalid)
  .brand("RoundingDecimal");

export class RoundingDecimalStrategy implements RoundingStrategy {
  private readonly decimals: number;

  constructor(candidate: number) {
    this.decimals = RoundingDecimal.parse(candidate);
  }

  round(value: number): number {
    return Number.parseFloat(value.toFixed(this.decimals));
  }
}
