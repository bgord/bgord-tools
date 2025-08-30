import { RoundToDecimal } from "./rounding.service";
import type { TimestampType } from "./timestamp.vo";

const rounding = new RoundToDecimal(2);

interface TimeResultInterface {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly ms: TimestampType;

  isAfter(another: TimeResultInterface): boolean;
  isBefore(another: TimeResultInterface): boolean;
}

export class TimeResult implements TimeResultInterface {
  constructor(
    readonly days: number,
    readonly hours: number,
    readonly minutes: number,
    readonly seconds: number,
    readonly ms: TimestampType,
  ) {}

  isAfter(another: TimeResultInterface): boolean {
    return this.ms > another.ms;
  }

  isBefore(another: TimeResultInterface): boolean {
    return this.ms < another.ms;
  }
}

export class Time {
  static Days(value: number): TimeResultInterface {
    return new TimeResult(
      value,
      value * 24,
      value * 24 * 60,
      value * 24 * 60 * 60,
      (value * 24 * 60 * 60 * 1000) as TimestampType,
    );
  }

  static Hours(value: number): TimeResultInterface {
    return new TimeResult(
      rounding.round(value / 24),
      value,
      value * 60,
      value * 60 * 60,
      (value * 60 * 60 * 1000) as TimestampType,
    );
  }

  static Minutes(value: number): TimeResultInterface {
    return new TimeResult(
      rounding.round(value / 60 / 24),
      rounding.round(value / 60),
      value,
      value * 60,
      (value * 60 * 1000) as TimestampType,
    );
  }

  static Seconds(value: number): TimeResultInterface {
    return new TimeResult(
      rounding.round(value / 60 / 60 / 24),
      rounding.round(value / 60 / 60),
      rounding.round(value / 60),
      value,
      (value * 1000) as TimestampType,
    );
  }

  static Ms(value: number): TimeResultInterface {
    return new TimeResult(
      rounding.round(value / 1000 / 60 / 60 / 24),
      rounding.round(value / 1000 / 60 / 60),
      rounding.round(value / 1000 / 60),
      rounding.round(value / 1000),
      value as TimestampType,
    );
  }

  static Now(now: TimestampType) {
    return {
      Minus(time: TimeResultInterface): TimeResultInterface {
        return Time.Ms(now - time.ms);
      },

      Add(time: TimeResultInterface): TimeResultInterface {
        return Time.Ms(now + time.ms);
      },
    };
  }
}
