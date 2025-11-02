import type { Timestamp } from "./timestamp.vo";

export type WeekdayFormatter = (value: Weekday["value"]) => string;

export enum WeekdayFormatterEnum {
  FULL = "FULL", // "Sunday"
  SHORT = "SHORT", // "Sun"
  ISO_NUMBER = "ISO_NUMBER", // Monday=1 ... Sunday=7
  ZERO_BASED_NUMBER = "ZERO_BASED_NUMBER", // Sunday=0 ... Saturday=6 (JS)
}

export const WeekdayValueError = "invalid.weekday" as const;

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
  // 0..6 (Sun..Sat)
  private readonly value: number;

  // default formatter used by toString()/format() when no runtime formatter given
  private readonly formatter: WeekdayFormatter;

  static readonly SUNDAY = new Weekday(0);
  static readonly MONDAY = new Weekday(1);
  static readonly TUESDAY = new Weekday(2);
  static readonly WEDNESDAY = new Weekday(3);
  static readonly THURSDAY = new Weekday(4);
  static readonly FRIDAY = new Weekday(5);
  static readonly SATURDAY = new Weekday(6);

  constructor(candidate: number, formatter?: WeekdayFormatter) {
    if (!Number.isInteger(candidate) || candidate < 0 || candidate > 6) throw new Error(WeekdayValueError);

    this.value = candidate;
    this.formatter = formatter ?? WeekdayFormatters.FULL;
  }

  static fromUtcTimestamp(timestamp: Timestamp, formatter?: WeekdayFormatter): Weekday {
    const dayZeroBased = new Date(timestamp.get()).getUTCDay(); // 0..6
    return new Weekday(dayZeroBased, formatter);
  }

  get(): number {
    return this.value;
  }

  format(): string {
    return this.formatter(this.value);
  }

  toString(): string {
    return this.format();
  }

  equals(another: Weekday): boolean {
    return this.value === another.value;
  }

  /** ISO-8601 weekday number: Monday=1 ... Sunday=7 */
  toIsoNumber(): number {
    return this.value === 0 ? 7 : this.value;
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

  static list(formatter?: WeekdayFormatter): readonly Weekday[] {
    return Array.from({ length: 7 }, (_, index) => new Weekday(index, formatter));
  }

  static listMondayFirst(formatter?: WeekdayFormatter): readonly Weekday[] {
    const [Sunday, ...rest] = Weekday.list(formatter);

    return [...rest, Sunday];
  }
}
