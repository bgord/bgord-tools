import { addMonths, endOfMonth, startOfMonth } from "date-fns";
import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Month extends DateRange {
  toIsoId(): MonthIsoIdType {
    return new Date(this.getStart()).toISOString().slice(0, 7) as MonthIsoIdType;
  }

  previous(): Month {
    const shifted = addMonths(new Date(this.getStart()), -1).getTime();
    return Month.fromTimestamp(Timestamp.parse(shifted));
  }

  next(): Month {
    const shifted = addMonths(new Date(this.getStart()), 1).getTime();
    return Month.fromTimestamp(Timestamp.parse(shifted));
  }

  shift(count: number): Month {
    const shifted = addMonths(new Date(this.getStart()), count).getTime();
    return Month.fromTimestamp(Timestamp.parse(shifted));
  }

  static fromTimestamp(timestamp: TimestampType): Month {
    const start = Timestamp.parse(startOfMonth(timestamp).getTime());
    const end = Timestamp.parse(endOfMonth(timestamp).getTime());
    return new Month(start, end);
  }

  static fromNow(now: TimestampType): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = MonthIsoId.parse(iso).split("-").map(Number);
    const reference = new Date(Date.UTC(year, month - 1, 1));
    return Month.fromTimestamp(Timestamp.parse(reference.getTime()));
  }
}
