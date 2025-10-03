import { z } from "zod/v4";
import { RoundToDecimal, RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

const NonFiniteNumberError = { error: "number.non_finite" } as const;
const NumberNegativeError = { error: "number.negative" } as const;
const MillimetersIntegerNonNegativeError = { error: "millimeters.integer_non_negative" } as const;
const IntegerNonNegativeError = { error: "integer.non_negative" } as const;

const HeightFiniteNumber = z.number(NonFiniteNumberError).refine(Number.isFinite, NonFiniteNumberError);

const HeightNonNegativeQuantity = HeightFiniteNumber.min(0, NumberNegativeError);

const HeightCanonicalMillimeters = HeightFiniteNumber.int(MillimetersIntegerNonNegativeError).min(
  0,
  MillimetersIntegerNonNegativeError,
);

const HeightRoundedWholeInches = HeightFiniteNumber.int(IntegerNonNegativeError).min(
  0,
  IntegerNonNegativeError,
);

export enum HeightUnit {
  cm = "cm",
  ft_in = "ft_in",
}

export class Height {
  private static readonly MILLIMETERS_PER_CENTIMETER = 10;
  private static readonly MILLIMETERS_PER_INCH = 25.4;
  private static readonly INCHES_PER_FOOT = 12;

  private constructor(private readonly millimeters: number) {}

  static fromCentimeters(centimeters: number, rounding: RoundingPort = new RoundToNearest()): Height {
    const validatedCentimeters = HeightNonNegativeQuantity.parse(centimeters);
    const millimetersFloat = validatedCentimeters * Height.MILLIMETERS_PER_CENTIMETER;
    const millimetersRounded = rounding.round(millimetersFloat);
    const validatedMillimeters = HeightCanonicalMillimeters.parse(millimetersRounded);
    return new Height(validatedMillimeters);
  }

  static fromFeetInches(feet: number, inches = 0, rounding: RoundingPort = new RoundToNearest()): Height {
    const validatedFeet = HeightNonNegativeQuantity.parse(feet);
    const validatedInches = HeightNonNegativeQuantity.parse(inches);
    const totalInches = validatedFeet * Height.INCHES_PER_FOOT + validatedInches;
    const millimetersFloat = totalInches * Height.MILLIMETERS_PER_INCH;
    const millimetersRounded = rounding.round(millimetersFloat);
    const validatedMillimeters = HeightCanonicalMillimeters.parse(millimetersRounded);
    return new Height(validatedMillimeters);
  }

  static fromMillimeters(millimeters: number, rounding: RoundingPort = new RoundToNearest()): Height {
    const validatedMillimetersInput = HeightNonNegativeQuantity.parse(millimeters);
    const millimetersRounded = rounding.round(validatedMillimetersInput);
    const validatedMillimeters = HeightCanonicalMillimeters.parse(millimetersRounded);
    return new Height(validatedMillimeters);
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
    if (rounding) {
      const roundedCentimeters = rounding.round(centimeters);
      return roundedCentimeters;
    }
    return centimeters;
  }

  toFeetInches(rounding: RoundingPort = new RoundToNearest()): { feet: number; inches: number } {
    const totalInchesFloat = this.millimeters / Height.MILLIMETERS_PER_INCH;
    const totalInchesRounded = rounding.round(totalInchesFloat);
    const totalWholeInches = HeightRoundedWholeInches.parse(totalInchesRounded);

    const feet = Math.floor(totalWholeInches / Height.INCHES_PER_FOOT);
    const inches = totalWholeInches % Height.INCHES_PER_FOOT;

    return { feet, inches };
  }

  format(unit: HeightUnit, rounding?: RoundingPort): string {
    if (unit === HeightUnit.cm) {
      const chosen = rounding ?? new RoundToDecimal(1);
      const value = this.toCentimeters(chosen);
      return `${value} cm`;
    }

    const chosen = rounding ?? new RoundToNearest();
    const parts = this.toFeetInches(chosen);
    return `${parts.feet}′${parts.inches}″`;
  }

  toString(): string {
    return this.format(HeightUnit.cm, new RoundToDecimal(1));
  }

  equals(another: Height): boolean {
    return this.millimeters === another.millimeters;
  }

  compare(another: Height): -1 | 0 | 1 {
    if (this.equals(another)) return 0;
    return this.millimeters < another.millimeters ? -1 : 1;
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

  toJSON(): { mm: number } {
    return { mm: this.millimeters };
  }

  static fromJSON(input: { mm: number }): Height {
    return Height.fromMillimeters(input.mm);
  }
}
