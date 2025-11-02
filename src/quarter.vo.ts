import { endOfQuarter, getQuarter, getYear, setQuarter, startOfQuarter } from "date-fns";
import { DateRange } from "./date-range.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { Timestamp } from "./timestamp.vo";

export class Quarter extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Quarter {
    const start = Timestamp.fromNumber(startOfQuarter(timestamp.get()).getTime());
    const end = Timestamp.fromNumber(endOfQuarter(timestamp.get()).getTime());

    return new Quarter(start, end);
  }

  static fromNow(now: Timestamp): Quarter {
    return Quarter.fromTimestamp(now);
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = QuarterIsoId.parse(isoId).split("-Q").map(Number);

    const reference = setQuarter(Date.UTC(year), quarter).getTime();

    return Quarter.fromTimestamp(Timestamp.fromNumber(reference));
  }

  toIsoId(): QuarterIsoIdType {
    const year = getYear(this.getStart().get());
    const quarter = getQuarter(this.getStart().get());

    return QuarterIsoId.parse(`${year}-Q${quarter}`);
  }

  toString(): string {
    return this.toIsoId();
  }
}
