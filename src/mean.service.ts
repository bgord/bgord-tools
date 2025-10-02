import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

export class Mean {
  static calculate(values: number[], rounding: RoundingPort = new RoundToDecimal(2)): number {
    if (values.length === 0) throw new Error("Values should not be empty");

    const mean = Sum.of(values) / values.length;

    return rounding.round(mean);
  }
}
