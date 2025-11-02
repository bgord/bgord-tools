import { Duration } from "./duration.service";
import { TimestampVO } from "./timestamp.vo";

type GetStartOfDayTsInTzConfigType = { now: TimestampVO; timeZoneOffset: Duration };

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType): TimestampVO {
    const dayMs = Duration.Days(1).ms;

    const utcMidnightOfNow = TimestampVO.fromNumber(Math.floor(config.now.ms / dayMs) * dayMs);

    let startOfDayInTz = utcMidnightOfNow.add(config.timeZoneOffset);

    if (startOfDayInTz.isAfter(config.now)) startOfDayInTz = startOfDayInTz.subtract(Duration.Days(1));

    return startOfDayInTz;
  }
}
