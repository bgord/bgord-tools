import { addWeeks, endOfISOWeek, getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  static fromTimestamp(timestamp: TimestampType): Week {
    const start = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const end = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    return new Week(start, end);
  }

  static fromNow(now: TimestampType): Week {
    return Week.fromTimestamp(now);
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [year, week] = WeekIsoId.parse(isoId).split("-W").map(Number);

    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const reference = setISOWeek(Date.UTC(year, 0, 4), week).getTime();

    return Week.fromTimestamp(Timestamp.parse(reference));
  }

  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart());
    const week = getISOWeek(this.getStart());

    return WeekIsoId.parse(`${year}-W${String(week).padStart(2, "0")}`);
  }

  previous(): Week {
    return this.shift(-1);
  }

  next(): Week {
    return this.shift(1);
  }

  shift(count: number): Week {
    const shifted = addWeeks(this.getStart(), count).getTime();

    return Week.fromTimestamp(Timestamp.parse(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }

  toJSON(): { start: number; end: number } {
    return { start: this.getStart(), end: this.getEnd() };
  }
}
