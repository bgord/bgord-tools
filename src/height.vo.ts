import { z } from "zod/v4";
import { type RoundingStrategy, RoundToDecimal, RoundToNearest } from "./rounding.service";

const FiniteNumericValue = z.number().refine(Number.isFinite, { message: "Expected a finite number" });
const NonNegativeNumericValue = FiniteNumericValue.min(0, { message: "Must be greater than or equal to 0" });
const NonNegativeIntegerMillimeters = FiniteNumericValue.int().min(0, {
  message: "Millimeters must be an integer greater than or equal to 0",
});
const NonNegativeIntegerValue = FiniteNumericValue.int().min(0, {
  message: "Value must be an integer greater than or equal to 0",
});

export enum HeightUnit {
  cm = "cm",
  ft_in = "ft_in",
}

export class Height {
  private static readonly MILLIMETERS_PER_CENTIMETER = 10;
  private static readonly MILLIMETERS_PER_INCH = 25.4;
  private static readonly INCHES_PER_FOOT = 12;

  private constructor(private readonly millimeters: number) {}

  static fromCentimeters(centimeters: number, rounding: RoundingStrategy = new RoundToNearest()): Height {
    NonNegativeNumericValue.parse(centimeters);
    const mmFloat = centimeters * Height.MILLIMETERS_PER_CENTIMETER;
    const mmRounded = rounding.round(mmFloat);
    NonNegativeIntegerMillimeters.parse(mmRounded);
    return new Height(mmRounded);
  }

  static fromFeetInches(feet: number, inches = 0, rounding: RoundingStrategy = new RoundToNearest()): Height {
    NonNegativeNumericValue.parse(feet);
    NonNegativeNumericValue.parse(inches);
    const totalInches = feet * Height.INCHES_PER_FOOT + inches;
    const mmFloat = totalInches * Height.MILLIMETERS_PER_INCH;
    const mmRounded = rounding.round(mmFloat);
    NonNegativeIntegerMillimeters.parse(mmRounded);
    return new Height(mmRounded);
  }

  static fromMillimeters(millimeters: number, rounding: RoundingStrategy = new RoundToNearest()): Height {
    NonNegativeNumericValue.parse(millimeters);
    const mmRounded = rounding.round(millimeters);
    NonNegativeIntegerMillimeters.parse(mmRounded);
    return new Height(mmRounded);
  }

  static zero(): Height {
    return new Height(0);
  }

  toMillimeters(): number {
    return this.millimeters;
  }

  toCentimeters(rounding?: RoundingStrategy): number {
    const cm = this.millimeters / Height.MILLIMETERS_PER_CENTIMETER;
    return rounding ? rounding.round(cm) : cm;
  }

  toFeetInches(rounding: RoundingStrategy = new RoundToNearest()): {
    feet: number;
    inches: number;
  } {
    const totalInchesFloat = this.millimeters / Height.MILLIMETERS_PER_INCH;
    const totalInchesRounded = rounding.round(totalInchesFloat);
    const integerInches = NonNegativeIntegerValue.parse(totalInchesRounded);

    const feet = (integerInches - (integerInches % Height.INCHES_PER_FOOT)) / Height.INCHES_PER_FOOT;
    const inches = integerInches % Height.INCHES_PER_FOOT;

    return { feet, inches };
  }

  format(unit: HeightUnit, roundingStrategy?: RoundingStrategy): string {
    return {
      [HeightUnit.cm]: () => {
        const rounding = roundingStrategy ?? new RoundToDecimal(1);

        return `${this.toCentimeters(rounding)} cm`;
      },
      [HeightUnit.ft_in]: () => {
        const rounding = roundingStrategy ?? new RoundToNearest();
        const { feet, inches } = this.toFeetInches(rounding);

        return `${feet}′${inches}″`;
      },
    }[unit]();
  }

  equals(other: Height): boolean {
    return this.millimeters === other.millimeters;
  }

  compare(other: Height): -1 | 0 | 1 {
    if (this.equals(other)) return 0;
    return this.millimeters < other.millimeters ? -1 : 1;
  }

  greaterThan(other: Height): boolean {
    return this.millimeters > other.millimeters;
  }

  lessThan(other: Height): boolean {
    return this.millimeters < other.millimeters;
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
