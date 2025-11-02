import { endOfMonth, format, getMonth, setMonth, startOfMonth } from "date-fns";
import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Month extends DateRange {
  static fromTimestamp(timestamp: TimestampValueType): Month {
    const start = TimestampValue.parse(startOfMonth(timestamp).getTime());
    const end = TimestampValue.parse(endOfMonth(timestamp).getTime());

    return new Month(start, end);
  }

  static fromNow(now: TimestampValueType): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = MonthIsoId.parse(iso).split("-").map(Number);

    const reference = setMonth(Date.UTC(year), month - 1).getTime();

    return Month.fromTimestamp(TimestampValue.parse(reference));
  }

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
    const shifted = setMonth(this.getStart(), getMonth(this.getStart()) + count).getTime();

    return Month.fromTimestamp(TimestampValue.parse(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
