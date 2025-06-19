import { Mean } from "./mean.service";
import { PopulationStandardDeviation } from "./population-standard-deviation.service";
import { RoundingStrategy, RoundToDecimal } from "./rounding.service";

export class ZScore {
  private readonly mean: number;
  private readonly standardDeviation: number;

  constructor(
    values: number[],
    private readonly rounding: RoundingStrategy = new RoundToDecimal(2),
  ) {
    if (values.length < 2) {
      throw new Error("At least two values are needed");
    }

    this.mean = Mean.calculate(values);
    this.standardDeviation = PopulationStandardDeviation.calculate(values);
  }

  calculate(value: number): number {
    return this.rounding.round((value - this.mean) / this.standardDeviation);
  }
}
