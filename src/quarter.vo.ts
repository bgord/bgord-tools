import { endOfQuarter, getQuarter, getYear, setQuarter, startOfQuarter } from "date-fns";
import { DateRange } from "./date-range.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Quarter extends DateRange {
  static fromTimestamp(timestamp: TimestampValueType): Quarter {
    const start = TimestampValue.parse(startOfQuarter(timestamp).getTime());
    const end = TimestampValue.parse(endOfQuarter(timestamp).getTime());

    return new Quarter(start, end);
  }

  static fromNow(now: TimestampValueType): Quarter {
    return Quarter.fromTimestamp(now);
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = QuarterIsoId.parse(isoId).split("-Q").map(Number);

    const reference = setQuarter(Date.UTC(year), quarter).getTime();

    return Quarter.fromTimestamp(TimestampValue.parse(reference));
  }

  toIsoId(): QuarterIsoIdType {
    const year = getYear(this.getStart());
    const quarter = getQuarter(this.getStart());

    return QuarterIsoId.parse(`${year}-Q${quarter}`);
  }

  toString(): string {
    return this.toIsoId();
  }
}
