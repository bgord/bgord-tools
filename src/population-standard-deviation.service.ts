import { Mean } from "./mean.service";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";
import { Sum } from "./sum.service";

export const PopulationStandardDeviationError = {
  NotEnoughValues: "population.standard.deviation.not.enough.values",
};

export class PopulationStandardDeviation {
  static calculate(values: number[], rounding: RoundingStrategy = new RoundingDecimalStrategy(2)): number {
    if (values.length < 2) throw new Error(PopulationStandardDeviationError.NotEnoughValues);

    const mean = Mean.calculate(values);
    const count = values.length;

    const squaredDifferences = values.map((value) => (value - mean) ** 2);

    const variance = Sum.of(squaredDifferences) / count;

    return rounding.round(Math.sqrt(variance));
  }
}
