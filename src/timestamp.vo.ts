import * as v from "valibot";
import { Duration } from "./duration.service";
import { Temporal } from "./temporal";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Timestamp {
  constructor(private readonly value: TimestampValueType) {}

  static fromInstant(instant: Temporal.Instant): Timestamp {
    return Timestamp.fromNumber(instant.epochMilliseconds);
  }

  static fromValue(value: TimestampValueType): Timestamp {
    return new Timestamp(value);
  }

  static fromNumber(value: number): Timestamp {
    return new Timestamp(v.parse(TimestampValue, value));
  }

  add(duration: Duration): Timestamp {
    return Timestamp.fromNumber(this.value + duration.ms);
  }

  subtract(duration: Duration): Timestamp {
    return Timestamp.fromNumber(this.value - duration.ms);
  }

  difference(another: Timestamp): Duration {
    return Duration.Ms(this.value - another.value);
  }

  isBefore(another: Timestamp): boolean {
    return this.value < another.value;
  }

  isBeforeOrEqual(another: Timestamp): boolean {
    return this.value <= another.value;
  }

  isAfter(another: Timestamp): boolean {
    return this.value > another.value;
  }

  isAfterOrEqual(another: Timestamp): boolean {
    return this.value >= another.value;
  }

  equals(another: Timestamp): boolean {
    return this.value === another.value;
  }

  get ms(): TimestampValueType {
    return this.value;
  }

  toInstant(): Temporal.Instant {
    return Temporal.Instant.fromEpochMilliseconds(this.value);
  }

  toJSON(): TimestampValueType {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
