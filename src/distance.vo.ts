import * as v from "valibot";
import { DistanceValue, type DistanceValueType } from "./distance-value.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export const DistanceError = { SubtractResultLessThanZero: "distance.subtract.result.less.than.zero" };

export class Distance {
  private static readonly ZERO = v.parse(DistanceValue, 0);

  private constructor(private readonly value: DistanceValueType) {}

  static fromMeters(candidate: number): Distance {
    return new Distance(v.parse(DistanceValue, candidate));
  }

  static fromMetersSafe(candidate: DistanceValueType): Distance {
    return new Distance(candidate);
  }

  static fromKilometers(
    candidate: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Distance {
    return new Distance(v.parse(DistanceValue, rounding.round(candidate * 1000)));
  }

  static fromMiles(
    candidate: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Distance {
    return new Distance(v.parse(DistanceValue, rounding.round(candidate * 1_609.344)));
  }

  get(): DistanceValueType {
    return this.value;
  }

  add(distance: Distance): Distance {
    return new Distance(v.parse(DistanceValue, this.value + distance.get()));
  }

  subtract(distance: Distance): Distance {
    const result = this.value - distance.get();

    if (result < Distance.ZERO) throw new Error(DistanceError.SubtractResultLessThanZero);
    return new Distance(v.parse(DistanceValue, result));
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

  toString(): string {
    return this.value.toString();
  }

  toJSON(): number {
    return this.value;
  }
}
