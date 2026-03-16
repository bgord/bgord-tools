import { endOfYear, getYear, startOfYear } from "date-fns";
import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Integer, type IntegerType } from "./integer.vo";
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
    return Year.fromIsoId(v.parse(YearIsoId, String(candidate)));
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    const year = Number(isoId);

    return new Year(
      Timestamp.fromNumber(Date.UTC(year, 0, 1)),
      Timestamp.fromNumber(Date.UTC(year + 1, 0, 1) - 1),
    );
  }

  toIsoId(): YearIsoIdType {
    return v.parse(YearIsoId, String(getYear(this.getStart().ms)));
  }

  isLeapYear(): boolean {
    const year = getYear(this.getStart().ms);

    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    return year % 4 === 0;
  }

  previous(): Year {
    return this.shift(Integer.parse(-1));
  }

  next(): Year {
    return this.shift(Integer.parse(1));
  }

  shift(count: IntegerType): Year {
    const year = getYear(this.getStart().ms) + count;

    // TODO?
    return Year.fromNumber(year);
  }

  toString(): string {
    return this.toIsoId();
  }
}
