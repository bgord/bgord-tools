import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

export const MeanError = { NotEnoughValues: "mean.not.enough.values" } as const;

export class Mean {
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToDecimal(2);

  static calculate(values: number[], rounding?: RoundingPort): number {
    if (values.length === 0) throw new Error(MeanError.NotEnoughValues);

    const sum = Sum.of(values);
    const mean = sum / values.length;

    return (rounding ?? Mean.DEFAULT_ROUNDING).round(mean);
  }
}
