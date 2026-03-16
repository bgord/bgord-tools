import { addWeeks, endOfISOWeek, getISOWeek, getISOWeekYear, startOfISOWeek } from "date-fns";
import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Duration } from "./duration.service";
import { Integer, type IntegerType } from "./integer.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Week {
    const start = Timestamp.fromNumber(startOfISOWeek(timestamp.ms).getTime());
    const end = Timestamp.fromNumber(endOfISOWeek(timestamp.ms).getTime());

    return new Week(start, end);
  }

  static fromTimestampValue(timestamp: TimestampValueType): Week {
    return Week.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Week {
    return Week.fromTimestamp(now);
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [year, week] = v.parse(WeekIsoId, isoId).split("-W").map(Number);

    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const januaryFourth = Timestamp.fromNumber(Date.UTC(year, 0, 4));
    const firstWeekStart = Timestamp.fromNumber(startOfISOWeek(januaryFourth.ms).getTime());

    return Week.fromTimestamp(firstWeekStart.add(Duration.Weeks(week - 1)));
  }

  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart().ms);
    const week = getISOWeek(this.getStart().ms);

    return v.parse(WeekIsoId, `${year}-W${String(week).padStart(2, "0")}`);
  }

  previous(): Week {
    return this.shift(v.parse(Integer, -1));
  }

  next(): Week {
    return this.shift(v.parse(Integer, 1));
  }

  shift(count: IntegerType): Week {
    const shifted = addWeeks(this.getStart().ms, count).getTime();

    return Week.fromTimestamp(Timestamp.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
