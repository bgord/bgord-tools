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
    const plain = timestamp.toPlainDateUTC();

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

  static fromIsoId(iso: MonthIsoIdType): Month {
    const [year, month] = v.parse(MonthIsoId, iso).split("-").map(Number) as [number, number];

    const plain = Temporal.PlainDate.from({ year, month, day: 1 });

    return Month.fromTimestamp(Timestamp.fromInstant(plain.toZonedDateTime("UTC").toInstant()));
  }

  toIsoId(): MonthIsoIdType {
    const { year, month } = this.getStart().toZonedDateTimeUTC();

    return v.parse(MonthIsoId, `${year}-${String(month).padStart(2, "0")}`);
  }

  previous(): Month {
    return this.shift(Int.of(-1));
  }

  next(): Month {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Month {
    const plain = this.getStart().toPlainDateUTC();

    return Month.fromTimestamp(
      Timestamp.fromInstant(plain.add({ months: count }).toZonedDateTime("UTC").toInstant()),
    );
  }

  toString(): string {
    return this.toIsoId();
  }
}
