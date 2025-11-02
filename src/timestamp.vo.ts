import { Duration } from "./duration.service";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Timestamp {
  constructor(private readonly value: TimestampValueType) {}

  static fromValue(value: TimestampValueType): Timestamp {
    return new Timestamp(value);
  }

  static fromNumber(value: number): Timestamp {
    return new Timestamp(TimestampValue.parse(value));
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

  toJSON(): TimestampValueType {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
