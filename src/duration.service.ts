import { DurationMs, type DurationMsType } from "./duration-ms.vo";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export class Duration {
  private static readonly rounding: RoundingPort = new RoundToDecimal(2);
  private readonly internal: DurationMsType;

  private static readonly MS_IN_SECOND = 1_000;
  private static readonly MS_IN_MINUTE = 60 * Duration.MS_IN_SECOND;
  private static readonly MS_IN_HOUR = 60 * Duration.MS_IN_MINUTE;
  private static readonly MS_IN_DAY = 24 * Duration.MS_IN_HOUR;
  private static readonly MS_IN_WEEK = 7 * Duration.MS_IN_DAY;

  private constructor(candidateMs: number) {
    this.internal = DurationMs.parse(candidateMs);
  }

  static Weeks(value: number): Duration {
    return new Duration(value * Duration.MS_IN_WEEK);
  }

  static Days(value: number): Duration {
    return new Duration(value * Duration.MS_IN_DAY);
  }
  static Hours(value: number): Duration {
    return new Duration(value * Duration.MS_IN_HOUR);
  }
  static Minutes(value: number): Duration {
    return new Duration(value * Duration.MS_IN_MINUTE);
  }
  static Seconds(value: number): Duration {
    return new Duration(value * Duration.MS_IN_SECOND);
  }
  static Ms(value: number): Duration {
    return new Duration(value);
  }

  get weeks(): number {
    return Duration.rounding.round(this.internal / Duration.MS_IN_WEEK);
  }

  get days(): number {
    return Duration.rounding.round(this.internal / Duration.MS_IN_DAY);
  }
  get hours(): number {
    return Duration.rounding.round(this.internal / Duration.MS_IN_HOUR);
  }
  get minutes(): number {
    return Duration.rounding.round(this.internal / Duration.MS_IN_MINUTE);
  }
  get seconds(): number {
    return Duration.rounding.round(this.internal / Duration.MS_IN_SECOND);
  }
  get ms(): DurationMsType {
    return this.internal;
  }

  isLongerThan(another: Duration): boolean {
    return this.internal > another.internal;
  }
  isShorterThan(another: Duration): boolean {
    return this.internal < another.internal;
  }

  equals(other: Duration): boolean {
    return this.internal === other.internal;
  }
  add(another: Duration): Duration {
    return Duration.Ms(this.internal + another.internal);
  }
  subtract(another: Duration): Duration {
    return Duration.Ms(this.internal - another.internal);
  }

  toAbsolute(): Duration {
    return Duration.Ms(Math.abs(this.internal));
  }
}
