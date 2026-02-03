import type { Timestamp } from "./timestamp.vo";

export const DateRangeError = { Invalid: "date.range.invalid" };

export class DateRange {
  constructor(
    private readonly start: Timestamp,
    private readonly end: Timestamp,
  ) {
    if (start.isAfterOrEqual(end)) throw new Error(DateRangeError.Invalid);
  }

  getStart(): Timestamp {
    return this.start;
  }

  getEnd(): Timestamp {
    return this.end;
  }

  toRange(): [Timestamp, Timestamp] {
    return [this.start, this.end];
  }

  contains(timestamp: Timestamp): boolean {
    return timestamp.isAfterOrEqual(this.start) && timestamp.isBeforeOrEqual(this.end);
  }

  equals(other: DateRange): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end);
  }

  toJSON(): { start: number; end: number } {
    return { start: this.getStart().ms, end: this.getEnd().ms };
  }
}
