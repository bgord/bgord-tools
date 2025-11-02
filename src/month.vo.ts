import { endOfMonth, format, getMonth, setMonth, startOfMonth } from "date-fns";
import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Timestamp } from "./timestamp.vo";

export class Month extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Month {
    const start = Timestamp.fromNumber(startOfMonth(timestamp.get()).getTime());
    const end = Timestamp.fromNumber(endOfMonth(timestamp.get()).getTime());

    return new Month(start, end);
  }

  static fromNow(now: Timestamp): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = MonthIsoId.parse(iso).split("-").map(Number);

    const reference = setMonth(Date.UTC(year), month - 1).getTime();

    return Month.fromTimestamp(Timestamp.fromNumber(reference));
  }

  toIsoId(): MonthIsoIdType {
    return MonthIsoId.parse(format(this.getStart().get(), "yyyy-MM"));
  }

  previous(): Month {
    return this.shift(-1);
  }

  next(): Month {
    return this.shift(1);
  }

  shift(count: number): Month {
    const shifted = setMonth(this.getStart().get(), getMonth(this.getStart().get()) + count).getTime();

    return Month.fromTimestamp(Timestamp.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
