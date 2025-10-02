import { DateFormatters } from "./date-formatter.service";
import type { TimestampType } from "./timestamp.vo";
import type { Falsy } from "./ts-utils";

type RelativeDateType = { raw: TimestampType; relative: string };

export class RelativeDate {
  static truthy(timestampMs: TimestampType): RelativeDateType {
    return RelativeDate._format(timestampMs);
  }

  static falsy(timestampMs: Falsy<TimestampType>): RelativeDateType | null {
    if (!timestampMs) return null;
    return RelativeDate._format(timestampMs);
  }

  private static _format(timestampMs: TimestampType): RelativeDateType {
    return { raw: timestampMs, relative: DateFormatters.relative(timestampMs) };
  }
}
