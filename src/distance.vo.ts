import { DistanceValue, type DistanceValueType } from "./distance-value.vo";
import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export const DistanceError = {
  SubtractResultLessThanZero: "distance.subtract.result.less.than.zero",
} as const;

export class Distance {
  private static readonly ZERO = 0;

  private readonly value: DistanceValueType;

  constructor(value: number = Distance.ZERO) {
    this.value = DistanceValue.parse(value);
  }

  static fromKilometers(candidate: number, rounding: RoundingPort = new RoundToNearest()): Distance {
    return new Distance(rounding.round(candidate * 1000));
  }

  get(): DistanceValueType {
    return this.value;
  }

  add(distance: Distance): Distance {
    const result = this.value + distance.get();

    return new Distance(DistanceValue.parse(result));
  }

  subtract(money: Distance): Distance {
    const result = this.value - money.get();

    if (result < Distance.ZERO) throw new Error(DistanceError.SubtractResultLessThanZero);
    return new Distance(DistanceValue.parse(result));
  }

  equals(another: Distance): boolean {
    return this.value === another.get();
  }

  isLongerThan(another: Distance): boolean {
    return this.value > another.get();
  }

  isShorterThan(another: Distance): boolean {
    return this.value < another.get();
  }

  isZero(): boolean {
    return this.value === Distance.ZERO;
  }

  format(): string {
    return this.value.toString();
  }

  toString(): string {
    return this.format();
  }

  toJSON(): number {
    return this.value;
  }
}
