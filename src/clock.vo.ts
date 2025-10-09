import { type ClockFormatter, ClockFormatters } from "./clock-format.service";
import { Hour } from "./hour.vo";
import { Minute } from "./minute.vo";
import type { TimestampType } from "./timestamp.vo";

export class Clock {
  private readonly formatter: ClockFormatter;

  constructor(
    private readonly hour: Hour,
    private readonly minute: Minute,
    formatter?: ClockFormatter,
  ) {
    this.formatter = (formatter as ClockFormatter) ?? ClockFormatters.TWENTY_FOUR_HOURS;
  }

  static fromEpochMs(timestamp: TimestampType, formatter?: ClockFormatter): Clock {
    const hour = Hour.fromEpochMs(timestamp);
    const minute = Minute.fromEpochMs(timestamp);

    return new Clock(hour, minute, formatter);
  }

  get(): { hour: number; minute: number } {
    return { hour: this.hour.get(), minute: this.minute.get() };
  }

  format(formatter?: ClockFormatter): string {
    const chosen = formatter ?? this.formatter;

    return chosen(this.hour, this.minute);
  }

  toString(): string {
    return this.format();
  }

  equals(another: Clock): boolean {
    return this.hour.get() === another.hour.get() && this.minute.get() === another.minute.get();
  }

  isAfter(another: Clock): boolean {
    if (this.hour.get() !== another.hour.get()) return this.hour.get() > another.hour.get();
    return this.minute.get() > another.minute.get();
  }

  isBefore(another: Clock): boolean {
    if (this.hour.get() !== another.hour.get()) return this.hour.get() < another.hour.get();
    return this.minute.get() < another.minute.get();
  }
}
