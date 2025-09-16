import type { TimestampType } from "./timestamp.vo";

export type WeekdayFormatter = (value: Weekday["value"]) => string;

export enum WeekdayFormatterEnum {
  FULL = "FULL", // "Sunday"
  SHORT = "SHORT", // "Sun"
  ISO_NUMBER = "ISO_NUMBER", // Monday=1 ... Sunday=7
  ZERO_BASED_NUMBER = "ZERO_BASED_NUMBER", // Sunday=0 ... Saturday=6 (JS)
}

const FULL_NAMES: readonly string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const SHORT_NAMES: readonly string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const WeekdayFormatters: Record<WeekdayFormatterEnum, WeekdayFormatter> = {
  FULL: (value) => FULL_NAMES[value],
  SHORT: (value) => SHORT_NAMES[value],
  ISO_NUMBER: (value) => (value === 0 ? 7 : value).toString(), // ISO-8601: Mon=1..Sun=7
  ZERO_BASED_NUMBER: (value) => value.toString(), // JS getUTCDay(): Sun=0..Sat=6
} as const;

export class Weekday {
  private readonly value: number;

  private readonly formatter: WeekdayFormatter;

  static readonly SUNDAY = new Weekday(0);
  static readonly MONDAY = new Weekday(1);
  static readonly TUESDAY = new Weekday(2);
  static readonly WEDNESDAY = new Weekday(3);
  static readonly THURSDAY = new Weekday(4);
  static readonly FRIDAY = new Weekday(5);
  static readonly SATURDAY = new Weekday(6);

  constructor(candidate: number, formatter?: WeekdayFormatter) {
    if (!Number.isInteger(candidate)) throw new Error("Invalid weekday");
    if (candidate < 0) throw new Error("Invalid weekday");
    if (candidate > 6) throw new Error("Invalid weekday");

    this.value = candidate;
    this.formatter = (formatter as WeekdayFormatter) ?? WeekdayFormatters.FULL;
  }

  static fromUtcTimestamp(timestamp: TimestampType, formatter?: WeekdayFormatter): Weekday {
    const day = new Date(timestamp).getUTCDay(); // 0..6
    return new Weekday(day, formatter);
  }

  get(formatter?: WeekdayFormatter) {
    const format = formatter ?? this.formatter;
    return { raw: this.value, formatted: format(this.value) };
  }

  equals(another: Weekday): boolean {
    return this.value === another.get().raw;
  }

  isAfter(another: Weekday): boolean {
    return this.value > another.get().raw;
  }

  isBefore(another: Weekday): boolean {
    return this.value < another.get().raw;
  }

  toIsoNumber(): number {
    return this.value === 0 ? 7 : this.value;
  }

  isWeekend(): boolean {
    return this.value === 0 || this.value === 6;
  }

  isMonday(): boolean {
    return this.value === 1;
  }
  isTuesday(): boolean {
    return this.value === 2;
  }
  isWednesday(): boolean {
    return this.value === 3;
  }
  isThursday(): boolean {
    return this.value === 4;
  }
  isFriday(): boolean {
    return this.value === 5;
  }
  isSaturday(): boolean {
    return this.value === 6;
  }
  isSunday(): boolean {
    return this.value === 0;
  }

  static list(formatter?: WeekdayFormatter): Weekday[] {
    return Array.from({ length: 7 }).map((_, index) => new Weekday(index, formatter));
  }

  static listMondayFirst(formatter?: WeekdayFormatter): Weekday[] {
    const days = Weekday.list(formatter);
    return [...days.slice(1), days[0]];
  }
}
