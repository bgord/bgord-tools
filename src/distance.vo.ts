import { DistanceValue, type DistanceValueType } from "./distance-value.vo";
import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export const DistanceError = {
  SubtractResultLessThanZero: "distance.subtract.result.less.than.zero",
} as const;

export class Distance {
  private static readonly ZERO = DistanceValue.parse(0);

  private constructor(private readonly value: DistanceValueType) {}

  static fromMeters(candidate: number = Distance.ZERO): Distance {
    return new Distance(DistanceValue.parse(candidate));
  }

  static fromMetersSafe(candidate: DistanceValueType = Distance.ZERO): Distance {
    return new Distance(candidate);
  }

  static fromKilometers(candidate: number, rounding: RoundingPort = new RoundToNearest()): Distance {
    return new Distance(DistanceValue.parse(rounding.round(candidate * 1000)));
  }

  static fromMiles(candidate: number, rounding: RoundingPort = new RoundToNearest()): Distance {
    return new Distance(DistanceValue.parse(rounding.round(candidate * 1_609.344)));
  }

  get(): DistanceValueType {
    return this.value;
  }

  add(distance: Distance): Distance {
    return new Distance(DistanceValue.parse(this.value + distance.get()));
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
