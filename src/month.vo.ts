import { endOfMonth, format, setMonth, startOfMonth } from "date-fns";
import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Month extends DateRange {
  toIsoId(): MonthIsoIdType {
    return MonthIsoId.parse(format(this.getStart(), "yyyy-MM"));
  }

  previous(): Month {
    return this.shift(-1);
  }

  next(): Month {
    return this.shift(1);
  }

  shift(count: number): Month {
    const date = new Date(this.getStart());
    date.setUTCMonth(date.getUTCMonth() + count);

    return Month.fromTimestamp(Timestamp.parse(date.getTime()));
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

    const reference = setMonth(Date.UTC(year), month - 1).getTime();

    return Month.fromTimestamp(Timestamp.parse(reference));
  }
}
