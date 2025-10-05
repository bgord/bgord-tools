import { DateRange } from "./date-range.vo";
import { DayIsoId, type DayIsoIdType } from "./day-iso-id.vo";
import { Duration } from "./duration.service";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Day extends DateRange {
  private constructor(start: TimestampType, end: TimestampType) {
    super(start, end);
  }

  toIsoId(): DayIsoIdType {
    const midday = this.getStart() + Duration.Hours(12).ms;

    return new Date(midday).toISOString().slice(0, 10) as DayIsoIdType;
  }

  previous(): Day {
    const shifted = this.getStart() - Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  next(): Day {
    const shifted = this.getStart() + Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  shift(count: number): Day {
    const shifted = this.getStart() + count * Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  static fromTimestamp(timestamp: TimestampType): Day {
    const date = new Date(timestamp);
    const startUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(Timestamp.parse(startUtc), Timestamp.parse(endUtc));
  }

  static fromNow(now: TimestampType): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(isoId: DayIsoIdType): Day {
    const [year, month, day] = DayIsoId.parse(isoId).split("-").map(Number);
    const startUtc = Date.UTC(year, month - 1, day);
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(Timestamp.parse(startUtc), Timestamp.parse(endUtc));
  }
}
