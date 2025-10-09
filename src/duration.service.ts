import { DurationMs, type DurationMsType } from "./duration-ms.vo";
import { RoundToDecimal } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Duration {
  private static readonly rounding: RoundingPort = new RoundToDecimal(2);
  private readonly valueMs: DurationMsType;

  private static readonly MS_IN_SECOND = 1_000;
  private static readonly MS_IN_MINUTE = 60_000;
  private static readonly MS_IN_HOUR = 3_600_000;
  private static readonly MS_IN_DAY = 86_400_000;

  private constructor(candidateMs: number) {
    this.valueMs = DurationMs.parse(candidateMs);
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

  get days(): number {
    return Duration.rounding.round(this.valueMs / Duration.MS_IN_DAY);
  }
  get hours(): number {
    return Duration.rounding.round(this.valueMs / Duration.MS_IN_HOUR);
  }
  get minutes(): number {
    return Duration.rounding.round(this.valueMs / Duration.MS_IN_MINUTE);
  }
  get seconds(): number {
    return Duration.rounding.round(this.valueMs / Duration.MS_IN_SECOND);
  }
  get ms(): DurationMsType {
    return this.valueMs;
  }

  isLongerThan(another: Duration): boolean {
    return this.valueMs > another.valueMs;
  }
  isShorterThan(another: Duration): boolean {
    return this.valueMs < another.valueMs;
  }

  equals(other: Duration): boolean {
    return this.valueMs === other.valueMs;
  }
  add(another: Duration): Duration {
    return Duration.Ms(this.valueMs + another.valueMs);
  }
  subtract(another: Duration): Duration {
    return Duration.Ms(this.valueMs - another.valueMs);
  }
}

export const Time = {
  Now(now: TimestampType) {
    return {
      Add(duration: Duration): TimestampType {
        return Timestamp.parse(now + duration.ms);
      },
      Minus(duration: Duration): TimestampType {
        return Timestamp.parse(now - duration.ms);
      },
    };
  },
};
