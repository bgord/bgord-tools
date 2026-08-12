import * as v from "valibot";
import { HeightMillimeters, type HeightMillimetersType } from "./height-millimeters.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export class Height {
  private static readonly ZERO = v.parse(HeightMillimeters, 0);

  private static readonly MILLIMETERS_PER_CENTIMETER = 10;

  private constructor(private readonly millimeters: HeightMillimetersType) {}

  static fromMillimeters(millimeters: number): Height {
    return new Height(v.parse(HeightMillimeters, millimeters));
  }

  static fromMillimetersSafe(millimeters: HeightMillimetersType): Height {
    return new Height(millimeters);
  }

  static fromCentimeters(
    centimeters: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Height {
    const millimeters = rounding.round(centimeters * Height.MILLIMETERS_PER_CENTIMETER);

    return new Height(v.parse(HeightMillimeters, millimeters));
  }

  static zero(): Height {
    return Height.fromMillimetersSafe(Height.ZERO);
  }

  get(): HeightMillimetersType {
    return this.millimeters;
  }

  toMillimeters(): number {
    return this.millimeters;
  }

  toCentimeters(): number {
    return this.millimeters / Height.MILLIMETERS_PER_CENTIMETER;
  }

  toString(): string {
    return this.millimeters.toString();
  }

  equals(another: Height): boolean {
    return this.millimeters === another.millimeters;
  }

  isGreaterThan(another: Height): boolean {
    return this.millimeters > another.millimeters;
  }

  isSmallerThan(another: Height): boolean {
    return this.millimeters < another.millimeters;
  }

  isZero(): boolean {
    return this.millimeters === 0;
  }

  toJSON(): number {
    return this.millimeters;
  }
}
