import { formatISO } from "date-fns";
import { DateRange } from "./date-range.vo";
import { DayIsoId, type DayIsoIdType } from "./day-iso-id.vo";
import { Duration } from "./duration.service";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export class Day extends DateRange {
  private constructor(start: TimestampValueType, end: TimestampValueType) {
    super(start, end);
  }

  static fromTimestamp(timestamp: TimestampValueType): Day {
    const date = new Date(timestamp);

    const startUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(TimestampValue.parse(startUtc), TimestampValue.parse(endUtc));
  }

  static fromNow(now: TimestampValueType): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(isoId: DayIsoIdType): Day {
    const [year, month, day] = DayIsoId.parse(isoId).split("-").map(Number);

    const startUtc = Date.UTC(year, month - 1, day);
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(TimestampValue.parse(startUtc), TimestampValue.parse(endUtc));
  }

  toIsoId(): DayIsoIdType {
    const midday = this.getStart() + Duration.Hours(12).ms;

    return DayIsoId.parse(formatISO(midday, { representation: "date" }));
  }

  previous(): Day {
    return this.shift(-1);
  }

  next(): Day {
    return this.shift(1);
  }

  shift(count: number): Day {
    const timestamp = this.getStart() + count * Duration.Days(1).ms;

    return Day.fromTimestamp(TimestampValue.parse(timestamp));
  }

  toString(): string {
    return this.toIsoId();
  }
}
