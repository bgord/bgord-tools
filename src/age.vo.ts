import { differenceInYears } from "date-fns";
import { z } from "zod/v4";
import type { TimestampType } from "./timestamp.vo";

// TODO
export const AgeValueError = { error: "invalid.age" } as const;
export const InvalidBirthdateInFutureError = "invalid.birthdate_in_future" as const;
export const InvalidBirthdateError = "invalid.birthdate" as const;

export class Age {
  static readonly MIN = 1;
  static readonly MAX = 130;

  static readonly AgeValue = z
    .number(AgeValueError)
    .int(AgeValueError)
    .min(Age.MIN, AgeValueError)
    .max(Age.MAX, AgeValueError)
    .brand("AgeValue");

  private constructor(private readonly value: z.infer<typeof Age.AgeValue>) {}

  get(): number {
    return this.value as number;
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
    return new Age(Age.AgeValue.parse(candidate));
  }

  static fromBirthdateEpochMs(params: { birthdate: TimestampType; now: TimestampType }): Age {
    if (params.birthdate > params.now) throw new Error(InvalidBirthdateInFutureError);
    return Age.fromValue(differenceInYears(params.now, params.birthdate));
  }

  static fromBirthdate(params: { birthdate: string; now: TimestampType }): Age {
    const birthdateMs = new Date(params.birthdate).getTime();

    if (birthdateMs > params.now) throw new Error(InvalidBirthdateInFutureError);
    return Age.fromValue(differenceInYears(params.now, birthdateMs));
  }

  toJSON(): number {
    return this.get();
  }

  toString(): string {
    return String(this.value);
  }
}
