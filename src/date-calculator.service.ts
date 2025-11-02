import { Duration } from "./duration.service";
import { Timestamp } from "./timestamp.vo";

type GetStartOfDayTsInTzConfigType = { now: Timestamp; timeZoneOffset: Duration };

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType): Timestamp {
    const dayMs = Duration.Days(1).ms;

    const utcMidnightOfNow = Timestamp.fromNumber(Math.floor(config.now.ms / dayMs) * dayMs);

    let startOfDayInTz = utcMidnightOfNow.add(config.timeZoneOffset);

    if (startOfDayInTz.isAfter(config.now)) startOfDayInTz = startOfDayInTz.subtract(Duration.Days(1));

    return startOfDayInTz;
  }
}
