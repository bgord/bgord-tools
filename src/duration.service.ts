import { RoundToDecimal } from "./rounding.adapter";
import type { TimestampType } from "./timestamp.vo";

const rounding = new RoundToDecimal(2);

export interface DurationResultInterface {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly ms: TimestampType;

  isAfter(another: DurationResultInterface): boolean;
  isBefore(another: DurationResultInterface): boolean;

  add(another: DurationResultInterface): DurationResultInterface;
  subtract(another: DurationResultInterface): DurationResultInterface;
}

export class DurationResult implements DurationResultInterface {
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

  isAfter(another: DurationResultInterface): boolean {
    return this.valueMs > another.ms;
  }

  isBefore(another: DurationResultInterface): boolean {
    return this.valueMs < another.ms;
  }

  add(another: DurationResultInterface): DurationResultInterface {
    return new DurationResult((this.valueMs + another.ms) as TimestampType);
  }

  subtract(another: DurationResultInterface): DurationResultInterface {
    return new DurationResult((this.valueMs - another.ms) as TimestampType);
  }
}

export class Duration {
  static Days(value: number): DurationResultInterface {
    return new DurationResult((value * 86_400_000) as TimestampType);
  }

  static Hours(value: number): DurationResultInterface {
    return new DurationResult((value * 3_600_000) as TimestampType);
  }

  static Minutes(value: number): DurationResultInterface {
    return new DurationResult((value * 60_000) as TimestampType);
  }

  static Seconds(value: number): DurationResultInterface {
    return new DurationResult((value * 1_000) as TimestampType);
  }

  static Ms(value: number): DurationResultInterface {
    return new DurationResult(value as TimestampType);
  }

  static Now(now: TimestampType) {
    return {
      Minus(time: DurationResultInterface): DurationResultInterface {
        return Duration.Ms(now - time.ms);
      },
      Add(time: DurationResultInterface): DurationResultInterface {
        return Duration.Ms(now + time.ms);
      },
    };
  }
}
