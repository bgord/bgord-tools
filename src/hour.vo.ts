import { type HourFormatter, HourFormatters } from "./hour-format.service";
import type { TimestampType } from "./timestamp.vo";

// TODO
export const HourValueError = "invalid.hour" as const;

export class Hour {
  private readonly value: number;

  static readonly ZERO = new Hour(0);
  static readonly MAX = new Hour(23);

  constructor(candidate: number) {
    if (!Number.isInteger(candidate) || candidate < 0 || candidate >= 24) {
      throw new Error(HourValueError);
    }
    this.value = candidate;
  }

  static fromEpochMs(timestamp: TimestampType): Hour {
    return new Hour(new Date(timestamp).getUTCHours());
  }

  get(): number {
    return this.value;
  }

  toString(): string {
    return HourFormatters.TWENTY_FOUR_HOURS(this.value);
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
}
