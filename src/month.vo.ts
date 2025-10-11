import { format } from "date-fns";
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
    const isoMonth = new Date(timestamp).toISOString().slice(0, 7) as MonthIsoIdType;

    return Month.fromIsoId(isoMonth);
  }

  static fromNow(now: TimestampType): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const validated = MonthIsoId.parse(iso);
    const year = Number(validated.slice(0, 4));
    const monthIndex = Number(validated.slice(5, 7)) - 1;

    const startUtc = Date.UTC(year, monthIndex, 1);
    const nextStartUtc = Date.UTC(year, monthIndex + 1, 1);
    const endUtc = nextStartUtc - 1;

    return new Month(Timestamp.parse(startUtc), Timestamp.parse(endUtc));
  }
}
