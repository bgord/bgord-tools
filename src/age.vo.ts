import { differenceInYears } from "date-fns";
import { AgeYears, AgeYearsConstraints, type AgeYearsType } from "./age-years.vo";
import { Timestamp } from "./timestamp.vo";

export const AgeError = { FutureBirthdate: "age.future.birthdate" } as const;

export class Age {
  static readonly MIN = AgeYearsConstraints.min;
  static readonly MAX = AgeYearsConstraints.max;

  private constructor(private readonly value: AgeYearsType) {}

  static fromValue(candidate: number): Age {
    return new Age(AgeYears.parse(candidate));
  }

  static fromBirthdateEpochMs(params: { birthdate: Timestamp; now: Timestamp }): Age {
    if (params.birthdate.isAfter(params.now)) throw new Error(AgeError.FutureBirthdate);
    return Age.fromValue(differenceInYears(params.now.get(), params.birthdate.get()));
  }

  static fromBirthdate(candidate: { birthdate: string; now: Timestamp }): Age {
    const birthdate = Timestamp.fromNumber(new Date(candidate.birthdate).getTime());

    if (birthdate.isAfter(candidate.now)) throw new Error(AgeError.FutureBirthdate);
    return Age.fromValue(differenceInYears(candidate.now.get(), birthdate.get()));
  }

  get(): number {
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
    return this.value.toString();
  }

  toJSON(): number {
    return this.get();
  }
}
