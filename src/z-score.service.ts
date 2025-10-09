import { Mean } from "./mean.service";
import { PopulationStandardDeviation } from "./population-standard-deviation.service";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export const ZScoreError = { NotEnoughValues: "z.score.not.enough.values" } as const;

export class ZScore {
  private readonly mean: number;
  private readonly standardDeviation: number;

  constructor(
    values: number[],
    private readonly rounding: RoundingPort = new RoundToDecimal(2),
  ) {
    if (values.length < 2) throw new Error(ZScoreError.NotEnoughValues);

    this.mean = Mean.calculate(values);
    this.standardDeviation = PopulationStandardDeviation.calculate(values);
  }

  calculate(value: number): number {
    return this.rounding.round((value - this.mean) / this.standardDeviation);
  }
}
