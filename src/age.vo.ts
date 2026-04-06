import * as v from "valibot";
import { AgeYears, AgeYearsConstraints, type AgeYearsType } from "./age-years.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";

export const AgeError = { FutureBirthdate: "age.future.birthdate" };

export class Age {
  static readonly MIN = AgeYearsConstraints.min;
  static readonly MAX = AgeYearsConstraints.max;

  private constructor(private readonly value: AgeYearsType) {}

  static fromValue(candidate: number): Age {
    return new Age(v.parse(AgeYears, candidate));
  }

  static fromValueSafe(candidate: AgeYearsType): Age {
    return new Age(candidate);
  }

  static fromBirthdateTimestamp(params: { birthdate: Timestamp; now: Timestamp }): Age {
    if (params.birthdate.isAfter(params.now)) throw new Error(AgeError.FutureBirthdate);

    const birthdate = params.birthdate.toInstant().toZonedDateTimeISO("UTC").toPlainDate();
    const now = params.now.toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    return Age.fromValue(birthdate.until(now, { largestUnit: "years" }).years);
  }

  static fromBirthdate(candidate: { birthdate: string; now: Timestamp }): Age {
    const birthdate = Timestamp.fromString(candidate.birthdate)
      .toInstant()
      .toZonedDateTimeISO("UTC")
      .toPlainDate();

    const now = candidate.now.toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    if (Temporal.PlainDate.compare(birthdate, now) > 0) throw new Error(AgeError.FutureBirthdate);
    return Age.fromValue(birthdate.until(now, { largestUnit: "years" }).years);
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
