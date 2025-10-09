import { ZScore } from "./z-score.service";

export const OutlierDetectorError = { NotEnoughValues: "outlier.detector.not.enough.values" } as const;

export class OutlierDetector {
  private readonly zScore: ZScore;
  private readonly threshold: number;

  constructor(values: number[], threshold: number) {
    if (values.length < 2) throw new Error(OutlierDetectorError.NotEnoughValues);

    this.zScore = new ZScore(values);
    this.threshold = Math.abs(threshold);
  }

  isInlier(value: number): boolean {
    const score = this.zScore.calculate(value);

    return Math.abs(score) <= this.threshold;
  }
}
