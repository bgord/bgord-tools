import { endOfQuarter, getQuarter, getYear, startOfQuarter } from "date-fns";
import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Quarter extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Quarter {
    const start = Timestamp.fromNumber(startOfQuarter(timestamp.ms).getTime());
    const end = Timestamp.fromNumber(endOfQuarter(timestamp.ms).getTime());

    return new Quarter(start, end);
  }

  static fromTimestampValue(timestamp: TimestampValueType): Quarter {
    return Quarter.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Quarter {
    return Quarter.fromTimestamp(now);
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = v.parse(QuarterIsoId, isoId).split("-Q").map(Number);

    return Quarter.fromTimestamp(Timestamp.fromNumber(Date.UTC(year, (quarter - 1) * 3, 1)));
  }

  toIsoId(): QuarterIsoIdType {
    const year = getYear(this.getStart().ms);
    const quarter = getQuarter(this.getStart().ms);

    return v.parse(QuarterIsoId, `${year}-Q${quarter}`);
  }

  toString(): string {
    return this.toIsoId();
  }
}
