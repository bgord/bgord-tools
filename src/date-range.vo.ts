import type { TimestampVO } from "./timestamp.vo";

export const DateRangeError = { Invalid: "date.range.invalid" } as const;

export class DateRange {
  constructor(
    private readonly start: TimestampVO,
    private readonly end: TimestampVO,
  ) {
    if (start.isAfter(end)) throw new Error(DateRangeError.Invalid);
  }

  getStart(): TimestampVO {
    return this.start;
  }

  getEnd(): TimestampVO {
    return this.end;
  }

  toRange(): [TimestampVO, TimestampVO] {
    return [this.start, this.end];
  }

  contains(timestamp: TimestampVO): boolean {
    return timestamp.isAfterOrEqual(this.start) && timestamp.isBeforeOrEqual(this.end);
  }

  equals(other: DateRange): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end);
  }

  toJSON(): { start: number; end: number } {
    return { start: this.getStart().ms(), end: this.getEnd().ms() };
  }
}
