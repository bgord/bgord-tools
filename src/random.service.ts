type RandomGenerateConfigType = { min: number; max: number };

export const RandomError = { MinMax: "random.min.max" } as const;

export class Random {
  private static readonly DEFAULT_MIN = 0;
  private static readonly DEFAULT_MAX = 1;

  static generate(config?: RandomGenerateConfigType): number {
    const min = config ? config.min : Random.DEFAULT_MIN;
    const max = config ? config.max : Random.DEFAULT_MAX;

    if (min === max) throw new Error(RandomError.MinMax);
    if (min > max) throw new Error(RandomError.MinMax);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
