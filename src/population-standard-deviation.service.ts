import { Mean } from "./mean.service";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

// TODO
export const PopulationStandardDeviationMinValuesError = "population.standard.deviation.min.values" as const;

export class PopulationStandardDeviation {
  static calculate(values: number[], rounding: RoundingPort = new RoundToDecimal(2)): number {
    if (values.length < 2) throw new Error(PopulationStandardDeviationMinValuesError);

    const mean = Mean.calculate(values);
    const count = values.length;

    const squaredDifferences = values.map((value) => (value - mean) ** 2);
    const sumOfSquaredDifferences = Sum.of(squaredDifferences);

    const variance = sumOfSquaredDifferences / count;

    return rounding.round(Math.sqrt(variance));
  }
}
