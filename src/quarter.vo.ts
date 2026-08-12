import * as v from "valibot";
import { DateRange } from "./date-range.vo";
import { Int } from "./int.vo";
import type { IntegerType } from "./integer.vo";
import { QuarterIsoId, type QuarterIsoIdType } from "./quarter-iso-id.vo";
import { Temporal } from "./temporal";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";

export class Quarter extends DateRange {
  static fromTimestamp(timestamp: Timestamp): Quarter {
    const plain = timestamp.toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    const start = Temporal.PlainDate.from({
      year: plain.year,
      month: Math.ceil(plain.month / 3) * 3 - 2,
      day: 1,
    })
      .toZonedDateTime("UTC")
      .startOfDay();
    const end = start.add({ months: 3 }).subtract({ milliseconds: 1 });

    return new Quarter(Timestamp.fromInstant(start.toInstant()), Timestamp.fromInstant(end.toInstant()));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Quarter {
    return Quarter.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromIsoId(isoId: QuarterIsoIdType): Quarter {
    const [year, quarter] = v.parse(QuarterIsoId, isoId).split("-Q").map(Number) as [number, number];

    const plain = Temporal.PlainDate.from({ year, month: (quarter - 1) * 3 + 1, day: 1 });

    return Quarter.fromTimestamp(Timestamp.fromInstant(plain.toZonedDateTime("UTC").toInstant()));
  }

  toIsoId(): QuarterIsoIdType {
    const plain = this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate();
    const quarter = Math.ceil(plain.month / 3);

    return v.parse(QuarterIsoId, `${plain.year}-Q${quarter}`);
  }

  previous(): Quarter {
    return this.shift(Int.of(-1));
  }

  next(): Quarter {
    return this.shift(Int.of(1));
  }

  shift(count: IntegerType): Quarter {
    const plain = this.getStart().toInstant().toZonedDateTimeISO("UTC").toPlainDate();

    return Quarter.fromTimestamp(
      Timestamp.fromInstant(
        plain
          .add({ months: count * 3 })
          .toZonedDateTime("UTC")
          .toInstant(),
      ),
    );
  }

  toString(): string {
    return this.toIsoId();
  }
}
