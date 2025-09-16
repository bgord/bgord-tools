import { endOfYear, getYear, setYear, startOfYear } from "date-fns";
import { DateRange } from "./date-range.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  toIsoId(): YearIsoIdType {
    return String(getYear(this.getStart())) as YearIsoIdType;
  }

  static fromTimestamp(timestamp: TimestampType): Year {
    const start = Timestamp.parse(startOfYear(timestamp).getTime());
    const end = Timestamp.parse(endOfYear(timestamp).getTime());
    return new Year(start, end);
  }

  static fromNow(now: TimestampType): Year {
    return Year.fromTimestamp(now);
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    const year = Number(YearIsoId.parse(isoId));
    const reference = setYear(new Date(Date.UTC(1970, 0, 1)), year);
    return Year.fromTimestamp(Timestamp.parse(reference.getTime()));
  }
}
