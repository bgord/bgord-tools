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
    const year = timestamp.toInstant().toZonedDateTimeISO("UTC").toPlainDate().year;

    const start = Temporal.PlainDate.from({ year, month: 1, day: 1 });
    const end = Temporal.PlainDate.from({ year: year + 1, month: 1, day: 1 });

    return new Year(
      Timestamp.fromInstant(start.toZonedDateTime("UTC").toInstant()),
      Timestamp.fromInstant(end.toZonedDateTime("UTC").toInstant().subtract({ milliseconds: 1 })),
    );
  }

  static fromTimestampValue(timestamp: TimestampValueType): Year {
    return Year.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromNow(now: Timestamp): Year {
    return Year.fromTimestamp(now);
  }

  static fromNumber(candidate: number): Year {
    return Year.fromIsoId(v.parse(YearIsoId, String(candidate)));
  }

  static fromIsoId(isoId: YearIsoIdType): Year {
    return Year.fromTimestamp(
      Timestamp.fromInstant(
        Temporal.PlainDate.from({ year: Number(isoId), month: 1, day: 1 })
          .toZonedDateTime("UTC")
          .toInstant(),
      ),
    );
  }

  toIsoId(): YearIsoIdType {
    return v.parse(YearIsoId, this.getStart().toInstant().toZonedDateTimeISO("UTC").year.toString());
  }

  isLeapYear(): boolean {
    return this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate().inLeapYear;
  }

  previous(): Year {
    return this.shift(Int.of(-1));
  }

  next(): Year {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Year {
    const year = this.getStart().toInstant().toZonedDateTimeISO("UTC").year + count;

    return Year.fromNumber(year);
  }

  toString(): string {
    return this.toIsoId();
  }
}
