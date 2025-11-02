import { type HourFormatter, HourFormatters } from "./hour-format.service";
import { HourSchema, type HourSchemaType } from "./hour-schema.vo";
import type { Timestamp } from "./timestamp.vo";

export class Hour {
  private readonly value: HourSchemaType;

  static readonly ZERO = new Hour(0);
  static readonly MAX = new Hour(23);

  constructor(candidate: number) {
    this.value = HourSchema.parse(candidate);
  }

  static fromEpochMs(timestamp: Timestamp): Hour {
    return new Hour(new Date(timestamp.get()).getUTCHours());
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
    return Array.from({ length: 24 }, (_, index) => new Hour(index));
  }

  toString(): string {
    return HourFormatters.TWENTY_FOUR_HOURS(this.value);
  }

  toJSON(): number {
    return this.value;
  }
}
