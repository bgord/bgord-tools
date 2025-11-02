import { addYears, endOfYear, getYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Year {
    const start = Timestamp.fromNumber(startOfYear(timestamp.ms).getTime());
    const end = Timestamp.fromNumber(endOfYear(timestamp.ms).getTime());

    return new Year(start, end);
  }

  static fromTimestampValue(timestamp: TimestampValueType): Year {
    return Year.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Year {
    return Year.fromTimestamp(now);
  }

  static fromNumber(candidate: number): Year {
    return Year.fromIsoId(YearIsoId.parse(String(candidate)));
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    const reference = Date.UTC(Number(isoId));

    return Year.fromTimestamp(Timestamp.fromNumber(reference));
  }

  toIsoId(): YearIsoIdType {
    return YearIsoId.parse(String(getYear(this.getStart().ms)));
  }

  isLeapYear(): boolean {
    const year = getYear(this.getStart().ms);

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  previous(): Year {
    return this.shift(-1);
  }

  next(): Year {
    return this.shift(1);
  }

  shift(count: number): Year {
    const shifted = addYears(this.getStart().ms, count).getTime();

    return Year.fromTimestamp(Timestamp.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
