import * as v from "valibot";
import { HourValue, type HourValueType } from "./hour-value.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Hour {
  private constructor(private readonly value: HourValueType) {}

  static fromTimestamp(timestamp: Timestamp): Hour {
    const { hour } = timestamp.toZonedDateTimeUTC();

    return new Hour(v.parse(HourValue, hour));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Hour {
    return Hour.fromTimestamp(Timestamp.fromValueSafe(timestamp));
  }

  static fromNumber(candidate: number): Hour {
    return new Hour(v.parse(HourValue, candidate));
  }

  static fromValueSafe(candidate: HourValueType) {
    return new Hour(candidate);
  }

  static zero(): Hour {
    return Hour.fromNumber(0);
  }

  static max(): Hour {
    return Hour.fromNumber(23);
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
    return Array.from({ length: 24 }, (_, index) => Hour.fromNumber(index));
  }

  toString(): string {
    return this.value.toString().padStart(2, "0");
  }

  toJSON(): number {
    return this.value;
  }
}
