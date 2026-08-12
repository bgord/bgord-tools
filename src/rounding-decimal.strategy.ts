import * as v from "valibot";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimal } from "./rounding-decimal.vo";

export class RoundingDecimalStrategy implements RoundingStrategy {
  private readonly decimals: number;

  constructor(candidate: number) {
    this.decimals = v.parse(RoundingDecimal, candidate);
  }

  round(value: number): number {
    return Number.parseFloat(value.toFixed(this.decimals));
  }
}
