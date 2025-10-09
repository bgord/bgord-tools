import { z } from "zod/v4";
import type { RoundingPort } from "./rounding.port";

export class RoundToNearest implements RoundingPort {
  round(value: number): number {
    return Math.round(value);
  }
}

export class RoundUp implements RoundingPort {
  round(value: number): number {
    return Math.ceil(value);
  }
}

export class RoundDown implements RoundingPort {
  round(value: number): number {
    return Math.floor(value);
  }
}

export const RoundingDecimalError = {
  Type: "rounding.decimal.type",
  Invalid: "rounding.decimal.invalid",
} as const;

export const RoundingDecimal = z
  .number(RoundingDecimalError.Type)
  .int(RoundingDecimalError.Invalid)
  .min(1, RoundingDecimalError.Invalid)
  .max(100, RoundingDecimalError.Invalid)
  .brand("RoundingDecimal");

export class RoundToDecimal implements RoundingPort {
  private readonly decimals: number;

  constructor(candidate: number) {
    this.decimals = RoundingDecimal.parse(candidate);
  }

  round(value: number): number {
    return Number.parseFloat(value.toFixed(this.decimals));
  }
}
