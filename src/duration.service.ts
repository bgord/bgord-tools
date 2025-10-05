import { z } from "zod/v4";
import { RoundToDecimal } from "./rounding.adapter";
import type { TimestampType } from "./timestamp.vo";

export const DurationMsError = { error: "duration.invalid" };

export const DurationMsSchema = z
  .number(DurationMsError)
  .int(DurationMsError)
  .refine(Number.isFinite, DurationMsError)
  .brand("DurationMs");

export type DurationMsType = z.infer<typeof DurationMsSchema>;

const rounding = new RoundToDecimal(2);

export interface DurationResultInterface {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly ms: DurationMsType;

  isAfter(another: DurationResultInterface): boolean;
  isBefore(another: DurationResultInterface): boolean;

  add(another: DurationResultInterface): DurationResultInterface;
  subtract(another: DurationResultInterface): DurationResultInterface;
}

export class DurationResult implements DurationResultInterface {
  private readonly valueMs: DurationMsType;

  constructor(candidate: number) {
    this.valueMs = DurationMsSchema.parse(candidate);
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

  get ms(): DurationMsType {
    return this.valueMs;
  }

  isAfter(another: DurationResultInterface): boolean {
    return this.valueMs > another.ms;
  }

  isBefore(another: DurationResultInterface): boolean {
    return this.valueMs < another.ms;
  }

  add(another: DurationResultInterface): DurationResultInterface {
    return new DurationResult(this.valueMs + another.ms);
  }

  subtract(another: DurationResultInterface): DurationResultInterface {
    return new DurationResult(this.valueMs - another.ms);
  }
}

export class Duration {
  static Days(value: number): DurationResultInterface {
    return new DurationResult(value * 86_400_000);
  }

  static Hours(value: number): DurationResultInterface {
    return new DurationResult(value * 3_600_000);
  }

  static Minutes(value: number): DurationResultInterface {
    return new DurationResult(value * 60_000);
  }

  static Seconds(value: number): DurationResultInterface {
    return new DurationResult(value * 1_000);
  }

  static Ms(value: number): DurationResultInterface {
    return new DurationResult(value);
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
