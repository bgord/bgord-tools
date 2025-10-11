import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

type MinMaxScalerValueType = number;

type MinMaxScalerConfigType = {
  min: MinMaxScalerValueType;
  max: MinMaxScalerValueType;
  bound?: { lower: MinMaxScalerValueType; upper: MinMaxScalerValueType };
  rounding?: RoundingPort;
};

type ScaleResult = {
  original: MinMaxScalerValueType;
  scaled: MinMaxScalerValueType;
  isMin: boolean;
  isMax: boolean;
};

type DescaleResult = {
  original: MinMaxScalerValueType;
  scaled: MinMaxScalerValueType;
  isLowerBound: boolean;
  isUpperBound: boolean;
};

export const MinMaxScalerError = {
  InvalidMinMax: "min.max.scaler.invalid.min.max",
  InvalidBound: "min.max.scaler.invalid.bound",
  ValueOutOfRange: "min.max.scaler.value.out.of.range",
  ScaledOutOfBounds: "min.max.scaler.scaled.out.of.bounds",
  EmptyArray: "min.max.scaler.empty.array",
} as const;

export class MinMaxScaler {
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToDecimal(2);

  private readonly min: MinMaxScalerValueType;
  private readonly max: MinMaxScalerValueType;
  private readonly lower: MinMaxScalerValueType;
  private readonly upper: MinMaxScalerValueType;
  private readonly rounding: RoundingPort;

  constructor(config: MinMaxScalerConfigType) {
    const lower = config.bound?.lower ?? 0;
    const upper = config.bound?.upper ?? 1;

    if (config.max - config.min < 0) throw new Error(MinMaxScalerError.InvalidMinMax);
    if (upper - lower <= 0) throw new Error(MinMaxScalerError.InvalidBound);

    this.rounding = config.rounding ?? MinMaxScaler.DEFAULT_ROUNDING;
    this.min = config.min;
    this.max = config.max;
    this.lower = lower;
    this.upper = upper;
  }

  scale(value: MinMaxScalerValueType): ScaleResult {
    const { min, max, lower, upper } = this;

    if (value < min || value > max) throw new Error(MinMaxScalerError.ValueOutOfRange);

    if (min === max) {
      return { original: value, scaled: (lower + upper) / 2, isMin: value === min, isMax: value === max };
    }

    const result = ((value - min) / (max - min)) * (upper - lower) + lower;

    return {
      original: value,
      scaled: this.rounding.round(result),
      isMin: value === min,
      isMax: value === max,
    };
  }

  descale(scaled: MinMaxScalerValueType): DescaleResult {
    const { min, max, lower, upper } = this;

    if (scaled < lower || scaled > upper) throw new Error(MinMaxScalerError.ScaledOutOfBounds);

    const result = ((scaled - lower) / (upper - lower)) * (max - min) + min;

    return {
      original: this.rounding.round(result),
      scaled,
      isLowerBound: scaled === lower,
      isUpperBound: scaled === upper,
    };
  }

  static getMinMax(values: MinMaxScalerValueType[]): { min: number; max: number } {
    if (values.length === 0) throw new Error(MinMaxScalerError.EmptyArray);
    return { min: Math.min(...values), max: Math.max(...values) };
  }
}
