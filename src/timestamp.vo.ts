import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Timestamp {
  constructor(private readonly value: TimestampValueType) {}

  static fromValue(value: TimestampValueType): Timestamp {
    return new Timestamp(value);
  }

  static fromNumber(value: number): Timestamp {
    return new Timestamp(TimestampValue.parse(value));
  }

  isBefore(another: Timestamp): boolean {
    return this.value < another.value;
  }

  isAfter(another: Timestamp): boolean {
    return this.value > another.value;
  }

  get(): TimestampValueType {
    return this.value;
  }

  toJSON(): TimestampValueType {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
