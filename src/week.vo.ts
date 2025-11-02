import { addWeeks, endOfISOWeek, getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from "date-fns";
import { DateRange } from "./date-range.vo";
import { TimestampVO } from "./timestamp.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  static fromTimestamp(timestamp: TimestampVO): Week {
    const start = TimestampVO.fromNumber(startOfISOWeek(timestamp.ms()).getTime());
    const end = TimestampVO.fromNumber(endOfISOWeek(timestamp.ms()).getTime());

    return new Week(start, end);
  }

  static fromNow(now: TimestampVO): Week {
    return Week.fromTimestamp(now);
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [year, week] = WeekIsoId.parse(isoId).split("-W").map(Number);

    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const reference = setISOWeek(Date.UTC(year, 0, 4), week).getTime();

    return Week.fromTimestamp(TimestampVO.fromNumber(reference));
  }

  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart().ms());
    const week = getISOWeek(this.getStart().ms());

    return WeekIsoId.parse(`${year}-W${String(week).padStart(2, "0")}`);
  }

  previous(): Week {
    return this.shift(-1);
  }

  next(): Week {
    return this.shift(1);
  }

  shift(count: number): Week {
    const shifted = addWeeks(this.getStart().ms(), count).getTime();

    return Week.fromTimestamp(TimestampVO.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
