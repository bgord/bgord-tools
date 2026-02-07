import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";
import { Sum } from "./sum.service";

export const MeanError = { NotEnoughValues: "mean.not.enough.values" };

export class Mean {
  private static readonly DEFAULT_ROUNDING: RoundingStrategy = new RoundingDecimalStrategy(2);

  static calculate(values: ReadonlyArray<number>, rounding?: RoundingStrategy): number {
    if (values.length === 0) throw new Error(MeanError.NotEnoughValues);

    const sum = Sum.of(values);
    const mean = sum / values.length;

    return (rounding ?? Mean.DEFAULT_ROUNDING).round(mean);
  }
}
