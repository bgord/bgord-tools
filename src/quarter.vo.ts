import { endOfQuarter, getQuarter, getYear, setQuarter, startOfQuarter } from "date-fns";
import { DateRange } from "./date-range.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Quarter extends DateRange {
  toIsoId(): QuarterIsoIdType {
    const year = getYear(this.getStart());
    const quarter = getQuarter(this.getStart());

    return `${year}-Q${quarter}` as QuarterIsoIdType;
  }

  static fromTimestamp(timestamp: TimestampType): Quarter {
    const start = Timestamp.parse(startOfQuarter(timestamp).getTime());
    const end = Timestamp.parse(endOfQuarter(timestamp).getTime());

    return new Quarter(start, end);
  }

  static fromNow(now: TimestampType): Quarter {
    return Quarter.fromTimestamp(now);
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = QuarterIsoId.parse(isoId).split("-Q").map(Number);
    const reference = setQuarter(new Date(Date.UTC(year, 0, 1)), quarter);

    return Quarter.fromTimestamp(Timestamp.parse(reference.getTime()));
  }
}
