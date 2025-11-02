import type { TimestampValueType } from "./timestamp-value.vo";

export const DateRangeError = { Invalid: "date.range.invalid" } as const;

export class DateRange {
  constructor(
    private readonly start: TimestampValueType,
    private readonly end: TimestampValueType,
  ) {
    if (start > end) throw new Error(DateRangeError.Invalid);
  }

  getStart(): TimestampValueType {
    return this.start;
  }

  getEnd(): TimestampValueType {
    return this.end;
  }

  toRange(): [TimestampValueType, TimestampValueType] {
    return [this.start, this.end];
  }

  contains(timestamp: TimestampValueType): boolean {
    return timestamp >= this.start && timestamp <= this.end;
  }

  equals(other: DateRange): boolean {
    return this.start === other.start && this.end === other.end;
  }

  toJSON(): { start: number; end: number } {
    return { start: this.getStart(), end: this.getEnd() };
  }
}
