export class Sum {
  static of(values: readonly number[]): number {
    return values.reduce((sum, x) => sum + x, 0);
  }

  static precise(values: readonly number[]): number {
    let sum = 0;
    let compensation = 0;

    for (const value of values) {
      const adjusted = value - compensation;
      const temporary = sum + adjusted;
      compensation = temporary - sum - adjusted;
      sum = temporary;
    }

    return sum;
  }
}
