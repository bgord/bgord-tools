import * as v from "valibot";
import { MinuteValue, type MinuteValueType } from "./minute-value.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Minute {
  private constructor(private readonly value: MinuteValueType) {}

  static fromTimestamp(timestamp: Timestamp): Minute {
    const { minute } = timestamp.toZonedDateTimeUTC();

    return new Minute(v.parse(MinuteValue, minute));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Minute {
    return Minute.fromTimestamp(Timestamp.fromValueSafe(timestamp));
  }

  static fromNumber(candidate: number): Minute {
    return new Minute(v.parse(MinuteValue, candidate));
  }

  static fromValueSafe(candidate: MinuteValueType) {
    return new Minute(candidate);
  }

  static zero(): Minute {
    return Minute.fromNumber(0);
  }

  static max(): Minute {
    return Minute.fromNumber(59);
  }

  get(): MinuteValueType {
    return this.value;
  }

  equals(another: Minute): boolean {
    return this.value === another.value;
  }

  isBefore(another: Minute): boolean {
    return this.value < another.value;
  }

  isAfter(another: Minute): boolean {
    return this.value > another.value;
  }

  static list(): ReadonlyArray<Minute> {
    return Array.from({ length: 60 }, (_, index) => Minute.fromNumber(index));
  }

  toString(): string {
    return this.value.toString().padStart(2, "0");
  }

  toJSON(): number {
    return this.value;
  }
}
