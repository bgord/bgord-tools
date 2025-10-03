import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Month extends DateRange {
  toIsoId(): MonthIsoIdType {
    return new Date(this.getStart()).toISOString().slice(0, 7) as MonthIsoIdType;
  }

  previous(): Month {
    return Month.fromTimestamp(Timestamp.parse(this.getStart() - 1));
  }

  next(): Month {
    return Month.fromTimestamp(Timestamp.parse(this.getEnd() + 1));
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
    const startUtc = Date.parse(`${validated}-01T00:00:00.000Z`);

    return Month.fromTimestamp(Timestamp.parse(startUtc));
  }
}
