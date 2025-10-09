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

    // TODO
    return new Date(midday).toISOString().slice(0, 10) as DayIsoIdType;
  }

  previous(): Day {
    const timestamp = this.getStart() - Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(timestamp));
  }

  next(): Day {
    const timestamp = this.getStart() + Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(timestamp));
  }

  shift(count: number): Day {
    const timestamp = this.getStart() + count * Duration.Days(1).ms;

    return Day.fromTimestamp(Timestamp.parse(timestamp));
  }

  static fromTimestamp(timestamp: TimestampType): Day {
    // TODO
    const date = new Date(timestamp);
    const startUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(Timestamp.parse(startUtc), Timestamp.parse(endUtc));
  }

  static fromNow(now: TimestampType): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(isoId: DayIsoIdType): Day {
    // TODO
    const [year, month, day] = DayIsoId.parse(isoId).split("-").map(Number);
    const startUtc = Date.UTC(year, month - 1, day);
    const endUtc = startUtc + Duration.Days(1).ms - 1;

    return new Day(Timestamp.parse(startUtc), Timestamp.parse(endUtc));
  }
}
