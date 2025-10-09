import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

// TODO
export const MeanEmptyValuesError = "mean.values.empty" as const;

export class Mean {
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToDecimal(2);

  static calculate(values: number[], rounding?: RoundingPort): number {
    if (values.length === 0) throw new Error(MeanEmptyValuesError);

    const sum = Sum.of(values);
    const mean = sum / values.length;

    const chosen = rounding ?? Mean.DEFAULT_ROUNDING;

    return chosen.round(mean);
  }
}
