import { DateFormatters } from "./date-formatter.service";
import type { TimestampValueType } from "./timestamp-value.vo";
import type { Falsy } from "./ts-utils";

type RelativeDateType = { raw: TimestampValueType; relative: string };

export class RelativeDate {
  static truthy(timestamp: TimestampValueType): RelativeDateType {
    return RelativeDate._format(timestamp);
  }

  static falsy(timestamp: Falsy<TimestampValueType>): RelativeDateType | null {
    if (!timestamp) return null;
    return RelativeDate._format(timestamp);
  }

  private static _format(timestampMs: TimestampValueType): RelativeDateType {
    return { raw: timestampMs, relative: DateFormatters.relative(timestampMs) };
  }
}
