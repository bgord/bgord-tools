import * as v from "valibot";
import { HourValue, type HourValueType } from "./hour-value.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Hour {
  private constructor(private readonly value: HourValueType) {}

  static fromTimestamp(timestamp: Timestamp): Hour {
    const { hour } = Temporal.Instant.fromEpochMilliseconds(timestamp.ms).toZonedDateTimeISO("UTC");

    return new Hour(v.parse(HourValue, hour));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Hour {
    return Hour.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromValue(candidate: number): Hour {
    return new Hour(v.parse(HourValue, candidate));
  }

  static fromValueSafe(candidate: HourValueType) {
    return new Hour(candidate);
  }

  static zero(): Hour {
    return Hour.fromValue(0);
  }

  static max(): Hour {
    return Hour.fromValue(23);
  }

  get(): HourValueType {
    return this.value;
  }

  equals(another: Hour): boolean {
    return this.value === another.value;
  }

  isAfter(another: Hour): boolean {
    return this.value > another.value;
  }

  isBefore(another: Hour): boolean {
    return this.value < another.value;
  }

  static list(): ReadonlyArray<Hour> {
    return Array.from({ length: 24 }, (_, index) => Hour.fromValue(index));
  }

  toString(): string {
    return this.value.toString();
  }

  toJSON(): number {
    return this.value;
  }
}
