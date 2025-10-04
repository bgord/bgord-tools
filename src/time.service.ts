import { RoundToDecimal } from "./rounding.adapter";
import type { TimestampType } from "./timestamp.vo";

const rounding = new RoundToDecimal(2);

export interface TimeResultInterface {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly ms: TimestampType;

  isAfter(another: TimeResultInterface): boolean;
  isBefore(another: TimeResultInterface): boolean;

  add(another: TimeResultInterface): TimeResultInterface;
  subtract(another: TimeResultInterface): TimeResultInterface;
}

export class TimeResult implements TimeResultInterface {
  private readonly valueMs: TimestampType;

  constructor(ms: TimestampType) {
    this.valueMs = ms;
  }

  get days(): number {
    return rounding.round(this.valueMs / 86_400_000);
  }

  get hours(): number {
    return rounding.round(this.valueMs / 3_600_000);
  }

  get minutes(): number {
    return rounding.round(this.valueMs / 60_000);
  }

  get seconds(): number {
    return rounding.round(this.valueMs / 1_000);
  }

  get ms(): TimestampType {
    return this.valueMs;
  }

  isAfter(another: TimeResultInterface): boolean {
    return this.valueMs > another.ms;
  }

  isBefore(another: TimeResultInterface): boolean {
    return this.valueMs < another.ms;
  }

  add(another: TimeResultInterface): TimeResultInterface {
    return new TimeResult((this.valueMs + another.ms) as TimestampType);
  }

  subtract(another: TimeResultInterface): TimeResultInterface {
    return new TimeResult((this.valueMs - another.ms) as TimestampType);
  }
}

export class Time {
  static Days(value: number): TimeResultInterface {
    return new TimeResult((value * 86_400_000) as TimestampType);
  }

  static Hours(value: number): TimeResultInterface {
    return new TimeResult((value * 3_600_000) as TimestampType);
  }

  static Minutes(value: number): TimeResultInterface {
    return new TimeResult((value * 60_000) as TimestampType);
  }

  static Seconds(value: number): TimeResultInterface {
    return new TimeResult((value * 1_000) as TimestampType);
  }

  static Ms(value: number): TimeResultInterface {
    return new TimeResult(value as TimestampType);
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
