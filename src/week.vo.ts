import { endOfISOWeek, getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, TimestampType } from "./timestamp.vo";
import { WeekIsoId, WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  constructor(start: TimestampType, end: TimestampType) {
    super(start, end);
  }

  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart());
    const week = getISOWeek(this.getStart()).toString().padStart(2, "0");

    return `${year}-W${week}`;
  }

  static fromTimestamp(timestamp: TimestampType): Week {
    const start = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const end = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    return new Week(start, end);
  }

  static fromNow(now: TimestampType = Timestamp.parse(Date.now())): Week {
    return Week.fromTimestamp(now);
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [yearPart, weekPart] = WeekIsoId.parse(isoId).split("-W");

    const year = Number(yearPart);
    const week = Number(weekPart);

    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const reference = setISOWeek(new Date(Date.UTC(year, 0, 4)), week);

    return Week.fromTimestamp(Timestamp.parse(reference.getTime()));
  }
}
