import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Int } from "./int.vo";
import type { IntegerType } from "./integer.vo";
import { MonthIsoId, type MonthIsoIdType } from "./month-iso-id.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Month extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Month {
    const plain = timestamp.toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    const start = plain.with({ day: 1 });
    const end = plain.with({ day: 1 }).add({ months: 1 });

    return new Month(
      Timestamp.fromInstant(start.toZonedDateTime("UTC").toInstant()),
      Timestamp.fromInstant(end.toZonedDateTime("UTC").toInstant().subtract({ milliseconds: 1 })),
    );
  }

  static fromTimestampValue(value: TimestampValueType): Month {
    return Month.fromTimestamp(Timestamp.fromValue(value));
  }

  static fromNow(now: Timestamp): Month {
    return Month.fromTimestamp(now);
  }

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = v.parse(MonthIsoId, iso).split("-").map(Number) as [number, number];

    const plain = Temporal.PlainDate.from({ year, month, day: 1 });

    return Month.fromTimestamp(Timestamp.fromInstant(plain.toZonedDateTime("UTC").toInstant()));
  }

  toIsoId(): MonthIsoIdType {
    const zdt = this.getStart().toInstant().toZonedDateTimeISO("UTC");

    return v.parse(MonthIsoId, `${zdt.year}-${String(zdt.month).padStart(2, "0")}`);
  }

  previous(): Month {
    return this.shift(Int.of(-1));
  }

  next(): Month {
    return this.shift(Int.of(1));
  }

  shift(months: IntegerType): Month {
    const plain = this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    return Month.fromTimestamp(
      Timestamp.fromInstant(plain.add({ months }).toZonedDateTime("UTC").toInstant()),
    );
  }

  toString(): string {
    return this.toIsoId();
  }
}
