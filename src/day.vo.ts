import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { DayIsoId, type DayIsoIdType } from "./day-iso-id.vo";
import { Int } from "./int.vo";
import type { IntegerType } from "./integer.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Day extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Day {
    const date = timestamp.toInstant().toZonedDateTimeISO("UTC");

    const start = date.startOfDay();
    const end = start.add({ days: 1 }).subtract({ milliseconds: 1 });

    return new Day(Timestamp.fromInstant(start.toInstant()), Timestamp.fromInstant(end.toInstant()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Day {
    return Day.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Day {
    return Day.fromTimestamp(now);
  }

  static fromIsoId(value: DayIsoIdType): Day {
    const isoId = v.parse(DayIsoId, value);

    return Day.fromTimestamp(
      Timestamp.fromInstant(Temporal.PlainDate.from(isoId).toZonedDateTime("UTC").toInstant()),
    );
  }

  toIsoId(): DayIsoIdType {
    return v.parse(DayIsoId, this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate().toString());
  }

  previous(): Day {
    return this.shift(Int.of(-1));
  }

  next(): Day {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Day {
    const plain = this.getStart()
      .toInstant()
      .toZonedDateTimeISO("UTC")
      .toPlainDate()
      .add({ days: count })
      .toZonedDateTime("UTC");

    return Day.fromTimestamp(Timestamp.fromInstant(plain.toInstant()));
  }

  toString(): string {
    return this.toIsoId();
  }
}
