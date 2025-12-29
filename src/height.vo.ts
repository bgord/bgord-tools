import { HeightMillimeters, type HeightMillimetersType } from "./height-milimiters.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export class Height {
  private static readonly ZERO = HeightMillimeters.parse(0);

  private static readonly MILLIMETERS_PER_CENTIMETER = 10;

  private constructor(private readonly millimeters: HeightMillimetersType) {}

  static fromMillimeters(millimeters: number): Height {
    return new Height(HeightMillimeters.parse(millimeters));
  }

  static fromMillimetersSafe(millimeters: HeightMillimetersType): Height {
    return new Height(millimeters);
  }

  static fromCentimeters(
    centimeters: number,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Height {
    const millimeters = rounding.round(centimeters * Height.MILLIMETERS_PER_CENTIMETER);

    return new Height(HeightMillimeters.parse(millimeters));
  }

  static zero(): Height {
    return Height.fromMillimetersSafe(Height.ZERO);
  }

  get(): number {
    return this.millimeters;
  }

  toMillimeters(): number {
    return this.millimeters;
  }

  toCentimeters(rounding?: RoundingStrategy): number {
    const centimeters = this.millimeters / Height.MILLIMETERS_PER_CENTIMETER;

    if (rounding) return rounding.round(centimeters);
    return centimeters;
  }

  format(rounding?: RoundingStrategy): string {
    const chosen = rounding ?? new RoundingDecimalStrategy(1);
    const value = this.toCentimeters(chosen);

    return `${value} cm`;
  }

  toString(): string {
    return this.format(new RoundingDecimalStrategy(1));
  }

  equals(another: Height): boolean {
    return this.millimeters === another.millimeters;
  }

  greaterThan(another: Height): boolean {
    return this.millimeters > another.millimeters;
  }

  lessThan(another: Height): boolean {
    return this.millimeters < another.millimeters;
  }

  isZero(): boolean {
    return this.millimeters === 0;
  }

  toJSON(): number {
    return this.millimeters;
  }
}
