import type { TimestampType } from "./timestamp.vo";

// TODO
export const MinuteValueError = "invalid.minute" as const;

export class Minute {
  private readonly value: number;

  static readonly ZERO = new Minute(0);
  static readonly MAX = new Minute(59);

  constructor(candidate: number) {
    if (!Number.isInteger(candidate) || candidate < 0 || candidate >= 60) {
      throw new Error(MinuteValueError);
    }
    this.value = candidate;
  }

  static fromEpochMs(timestamp: TimestampType): Minute {
    return new Minute(new Date(timestamp).getUTCMinutes());
  }

  get(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString().padStart(2, "0");
  }

  equals(another: Minute): boolean {
    return this.value === another.value;
  }

  isAfter(another: Minute): boolean {
    return this.value > another.value;
  }

  isBefore(another: Minute): boolean {
    return this.value < another.value;
  }

  static list(): readonly Minute[] {
    return Array.from({ length: 60 }, (_, index) => new Minute(index));
  }
}
