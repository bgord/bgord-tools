import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Int } from "./int.vo";
import type { IntegerType } from "./integer.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { YearIsoId, type YearIsoIdType } from "./year-iso-id.vo";

export class Year extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Year {
    const year = timestamp.toPlainDateUTC().year;

    const start = Temporal.PlainDate.from({ year, month: 1, day: 1 }).toZonedDateTime("UTC").startOfDay();
    const end = start.add({ years: 1 }).subtract({ milliseconds: 1 });

    return new Year(Timestamp.fromInstant(start.toInstant()), Timestamp.fromInstant(end.toInstant()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Year {
    return Year.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNumber(candidate: number): Year {
    return Year.fromIsoId(v.parse(YearIsoId, String(candidate)));
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    return Year.fromTimestamp(
      Timestamp.fromInstant(
        Temporal.PlainDate.from({ year: Number(v.parse(YearIsoId, isoId)), month: 1, day: 1 })
          .toZonedDateTime("UTC")
          .toInstant(),
      ),
    );
  }

  toIsoId(): YearIsoIdType {
    return v.parse(YearIsoId, this.getStart().toZonedDateTimeUTC().year.toString());
  }

  isLeapYear(): boolean {
    return this.getStart().toPlainDateUTC().inLeapYear;
  }

  previous(): Year {
    return this.shift(Int.of(-1));
  }

  next(): Year {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Year {
    const year = this.getStart().toZonedDateTimeUTC().year + count;

    return Year.fromNumber(year);
  }

  toString(): string {
    return this.toIsoId();
  }
}
