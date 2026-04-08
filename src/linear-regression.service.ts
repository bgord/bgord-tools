import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export type LinearRegressionPairType = { x: number; y: number };
export type LinearRegressionParamsType = { a: number; b: number };
export type LinearRegressionPredictionType = number;

export const LinearRegressionError = {
  MinPairs: "linear.regression.min.pairs",
  SumXTooBig: "linear.regression.sum.x.too.big",
  SumYTooBig: "linear.regression.sum.y.too.big",
  SumXSquaredTooBig: "linear.regression.sum.x.squared.too.big",
  SumXTimesYTooBig: "linear.regression.sum.x.times.y.too.big",
  ModelCreation: "linear.regression.model.creation",
};

export class LinearRegression {
  private static readonly DEFAULT_ROUNDING: RoundingStrategy = new RoundingToNearestStrategy();

  private readonly params: LinearRegressionParamsType;
  private readonly rounding: RoundingStrategy;

  constructor(params: LinearRegressionParamsType, rounding?: RoundingStrategy) {
    this.params = params;
    this.rounding = rounding ?? LinearRegression.DEFAULT_ROUNDING;
  }

  static fromPairs(
    pairs: ReadonlyArray<LinearRegressionPairType>,
    rounding?: RoundingStrategy,
  ): LinearRegression {
    const count = pairs.length;

    if (count < 2) throw new Error(LinearRegressionError.MinPairs);

    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumXY = 0;

    for (let index = 0; index < count; index++) {
      // biome-ignore lint: lint/style/noNonNullAssertion
      const pair = pairs[index]!;
      sumX += pair.x;
      sumY += pair.y;
      sumXX += pair.x * pair.x;
      sumXY += pair.x * pair.y;
    }

    if (Math.abs(sumX) >= Number.MAX_SAFE_INTEGER) throw new Error(LinearRegressionError.SumXTooBig);
    if (Math.abs(sumY) >= Number.MAX_SAFE_INTEGER) throw new Error(LinearRegressionError.SumYTooBig);
    // Stryker disable all
    if (Math.abs(sumXY) >= Number.MAX_SAFE_INTEGER) throw new Error(LinearRegressionError.SumXTimesYTooBig);
    if (Math.abs(sumXX) >= Number.MAX_SAFE_INTEGER) throw new Error(LinearRegressionError.SumXSquaredTooBig);
    // Stryker restore all

    const bDenominator = sumXX - sumX ** 2 / count;

    if (bDenominator === 0) throw new Error(LinearRegressionError.ModelCreation);

    const b = (sumXY - (sumX * sumY) / count) / bDenominator;
    const a = (sumY - b * sumX) / count;

    return new LinearRegression({ a, b }, rounding);
  }

  predict(x: LinearRegressionPairType["x"], rounding?: RoundingStrategy): LinearRegressionPredictionType {
    const chosen = rounding ?? this.rounding;
    const prediction = this.params.b * x + this.params.a;

    return chosen.round(prediction);
  }

  inspect(): LinearRegression["params"] {
    return this.params;
  }
}
