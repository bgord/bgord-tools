import { addDays, endOfDay, startOfDay } from "date-fns";
import { DateRange } from "./date-range.vo";
import { DayIsoId, type DayIsoIdType } from "./day-iso-id.vo";
import { Time } from "./time.service";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export class Day extends DateRange {
  private constructor(start: TimestampType, end: TimestampType) {
    super(start, end);
  }

  toIsoId(): DayIsoIdType {
    return new Date(this.getStart() + Time.Hours(12).ms).toISOString().slice(0, 10) as DayIsoIdType;
  }

  previous(): Day {
    const shifted = addDays(new Date(this.getStart()), -1).getTime();
    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  next(): Day {
    const shifted = addDays(new Date(this.getStart()), 1).getTime();
    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  shift(count: number): Day {
    const shifted = addDays(new Date(this.getStart()), count).getTime();
    return Day.fromTimestamp(Timestamp.parse(shifted));
  }

  static fromTimestamp(timestamp: TimestampType): Day {
    const start = Timestamp.parse(startOfDay(timestamp).getTime());
    const end = Timestamp.parse(endOfDay(timestamp).getTime());
    return new Day(start, end);
  }

  static fromNow(now: TimestampType): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(isoId: DayIsoIdType): Day {
    const [year, month, day] = DayIsoId.parse(isoId).split("-").map(Number);

    const reference = new Date(Date.UTC(year, month - 1, day));
    return Day.fromTimestamp(Timestamp.parse(reference.getTime()));
  }
}
