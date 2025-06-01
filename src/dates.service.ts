import { format } from "date-fns";

import { Time } from "./time.service";
import type { TimestampType } from "./timestamp.vo";
import type { Falsy } from "./ts-utils";

import { DateFormatters } from "./date-formatter.service";

export type FormattedDateType = string;

export type DateFormattersInputType = Parameters<typeof format>[0];

export type RelativeDateType = { raw: TimestampType; relative: string };
export class RelativeDate {
  static truthy(timestampMs: TimestampType): RelativeDateType {
    return RelativeDate._format(timestampMs);
  }

  static falsy(timestampMs: Falsy<TimestampType>): RelativeDateType | null {
    if (!timestampMs) return null;

    return RelativeDate._format(timestampMs);
  }

  private static _format(timestampMs: TimestampType): RelativeDateType {
    return {
      raw: timestampMs,
      relative: DateFormatters.relative(timestampMs),
    };
  }
}

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
