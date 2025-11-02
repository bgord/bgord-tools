import { addYears, endOfYear, getYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp } from "./timestamp.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Year {
    const start = Timestamp.fromNumber(startOfYear(timestamp.get()).getTime());
    const end = Timestamp.fromNumber(endOfYear(timestamp.get()).getTime());

    return new Year(start, end);
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
    return YearIsoId.parse(String(getYear(this.getStart().get())));
  }

  isLeapYear(): boolean {
    const year = getYear(this.getStart().get());

    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  previous(): Year {
    return this.shift(-1);
  }

  next(): Year {
    return this.shift(1);
  }

  shift(count: number): Year {
    const shifted = addYears(this.getStart().get(), count).getTime();

    return Year.fromTimestamp(Timestamp.fromNumber(shifted));
  }

  toString(): string {
    return this.toIsoId();
  }
}
