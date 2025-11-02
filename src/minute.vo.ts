import { MinuteSchema, type MinuteSchemaType } from "./minute-schema.vo";
import { TimestampVO } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Minute {
  private readonly value: MinuteSchemaType;

  static readonly ZERO = new Minute(0);
  static readonly MAX = new Minute(59);

  constructor(candidate: number) {
    this.value = MinuteSchema.parse(candidate);
  }

  static fromTimestamp(timestamp: TimestampVO): Minute {
    return new Minute(new Date(timestamp.ms).getUTCMinutes());
  }

  static fromTimestampValue(timestamp: TimestampValueType): Minute {
    return Minute.fromTimestamp(TimestampVO.fromValue(timestamp));
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
    return Array.from({ length: 60 }, (_, index) => new Minute(index));
  }

  toString(): string {
    return this.value.toString().padStart(2, "0");
  }

  toJSON(): number {
    return this.value;
  }
}
