import { Duration } from "./duration.service";
import type { TimeZoneOffsetValueType } from "./time-zone-offset-value.vo";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

type GetStartOfDayTsInTzConfigType = { now: TimestampValueType; timeZoneOffsetMs: TimeZoneOffsetValueType };

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType): TimestampValueType {
    const dayMs = Duration.Days(1).ms;

    // UTC midnight for the UTC date of `now`
    const utcMidnight = Math.floor(config.now / dayMs) * dayMs;

    // Candidate start of the local day (in UTC), anchored to the same UTC date
    let start = utcMidnight + config.timeZoneOffsetMs;

    // If the candidate is in the future relative to `now`, it means local midnight was "yesterday" in UTC.
    if (start > config.now) start -= dayMs;

    return TimestampValue.parse(start);
  }
}
