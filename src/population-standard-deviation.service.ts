import { Mean } from "./mean.service";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Sum } from "./sum.service";

export class PopulationStandardDeviation {
  static calculate(values: number[], rounding: RoundingPort = new RoundToDecimal(2)): number {
    if (values.length < 2) throw new Error("At least two values are needed");

    const mean = Mean.calculate(values);
    const n = values.length;

    const squaredDifferences = values.map((value) => (value - mean) ** 2);
    const sumOfSquaredDifferences = Sum.of(squaredDifferences);

    const variance = sumOfSquaredDifferences / n;

    return rounding.round(Math.sqrt(variance));
  }
}
