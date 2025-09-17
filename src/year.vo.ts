import { endOfYear, getYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  toIsoId(): YearIsoIdType {
    return String(getYear(this.getStart())) as YearIsoIdType;
  }

  isLeapYear(): boolean {
    const year = getYear(this.getStart());
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static fromTimestamp(timestamp: TimestampType): Year {
    const start = Timestamp.parse(startOfYear(timestamp).getTime());
    const end = Timestamp.parse(endOfYear(timestamp).getTime());
    return new Year(start, end);
  }

  static fromNow(now: TimestampType): Year {
    return Year.fromTimestamp(now);
  }

  static fromNumber(value: number): Year {
    if (!Number.isInteger(value)) throw new Error("year.invalid_integer");
    if (value < 0 || value > 9999) throw new Error("year.out_of_range");
    const reference = Timestamp.parse(Date.UTC(value, 0, 1, 0, 0, 0, 0));
    return Year.fromTimestamp(reference);
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    return Year.fromNumber(Number(YearIsoId.parse(isoId)));
  }
}
