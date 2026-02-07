import { Mean } from "./mean.service";
import { PopulationStandardDeviation } from "./population-standard-deviation.service";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";

export const ZScoreError = { NotEnoughValues: "z.score.not.enough.values" };

export class ZScore {
  private readonly mean: number;
  private readonly standardDeviation: number;

  constructor(
    values: ReadonlyArray<number>,
    private readonly rounding: RoundingStrategy = new RoundingDecimalStrategy(2),
  ) {
    if (values.length < 2) throw new Error(ZScoreError.NotEnoughValues);

    this.mean = Mean.calculate(values);
    this.standardDeviation = PopulationStandardDeviation.calculate(values);
  }

  calculate(value: number): number {
    return this.rounding.round((value - this.mean) / this.standardDeviation);
  }
}
