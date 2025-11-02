import { endOfMonth, format, getMonth, setMonth, startOfMonth } from "date-fns";
import { DateRange } from "./date-range.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { TimestampVO } from "./timestamp.vo";

export class Month extends DateRange {
  static fromTimestamp(timestamp: TimestampVO): Month {
    const start = TimestampVO.fromNumber(startOfMonth(timestamp.ms).getTime());
    const end = TimestampVO.fromNumber(endOfMonth(timestamp.ms).getTime());

    return new Month(start, end);
  }

  static fromNow(now: TimestampVO): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = MonthIsoId.parse(iso).split("-").map(Number);

    const reference = setMonth(Date.UTC(year), month - 1).getTime();

    return Month.fromTimestamp(TimestampVO.fromNumber(reference));
  }

  toIsoId(): MonthIsoIdType {
    return MonthIsoId.parse(format(this.getStart().ms, "yyyy-MM"));
  }

  previous(): Month {
    return this.shift(-1);
  }

  next(): Month {
    return this.shift(1);
  }

  shift(count: number): Month {
    const shifted = setMonth(this.getStart().ms, getMonth(this.getStart().ms) + count).getTime();

    return Month.fromTimestamp(TimestampVO.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
