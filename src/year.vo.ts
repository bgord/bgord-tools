import { addYears, endOfYear, getYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

// TODO
export const YearInvalidIntegerError = "year.invalid_integer" as const;
export const YearOutOfRangeError = "year.out_of_range" as const;

export class Year extends DateRange {
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

    return Year.fromTimestamp(Timestamp.parse(shifted));
  }

  static fromTimestamp(timestamp: TimestampType): Year {
    const start = Timestamp.parse(startOfYear(timestamp).getTime());
    const end = Timestamp.parse(endOfYear(timestamp).getTime());

    return new Year(start, end);
  }

  static fromNow(now: TimestampType): Year {
    return Year.fromTimestamp(now);
  }

  static fromNumber(candidate: number): Year {
    if (!Number.isInteger(candidate)) throw new Error(YearInvalidIntegerError);
    if (candidate < 0 || candidate > 9999) throw new Error(YearOutOfRangeError);

    const reference = Timestamp.parse(Date.UTC(candidate));

    return Year.fromTimestamp(reference);
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    return Year.fromNumber(Number(YearIsoId.parse(isoId)));
  }
}
