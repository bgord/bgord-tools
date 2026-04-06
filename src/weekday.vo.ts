import * as v from "valibot";
import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { WeekdayIsoId, type WeekdayIsoIdType } from "./weekday-iso-id.vo";

export class Weekday {
  static readonly MONDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 1));
  static readonly TUESDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 2));
  static readonly WEDNESDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 3));
  static readonly THURSDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 4));
  static readonly FRIDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 5));
  static readonly SATURDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 6));
  static readonly SUNDAY = Weekday.fromIsoId(v.parse(WeekdayIsoId, 7));

  private constructor(private readonly value: WeekdayIsoIdType) {}

  static fromTimestamp(timestamp: Timestamp): Weekday {
    const dayOfWeek = timestamp.toInstant().toZonedDateTimeISO("UTC").toPlainDate().dayOfWeek;

    return new Weekday(v.parse(WeekdayIsoId, dayOfWeek));
  }

  static fromTimestampValue(timestamp: TimestampValueType): Weekday {
    return Weekday.fromTimestamp(Timestamp.fromValue(timestamp));
  }

  static fromIsoId(iso: WeekdayIsoIdType): Weekday {
    return new Weekday(iso);
  }

  get(): WeekdayIsoIdType {
    return this.value;
  }

  equals(another: Weekday): boolean {
    return this.value === another.value;
  }

  isMonday(): boolean {
    return this.equals(Weekday.MONDAY);
  }

  isTuesday(): boolean {
    return this.equals(Weekday.TUESDAY);
  }

  isWednesday(): boolean {
    return this.equals(Weekday.WEDNESDAY);
  }

  isThursday(): boolean {
    return this.equals(Weekday.THURSDAY);
  }

  isFriday(): boolean {
    return this.equals(Weekday.FRIDAY);
  }

  isSaturday(): boolean {
    return this.equals(Weekday.SATURDAY);
  }

  isSunday(): boolean {
    return this.equals(Weekday.SUNDAY);
  }

  toJSON(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
