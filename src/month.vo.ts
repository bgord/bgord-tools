import { endOfMonth, format, startOfMonth } from "date-fns";
import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Integer, type IntegerType } from "./integer.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Month extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Month {
    const start = Timestamp.fromNumber(startOfMonth(timestamp.ms).getTime());
    const end = Timestamp.fromNumber(endOfMonth(timestamp.ms).getTime());

    return new Month(start, end);
  }

  static fromTimestampValue(timestamp: TimestampValueType): Month {
    return Month.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = MonthIsoId.parse(iso).split("-").map(Number);

    const reference = Timestamp.fromNumber(Date.UTC(year, month - 1, 1));

    return Month.fromTimestamp(reference);
  }

  toIsoId(): MonthIsoIdType {
    return MonthIsoId.parse(format(this.getStart().ms, "yyyy-MM"));
  }

  previous(): Month {
    return this.shift(v.parse(Integer, -1));
  }

  next(): Month {
    return this.shift(v.parse(Integer, 1));
  }

  shift(count: IntegerType): Month {
    const start = new Date(this.getStart().ms);

    return Month.fromTimestamp(
      Timestamp.fromNumber(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + count, 1)),
    );
  }

  toString(): string {
    return this.toIsoId();
  }
}
