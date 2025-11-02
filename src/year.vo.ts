import { addYears, endOfYear, getYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  static fromTimestamp(timestamp: TimestampValueType): Year {
    const start = TimestampValue.parse(startOfYear(timestamp).getTime());
    const end = TimestampValue.parse(endOfYear(timestamp).getTime());

    return new Year(start, end);
  }

  static fromNow(now: TimestampValueType): Year {
    return Year.fromTimestamp(now);
  }

  static fromNumber(candidate: number): Year {
    return Year.fromIsoId(YearIsoId.parse(String(candidate)));
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    const reference = Date.UTC(Number(isoId));

    return Year.fromTimestamp(TimestampValue.parse(reference));
  }

  toIsoId(): YearIsoIdType {
    return YearIsoId.parse(String(getYear(this.getStart())));
  }

  isLeapYear(): boolean {
    const year = getYear(this.getStart());

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  previous(): Year {
    return this.shift(-1);
  }

  next(): Year {
    return this.shift(1);
  }

  shift(count: number): Year {
    const shifted = addYears(this.getStart(), count).getTime();

    return Year.fromTimestamp(TimestampValue.parse(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
