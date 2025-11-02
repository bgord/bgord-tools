import { addWeeks, endOfISOWeek, getISOWeek, getISOWeekYear, setISOWeek, startOfISOWeek } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp } from "./timestamp.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Week {
    const start = Timestamp.fromNumber(startOfISOWeek(timestamp.get()).getTime());
    const end = Timestamp.fromNumber(endOfISOWeek(timestamp.get()).getTime());

    return new Week(start, end);
  }

  static fromNow(now: Timestamp): Week {
    return Week.fromTimestamp(now);
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [year, week] = WeekIsoId.parse(isoId).split("-W").map(Number);

    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const reference = setISOWeek(Date.UTC(year, 0, 4), week).getTime();

    return Week.fromTimestamp(Timestamp.fromNumber(reference));
  }

  toIsoId(): WeekIsoIdType {
    const year = getISOWeekYear(this.getStart().get());
    const week = getISOWeek(this.getStart().get());

    return WeekIsoId.parse(`${year}-W${String(week).padStart(2, "0")}`);
  }

  previous(): Week {
    return this.shift(-1);
  }

  next(): Week {
    return this.shift(1);
  }

  shift(count: number): Week {
    const shifted = addWeeks(this.getStart().get(), count).getTime();

    return Week.fromTimestamp(Timestamp.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
