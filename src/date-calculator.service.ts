import { Time } from "./time.service";
import { Timestamp, type TimestampType } from "./timestamp.vo";

type GetStartOfDayTsInTzConfigType = { now: TimestampType; timeZoneOffsetMs: number };

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType): TimestampType {
    const dayMs = Time.Days(1).ms;

    // UTC midnight for the UTC date of `now`
    const utcMidnight = Math.floor(config.now / dayMs) * dayMs;

    // Candidate start of the local day (in UTC), anchored to the same UTC date
    let start = utcMidnight + config.timeZoneOffsetMs;

    // If the candidate is in the future relative to `now`, it means local midnight was "yesterday" in UTC.
    if (start > config.now) start -= dayMs;

    return Timestamp.parse(start);
  }
}
