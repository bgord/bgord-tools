import type { Duration } from "./duration.service";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class TimestampVO {
  constructor(private readonly value: TimestampValueType) {}

  static fromValue(value: TimestampValueType): TimestampVO {
    return new TimestampVO(value);
  }

  static fromNumber(value: number): TimestampVO {
    return new TimestampVO(TimestampValue.parse(value));
  }

  add(duration: Duration): TimestampVO {
    return TimestampVO.fromNumber(this.value + duration.ms);
  }

  subtract(duration: Duration): TimestampVO {
    return TimestampVO.fromNumber(this.value - duration.ms);
  }

  isBefore(another: TimestampVO): boolean {
    return this.value < another.value;
  }

  isBeforeOrEqual(another: TimestampVO): boolean {
    return this.value <= another.value;
  }

  isAfter(another: TimestampVO): boolean {
    return this.value > another.value;
  }

  isAfterOrEqual(another: TimestampVO): boolean {
    return this.value >= another.value;
  }

  equals(another: TimestampVO): boolean {
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
