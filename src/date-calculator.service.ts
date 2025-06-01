import { format } from "date-fns";

import { Time } from "./time.service";
import type { TimestampType } from "./timestamp.vo";

export type FormattedDateType = string;

export type DateFormattersInputType = Parameters<typeof format>[0];

type GetStartOfDayTsInTzConfigType = {
  now: TimestampType;
  timeZoneOffsetMs: number;
};

export class DateCalculator {
  static getStartOfDayTsInTz(config: GetStartOfDayTsInTzConfigType) {
    const startOfDayUTC = new Date();
    startOfDayUTC.setUTCHours(0, 0, 0, 0);

    const startOfDayInTimeZone = startOfDayUTC.getTime() + config.timeZoneOffsetMs;

    const timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay =
      (config.now - startOfDayInTimeZone) % Time.Days(1).ms;

    if (timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay >= Time.Days(1).ms) {
      return config.now - timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay + Time.Days(1).ms;
    }

    if (timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay >= 0) {
      return config.now - timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay;
    }

    return config.now - timeSinceNewDayInTimeZoneRelativeToUtcStartOfDay - Time.Days(1).ms;
  }
}
