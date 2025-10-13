import { differenceInYears } from "date-fns";
import { AgeYears, AgeYearsConstraints, type AgeYearsType } from "./age-years.vo";
import type { TimestampType } from "./timestamp.vo";

export const AgeError = { FutureBirthdate: "age.future.birthdate" } as const;

export class Age {
  static readonly MIN = AgeYearsConstraints.min;
  static readonly MAX = AgeYearsConstraints.max;

  private constructor(private readonly value: AgeYearsType) {}

  get(): number {
    return this.value;
  }

  compare(other: Age): -1 | 0 | 1 {
    return this.value === other.value ? 0 : this.value < other.value ? -1 : 1;
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

  static fromValue(candidate: number): Age {
    return new Age(AgeYears.parse(candidate));
  }

  static fromBirthdateEpochMs(params: { birthdate: TimestampType; now: TimestampType }): Age {
    if (params.birthdate > params.now) throw new Error(AgeError.FutureBirthdate);
    return Age.fromValue(differenceInYears(params.now, params.birthdate));
  }

  static fromBirthdate(candidate: { birthdate: string; now: TimestampType }): Age {
    const birthdateMs = new Date(candidate.birthdate).getTime();

    if (birthdateMs > candidate.now) throw new Error(AgeError.FutureBirthdate);
    return Age.fromValue(differenceInYears(candidate.now, birthdateMs));
  }

  toJSON(): number {
    return this.get();
  }

  toString(): string {
    return this.value.toString();
  }
}
