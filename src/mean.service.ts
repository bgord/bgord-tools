import { RoundingStrategy, RoundToDecimal } from "./rounding.service";
import { Sum } from "./sum.service";

export class Mean {
  static calculate(values: number[], rounding: RoundingStrategy = new RoundToDecimal(2)): number {
    if (values.length === 0) {
      throw new Error("Values should not be empty");
    }

    const mean = Sum.of(values) / values.length;

    return rounding.round(mean);
  }
}
