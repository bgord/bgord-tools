type RandomGenerateConfigType = { min: number; max: number };

export const RandomMinNotIntegerError = "random.min.not.integer" as const;
export const RandomMaxNotIntegerError = "random.max.not.integer" as const;
export const RandomMinEqualsMaxError = "random.min.equals.max" as const;
export const RandomMinGreaterThanMaxError = "random.min.greater.than.max" as const;

export class Random {
  private static readonly DEFAULT_MIN = 0;
  private static readonly DEFAULT_MAX = 1;

  static generate(config?: RandomGenerateConfigType): number {
    const min = config ? config.min : Random.DEFAULT_MIN;
    const max = config ? config.max : Random.DEFAULT_MAX;

    if (!Number.isInteger(min)) throw new Error(RandomMinNotIntegerError);
    if (!Number.isInteger(max)) throw new Error(RandomMaxNotIntegerError);
    if (min === max) throw new Error(RandomMinEqualsMaxError);
    if (min > max) throw new Error(RandomMinGreaterThanMaxError);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
