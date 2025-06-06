import { Hour, HourFormatters } from "./hour.vo";
import { Minute } from "./minute.vo";

export type ClockFormatter = (hour: Hour, minute: Minute) => string;

enum ClockFormatterEnum {
  TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
  TWELVE_HOURS = "TWELVE_HOURS",
}

export const ClockFormatters: Record<ClockFormatterEnum, ClockFormatter> = {
  TWENTY_FOUR_HOURS: (hour, minute) => `${hour.get().formatted}:${minute.get().formatted}`,

  TWELVE_HOURS: (hour, minute) =>
    `${hour.get(HourFormatters.TWELVE_HOURS).formatted}:${minute.get().formatted}`,
} as const;

export class Clock {
  private readonly formatter: ClockFormatter;

  constructor(
    private readonly hour: Hour,
    private readonly minute: Minute,
    formatter?: ClockFormatter,
  ) {
    this.formatter = (formatter as ClockFormatter) ?? ClockFormatters.TWENTY_FOUR_HOURS;
  }

  get(formatter?: ClockFormatter) {
    const format = formatter ?? this.formatter;

    return {
      raw: { hour: this.hour.get().raw, minute: this.minute.get().raw },
      formatted: format(this.hour, this.minute),
    };
  }

  equals(another: Clock): boolean {
    return (
      this.hour.get().raw === another.get().raw.hour && this.minute.get().raw === another.get().raw.minute
    );
  }

  isAfter(another: Clock): boolean {
    if (this.hour.get().raw > another.hour.get().raw) {
      return true;
    }

    if (this.hour.get().raw === another.hour.get().raw && this.minute.get().raw > another.minute.get().raw) {
      return true;
    }

    return false;
  }

  isBefore(another: Clock): boolean {
    if (this.hour.get().raw < another.hour.get().raw) {
      return true;
    }

    if (this.hour.get().raw === another.hour.get().raw && this.minute.get().raw < another.minute.get().raw) {
      return true;
    }

    return false;
  }
}
