import { differenceInYears } from "date-fns";
import { z } from "zod/v4";
import type { TimestampType } from "./timestamp.vo";

export const AgeValueError = { error: "invalid.age" };

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

  equals(another: Age): boolean {
    return this.compare(another) === 0;
  }

  isOlderThan(another: Age): boolean {
    return this.compare(another) === 1;
  }

  isYoungerThan(another: Age): boolean {
    return this.compare(another) === -1;
  }

  isAdult(minAge: Age): boolean {
    return this.equals(minAge) || this.isOlderThan(minAge);
  }

  static fromValue(candidate: number): Age {
    return new Age(Age.AgeValue.parse(candidate));
  }

  static fromBirthdate(params: { birthdate: TimestampType; now: TimestampType }): Age {
    if (params.birthdate > params.now) throw new Error("invalid.birthdate_in_future");

    const years = differenceInYears(new Date(params.now), new Date(params.birthdate));

    return Age.fromValue(years);
  }
}
