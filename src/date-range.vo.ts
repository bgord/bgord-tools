import type { TimestampType } from "./timestamp.vo";

export const DateRangeInvalidError = "invalid.date.range" as const;

export class DateRange {
  constructor(
    private readonly start: TimestampType,
    private readonly end: TimestampType,
  ) {
    if (start > end) throw new Error(DateRangeInvalidError);
  }

  getStart(): TimestampType {
    return this.start;
  }

  getEnd(): TimestampType {
    return this.end;
  }

  toRange(): [TimestampType, TimestampType] {
    return [this.start, this.end];
  }

  contains(timestamp: TimestampType): boolean {
    return timestamp >= this.start && timestamp <= this.end;
  }

  equals(other: DateRange): boolean {
    return this.start === other.start && this.end === other.end;
  }
}
