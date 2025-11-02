import { DateFormatters } from "./date-formatter.service";
import type { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import type { Falsy } from "./ts-utils";

type RelativeDateType = { raw: TimestampValueType; relative: string };

export class RelativeDate {
  static truthy(timestamp: Timestamp): RelativeDateType {
    return RelativeDate._format(timestamp);
  }

  static falsy(timestamp: Falsy<Timestamp>): RelativeDateType | null {
    if (!timestamp) return null;
    return RelativeDate._format(timestamp);
  }

  private static _format(timestamp: Timestamp): RelativeDateType {
    return { raw: timestamp.get(), relative: DateFormatters.relative(timestamp.get()) };
  }
}
