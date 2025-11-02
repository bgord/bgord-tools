import { endOfQuarter, getQuarter, getYear, setQuarter, startOfQuarter } from "date-fns";
import { DateRange } from "./date-range.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { TimestampVO } from "./timestamp.vo";

export class Quarter extends DateRange {
  static fromTimestamp(timestamp: TimestampVO): Quarter {
    const start = TimestampVO.fromNumber(startOfQuarter(timestamp.ms).getTime());
    const end = TimestampVO.fromNumber(endOfQuarter(timestamp.ms).getTime());

    return new Quarter(start, end);
  }

  static fromNow(now: TimestampVO): Quarter {
    return Quarter.fromTimestamp(now);
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = QuarterIsoId.parse(isoId).split("-Q").map(Number);

    const reference = setQuarter(Date.UTC(year), quarter).getTime();

    return Quarter.fromTimestamp(TimestampVO.fromNumber(reference));
  }

  toIsoId(): QuarterIsoIdType {
    const year = getYear(this.getStart().ms);
    const quarter = getQuarter(this.getStart().ms);

    return QuarterIsoId.parse(`${year}-Q${quarter}`);
  }

  toString(): string {
    return this.toIsoId();
  }
}
