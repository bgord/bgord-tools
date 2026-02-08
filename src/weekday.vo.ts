import { Timestamp } from "./timestamp.vo";
import type { TimestampValueType } from "./timestamp-value.vo";
import { WeekdayIsoId, type WeekdayIsoIdType } from "./weekday-iso-id.vo";

export class Weekday {
  static readonly MONDAY = Weekday.fromIsoId(WeekdayIsoId.parse(1));
  static readonly TUESDAY = Weekday.fromIsoId(WeekdayIsoId.parse(2));
  static readonly WEDNESDAY = Weekday.fromIsoId(WeekdayIsoId.parse(3));
  static readonly THURSDAY = Weekday.fromIsoId(WeekdayIsoId.parse(4));
  static readonly FRIDAY = Weekday.fromIsoId(WeekdayIsoId.parse(5));
  static readonly SATURDAY = Weekday.fromIsoId(WeekdayIsoId.parse(6));
  static readonly SUNDAY = Weekday.fromIsoId(WeekdayIsoId.parse(7));

  private constructor(private readonly value: WeekdayIsoIdType) {}

  static fromTimestamp(timestamp: Timestamp): Weekday {
    // UTC returns numbers from 0-6, starting from Sunday
    const utc = new Date(timestamp.ms).getUTCDay();

    return new Weekday(WeekdayIsoId.parse(utc === 0 ? 7 : utc));
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
