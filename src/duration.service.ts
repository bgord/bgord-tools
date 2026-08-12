import * as v from "valibot";
import { DurationMs, type DurationMsType } from "./duration-ms.vo";
import type { MultiplicationFactorType } from "./multiplication-factor.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";

export class Duration {
  private static readonly rounding: RoundingStrategy = new RoundingDecimalStrategy(2);
  private readonly internal: DurationMsType;

  private static readonly NS_IN_MS = 1000000;
  private static readonly MS_IN_SECOND = 1_000;
  private static readonly MS_IN_MINUTE = 60 * Duration.MS_IN_SECOND;
  private static readonly MS_IN_HOUR = 60 * Duration.MS_IN_MINUTE;
  private static readonly MS_IN_DAY = 24 * Duration.MS_IN_HOUR;
  private static readonly MS_IN_WEEK = 7 * Duration.MS_IN_DAY;

  static readonly MIN = Duration.Ms(1);
  static readonly ZERO = Duration.Ms(0);

  constructor(candidateMs: number) {
    this.internal = v.parse(DurationMs, candidateMs);
  }

  static Weeks(value: number): Duration {
    return new Duration(Math.round(value * Duration.MS_IN_WEEK));
  }
  static Days(value: number): Duration {
    return new Duration(Math.round(value * Duration.MS_IN_DAY));
  }
  static Hours(value: number): Duration {
    return new Duration(Math.round(value * Duration.MS_IN_HOUR));
  }
  static Minutes(value: number): Duration {
    return new Duration(Math.round(value * Duration.MS_IN_MINUTE));
  }
  static Seconds(value: number): Duration {
    return new Duration(Math.round(value * Duration.MS_IN_SECOND));
  }
  // Milliseconds are the storage unit, so there is nothing to round - a fraction is a mistake
  static Ms(value: number): Duration {
    return new Duration(value);
  }
  static Ns(value: number): Duration {
    return new Duration(Math.round(value / Duration.NS_IN_MS));
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
  get ns(): number {
    return this.internal * Duration.NS_IN_MS;
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
  times(factor: MultiplicationFactorType): Duration {
    return Duration.Ms(Math.round(this.internal * factor));
  }

  toAbsolute(): Duration {
    return Duration.Ms(Math.abs(this.internal));
  }

  toString(): string {
    return this.internal.toString();
  }

  toJSON(): number {
    return this.internal;
  }
}
