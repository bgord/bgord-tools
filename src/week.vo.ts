import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Int } from "./int.vo";
import type { IntegerType } from "./integer.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { WeekIsoId, type WeekIsoIdType } from "./week-iso-id.vo";

export class Week extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Week {
    const plain = timestamp.toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    const start = plain
      .subtract({ days: plain.dayOfWeek - 1 })
      .toZonedDateTime("UTC")
      .startOfDay();
    const end = start.add({ days: 7 }).subtract({ milliseconds: 1 });

    return new Week(Timestamp.fromInstant(start.toInstant()), Timestamp.fromInstant(end.toInstant()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Week {
    return Week.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromIsoId(isoId: WeekIsoIdType): Week {
    const [year, week] = v.parse(WeekIsoId, isoId).split("-W").map(Number) as [number, number];

    const januaryFourth = Temporal.PlainDate.from({ year, month: 1, day: 4 });

    const start = januaryFourth.subtract({ days: januaryFourth.dayOfWeek - 1 });

    return Week.fromTimestamp(
      Timestamp.fromInstant(
        start
          .add({ weeks: week - 1 })
          .toZonedDateTime("UTC")
          .toInstant(),
      ),
    );
  }

  toIsoId(): WeekIsoIdType {
    const plain = this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    return v.parse(WeekIsoId, `${plain.yearOfWeek}-W${String(plain.weekOfYear).padStart(2, "0")}`);
  }

  previous(): Week {
    return this.shift(Int.of(-1));
  }

  next(): Week {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Week {
    const instant = this.getStart()
      .toInstant()
      .toZonedDateTimeISO("UTC")
      .toPlainDate()
      .add({ weeks: count })
      .toZonedDateTime("UTC")
      .toInstant();

    return Week.fromTimestamp(Timestamp.fromInstant(instant));
  }

  toString(): string {
    return this.toIsoId();
  }
}
