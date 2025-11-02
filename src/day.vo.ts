import { formatISO } from "date-fns";
import { DateRange } from "./date-range.vo";
import { DayIsoId, type DayIsoIdType } from "./day-iso-id.vo";
import { Duration } from "./duration.service";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Day extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Day {
    const date = new Date(timestamp.ms);

    const startUtc = Timestamp.fromNumber(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const endUtc = startUtc.add(Duration.Days(1)).subtract(Duration.Ms(1));

    return new Day(startUtc, endUtc);
  }

  static fromTimestampValue(timestamp: TimestampValueType): Day {
    return Day.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(isoId: DayIsoIdType): Day {
    const [year, month, day] = DayIsoId.parse(isoId).split("-").map(Number);

    const startUtc = Timestamp.fromNumber(Date.UTC(year, month - 1, day));
    const endUtc = startUtc.add(Duration.Days(1)).subtract(Duration.Ms(1));

    return new Day(startUtc, endUtc);
  }

  toIsoId(): DayIsoIdType {
    const midday = this.getStart().add(Duration.Hours(12));

    return DayIsoId.parse(formatISO(midday.ms, { representation: "date" }));
  }

  previous(): Day {
    return this.shift(-1);
  }

  next(): Day {
    return this.shift(1);
  }

  shift(count: number): Day {
    return Day.fromTimestamp(this.getStart().add(Duration.Days(count)));
  }

  toString(): string {
    return this.toIsoId();
  }
}
