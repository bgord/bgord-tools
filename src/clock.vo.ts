import { type ClockFormatter, ClockFormatters } from "./clock-format.service";
import { Hour } from "./hour.vo";
import type { HourSchemaType } from "./hour-schema.vo";
import { Minute } from "./minute.vo";
import type { MinuteSchemaType } from "./minute-schema.vo";
import type { Timestamp } from "./timestamp.vo";

export class Clock {
  private readonly formatter: ClockFormatter;

  constructor(
    private readonly hour: Hour,
    private readonly minute: Minute,
    formatter?: ClockFormatter,
  ) {
    this.formatter = formatter ?? ClockFormatters.TWENTY_FOUR_HOURS;
  }

  static fromTimestamp(timestamp: Timestamp, formatter?: ClockFormatter): Clock {
    const hour = Hour.fromTimestamp(timestamp);
    const minute = Minute.fromTimestamp(timestamp);

    return new Clock(hour, minute, formatter);
  }

  get(): { hour: HourSchemaType; minute: MinuteSchemaType } {
    return { hour: this.hour.get(), minute: this.minute.get() };
  }

  format(): string {
    return this.formatter(this.hour, this.minute);
  }

  equals(another: Clock): boolean {
    return this.hour.equals(another.hour) && this.minute.equals(another.minute);
  }

  isAfter(another: Clock): boolean {
    if (!this.hour.equals(another.hour)) return this.hour.isAfter(another.hour);
    return this.minute.isAfter(another.minute);
  }

  isBefore(another: Clock): boolean {
    if (!this.hour.equals(another.hour)) return this.hour.isBefore(another.hour);
    return this.minute.isBefore(another.minute);
  }

  toString(): string {
    return this.format();
  }

  toJSON(): { hour: HourSchemaType; minute: MinuteSchemaType } {
    return this.get();
  }
}
