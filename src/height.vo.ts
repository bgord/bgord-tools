import { HeightMillimeters } from "./height-milimiters.vo";
import { RoundToDecimal, RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export class Height {
  private static readonly MILLIMETERS_PER_CENTIMETER = 10;

  private constructor(private readonly millimeters: number) {}

  static fromCentimeters(centimeters: number, rounding: RoundingPort = new RoundToNearest()): Height {
    const millimeters = rounding.round(centimeters * Height.MILLIMETERS_PER_CENTIMETER);

    return new Height(HeightMillimeters.parse(millimeters));
  }

  static fromMillimeters(millimeters: number): Height {
    return new Height(HeightMillimeters.parse(millimeters));
  }

  static zero(): Height {
    return new Height(0);
  }

  get(): number {
    return this.millimeters;
  }

  toMillimeters(): number {
    return this.millimeters;
  }

  toCentimeters(rounding?: RoundingPort): number {
    const centimeters = this.millimeters / Height.MILLIMETERS_PER_CENTIMETER;

    if (rounding) return rounding.round(centimeters);
    return centimeters;
  }

  format(rounding?: RoundingPort): string {
    const chosen = rounding ?? new RoundToDecimal(1);
    const value = this.toCentimeters(chosen);

    return `${value} cm`;
  }

  toString(): string {
    return this.format(new RoundToDecimal(1));
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
