import { addWeeks, endOfISOWeek, getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

// TODO
export class Week extends DateRange {
  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart());
    const week = getISOWeek(this.getStart()).toString().padStart(2, "0");

    return WeekIsoId.parse(`${year}-W${week}`);
  }

  previous(): Week {
    const shifted = addWeeks(new Date(this.getStart()), -1).getTime();

    return Week.fromTimestamp(Timestamp.parse(shifted));
  }

  next(): Week {
    const shifted = addWeeks(new Date(this.getStart()), 1).getTime();

    return Week.fromTimestamp(Timestamp.parse(shifted));
  }

  shift(count: number): Week {
    const shifted = addWeeks(new Date(this.getStart()), count).getTime();

    return Week.fromTimestamp(Timestamp.parse(shifted));
  }

  static fromTimestamp(timestamp: TimestampType): Week {
    const start = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const end = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    return new Week(start, end);
  }

  static fromNow(now: TimestampType): Week {
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
