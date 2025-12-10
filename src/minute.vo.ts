import { MinuteSchema, type MinuteSchemaType } from "./minute-schema.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Minute {
  static readonly ZERO = Minute.fromValue(0);
  static readonly MAX = Minute.fromValue(59);

  private constructor(private readonly value: MinuteSchemaType) {}

  static fromValue(candidate: number): Minute {
    return new Minute(MinuteSchema.parse(candidate));
  }

  static fromValueSafe(candidate: MinuteSchemaType) {
    return new Minute(candidate);
  }

  static fromTimestamp(timestamp: Timestamp): Minute {
    return new Minute(MinuteSchema.parse(new Date(timestamp.ms).getUTCMinutes()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Minute {
    return Minute.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  get(): MinuteSchemaType {
    return this.value;
  }

  equals(another: Minute): boolean {
    return this.value === another.value;
  }

  isAfter(another: Minute): boolean {
    return this.value > another.value;
  }

  isBefore(another: Minute): boolean {
    return this.value < another.value;
  }

  static list(): readonly Minute[] {
    return Array.from({ length: 60 }, (_, index) => Minute.fromValue(index));
  }

  toString(): string {
    return this.value.toString().padStart(2, "0");
  }

  toJSON(): number {
    return this.value;
  }
}
