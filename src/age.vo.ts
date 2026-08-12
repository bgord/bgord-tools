import * as v from "valibot";
import { AgeYears, AgeYearsConstraints, type AgeYearsType } from "./age-years.vo";
import { Timestamp } from "./timestamp.vo";

export const AgeError = { FutureBirthdate: "age.future.birthdate" };

export class Age {
  static readonly MIN = AgeYearsConstraints.min;
  static readonly MAX = AgeYearsConstraints.max;

  private constructor(private readonly value: AgeYearsType) {}

  static fromNumber(candidate: number): Age {
    return new Age(v.parse(AgeYears, candidate));
  }

  static fromValueSafe(candidate: AgeYearsType): Age {
    return new Age(candidate);
  }

  static min(): Age {
    return Age.fromNumber(AgeYearsConstraints.min);
  }

  static max(): Age {
    return Age.fromNumber(AgeYearsConstraints.max);
  }

  static fromBirthdateTimestamp(params: { birthdate: Timestamp; now: Timestamp }): Age {
    if (params.birthdate.isAfter(params.now)) throw new Error(AgeError.FutureBirthdate);

    const birthdate = params.birthdate.toPlainDateUTC();
    const now = params.now.toPlainDateUTC();

    return Age.fromNumber(birthdate.until(now, { largestUnit: "years" }).years);
  }

  static fromBirthdate(params: { birthdate: string; now: Timestamp }): Age {
    return Age.fromBirthdateTimestamp({
      birthdate: Timestamp.fromString(params.birthdate),
      now: params.now,
    });
  }

  get(): AgeYearsType {
    return this.value;
  }

  equals(other: Age): boolean {
    return this.value === other.value;
  }

  isOlderThan(other: Age): boolean {
    return this.value > other.value;
  }

  isYoungerThan(other: Age): boolean {
    return this.value < other.value;
  }

  isAdult(minimumAge: Age): boolean {
    return this.value >= minimumAge.value;
  }

  toString(): string {
    return this.get().toString();
  }

  toJSON(): number {
    return this.get();
  }
}
