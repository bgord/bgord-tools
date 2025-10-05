import { DateFormatters } from "./date-formatter.service";
import type { TimestampType } from "./timestamp.vo";
import type { Falsy } from "./ts-utils";

type RelativeDateType = { raw: TimestampType; relative: string };

export class RelativeDate {
  static truthy(timestamp: TimestampType): RelativeDateType {
    return RelativeDate._format(timestamp);
  }

  static falsy(timestamp: Falsy<TimestampType>): RelativeDateType | null {
    if (!timestamp) return null;
    return RelativeDate._format(timestamp);
  }

  private static _format(timestampMs: TimestampType): RelativeDateType {
    return { raw: timestampMs, relative: DateFormatters.relative(timestampMs) };
  }
}
