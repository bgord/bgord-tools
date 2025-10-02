import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export type SLRPairType = { x: number; y: number };
export type SLRParamsType = { a: number; b: number };
export type SLRPredictionType = number;

export const SLRMinPairsError = "slr.min.pairs" as const;
export const SLRSumXTooBigError = "slr.sum.x.too.big" as const;
export const SLRSumYTooBigError = "slr.sum.y.too.big" as const;
export const SLRSumXSquaredTooBigError = "slr.sum.x.squared.too.big" as const;
export const SLRSumXTimesYTooBigError = "slr.sum.x.times.y.too.big" as const;
export const SLRModelCreationError = "slr.model.creation" as const;

export class SimpleLinearRegression {
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToNearest();

  private readonly params: SLRParamsType;
  private readonly rounding: RoundingPort;

  constructor(params: SLRParamsType, rounding?: RoundingPort) {
    this.params = params;
    this.rounding = rounding ?? SimpleLinearRegression.DEFAULT_ROUNDING;
  }

  static fromPairs(pairs: SLRPairType[], rounding?: RoundingPort): SimpleLinearRegression {
    const count = pairs.length;
    if (count < 2) throw new Error(SLRMinPairsError);

    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumXY = 0;

    for (let index = 0; index < count; index++) {
      const pair = pairs[index];
      sumX += pair.x;
      sumY += pair.y;
      sumXX += pair.x * pair.x;
      sumXY += pair.x * pair.y;
    }

    if (Math.abs(sumX) >= Number.MAX_SAFE_INTEGER) throw new Error(SLRSumXTooBigError);
    if (Math.abs(sumY) >= Number.MAX_SAFE_INTEGER) throw new Error(SLRSumYTooBigError);
    if (Math.abs(sumXY) >= Number.MAX_SAFE_INTEGER) throw new Error(SLRSumXTimesYTooBigError);
    if (Math.abs(sumXX) >= Number.MAX_SAFE_INTEGER) throw new Error(SLRSumXSquaredTooBigError);

    const bDenominator = sumXX - sumX ** 2 / count;
    if (bDenominator === 0) throw new Error(SLRModelCreationError);

    const b = (sumXY - (sumX * sumY) / count) / bDenominator;
    const a = (sumY - b * sumX) / count;

    return new SimpleLinearRegression({ a, b }, rounding);
  }

  predict(x: SLRPairType["x"], rounding?: RoundingPort): SLRPredictionType {
    const chosenRounding = rounding ?? this.rounding;
    const prediction = this.params.b * x + this.params.a;
    return chosenRounding.round(prediction);
  }

  inspect(): SimpleLinearRegression["params"] {
    return this.params;
  }
}
