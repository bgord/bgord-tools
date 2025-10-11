import { Mean } from "./mean.service";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

export const PopulationStandardDeviationError = {
  NotEnoughValues: "population.standard.deviation.not.enough.values",
} as const;

export class PopulationStandardDeviation {
  static calculate(values: number[], rounding: RoundingPort = new RoundToDecimal(2)): number {
    if (values.length < 2) throw new Error(PopulationStandardDeviationError.NotEnoughValues);

    const mean = Mean.calculate(values);
    const count = values.length;

    const squaredDifferences = values.map((value) => (value - mean) ** 2);

    const variance = Sum.of(squaredDifferences) / count;

    return rounding.round(Math.sqrt(variance));
  }
}
