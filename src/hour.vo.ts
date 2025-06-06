export type HourFormatter = (value: Hour["value"]) => string;

export const HourFormatters: Record<string, HourFormatter> = {
  TWENTY_FOUR_HOURS: (value) => value.toString().padStart(2, "0"),

  TWENTY_FOUR_HOURS_WITHOUT_PADDING: (value) => value.toString(),

  AM_PM: (value) => {
    if (value < 12) return `${value.toString()} a.m.`;
    return `${value.toString()} p.m.`;
  },

  TWELVE_HOURS: (value) => (value % 12).toString().padStart(2, "0"),

  TWELVE_HOURS_WO_PADDING: (value) => (value % 12).toString(),
} as const;

export class Hour {
  private readonly value: number;

  private readonly formatter: HourFormatter;

  static readonly ZERO = new Hour(0);

  static readonly MAX = new Hour(23);

  constructor(candidate: number, formatter?: HourFormatter) {
    if (!Number.isInteger(candidate)) {
      throw new Error("Invalid hour");
    }
    if (candidate < 0) {
      throw new Error("Invalid hour");
    }
    if (candidate >= 24) {
      throw new Error("Invalid hour");
    }

    this.value = candidate;
    this.formatter = (formatter as HourFormatter) ?? HourFormatters.TWENTY_FOUR_HOURS;
  }

  get(formatter?: HourFormatter) {
    const format = formatter ?? this.formatter;

    return { raw: this.value, formatted: format(this.value) };
  }

  equals(another: Hour): boolean {
    return this.value === another.get().raw;
  }

  isAfter(another: Hour): boolean {
    return this.value > another.get().raw;
  }

  isBefore(another: Hour): boolean {
    return this.value < another.get().raw;
  }

  static list(formatter?: HourFormatter) {
    return Array.from({ length: 24 }).map((_, index) => new Hour(index, formatter));
  }
}
