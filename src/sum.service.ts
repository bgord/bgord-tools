export class Sum {
  static of(values: readonly number[]): number {
    return values.reduce((sum, x) => sum + x, 0);
  }

  static precise(values: readonly number[]): number {
    let runningTotal = 0;
    let roundingCompensation = 0;

    for (const currentValue of values) {
      const correctedAddend = currentValue - roundingCompensation;
      const tentativeTotal = runningTotal + correctedAddend;
      roundingCompensation = tentativeTotal - runningTotal - correctedAddend;
      runningTotal = tentativeTotal;
    }

    return runningTotal;
  }
}
