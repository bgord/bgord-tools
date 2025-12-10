import { type HourFormatter, HourFormatters } from "./hour-format.service";
import { HourSchema, type HourSchemaType } from "./hour-schema.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Hour {
  private constructor(private readonly value: HourSchemaType) {}

  static fromValue(candidate: number): Hour {
    return new Hour(HourSchema.parse(candidate));
  }

  static fromValueSafe(candidate: HourSchemaType) {
    return new Hour(candidate);
  }

  static fromTimestamp(timestamp: Timestamp): Hour {
    return new Hour(HourSchema.parse(new Date(timestamp.ms).getUTCHours()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Hour {
    return Hour.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static zero(): Hour {
    return Hour.fromValue(0);
  }

  static max(): Hour {
    return Hour.fromValue(23);
  }

  get(): HourSchemaType {
    return this.value;
  }

  format(formatter: HourFormatter): string {
    return formatter(this.value);
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

  static list(): readonly Hour[] {
    return Array.from({ length: 24 }, (_, index) => Hour.fromValue(index));
  }

  toString(): string {
    return HourFormatters.TWENTY_FOUR_HOURS(this.value);
  }

  toJSON(): number {
    return this.value;
  }
}
