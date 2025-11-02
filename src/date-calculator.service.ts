import { Duration } from "./duration.service";
import type { TimeZoneOffsetValueType } from "./time-zone-offset-value.vo";
import { TimestampVO } from "./timestamp.vo";

type GetStartOfDayTsInTzConfigType = { now: TimestampVO; timeZoneOffsetMs: TimeZoneOffsetValueType };

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType): TimestampVO {
    const dayMs = Duration.Days(1).ms;

    // UTC midnight for the UTC date of `now`
    const utcMidnight = Math.floor(config.now.ms / dayMs) * dayMs;

    // Candidate start of the local day (in UTC), anchored to the same UTC date
    let start = utcMidnight + config.timeZoneOffsetMs;

    // If the candidate is in the future relative to `now`, it means local midnight was "yesterday" in UTC.
    if (start > config.now.ms) start -= dayMs;

    return TimestampVO.fromNumber(start);
  }
}
