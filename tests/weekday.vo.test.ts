import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Timestamp } from "../src/timestamp.vo";
import { Weekday } from "../src/weekday.vo";
import { WeekdayIsoId } from "../src/weekday-iso-id.vo";
import * as mocks from "./mocks";

describe("Weekday", () => {
  test("predefined", () => {
    expect(Weekday.MONDAY.isMonday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 1)).get()).toEqual(v.parse(WeekdayIsoId, 1));

    expect(Weekday.TUESDAY.isTuesday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 2)).get()).toEqual(v.parse(WeekdayIsoId, 2));

    expect(Weekday.WEDNESDAY.isWednesday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 3)).get()).toEqual(v.parse(WeekdayIsoId, 3));

    expect(Weekday.THURSDAY.isThursday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 4)).get()).toEqual(v.parse(WeekdayIsoId, 4));

    expect(Weekday.FRIDAY.isFriday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 5)).get()).toEqual(v.parse(WeekdayIsoId, 5));

    expect(Weekday.SATURDAY.isSaturday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 6)).get()).toEqual(v.parse(WeekdayIsoId, 6));

    expect(Weekday.SUNDAY.isSunday()).toEqual(true);
    expect(Weekday.fromIsoId(v.parse(WeekdayIsoId, 7)).get()).toEqual(v.parse(WeekdayIsoId, 7));
  });

  test("fromTimestamp", () => {
    const weekday = Weekday.fromTimestamp(mocks.TIME_ZERO);

    expect(weekday.isTuesday()).toEqual(true);
  });

  test("fromTimestamp - sunday", () => {
    const timestamp = Timestamp.fromString("2026-02-08T12:00:00.000Z");
    const weekday = Weekday.fromTimestamp(timestamp);

    expect(weekday.isSunday()).toEqual(true);
  });

  test("fromTimestampValue", () => {
    const weekday = Weekday.fromTimestampValue(mocks.TIME_ZERO.ms);

    expect(weekday.isTuesday()).toEqual(true);
  });

  test("fromIsoId", () => {
    const weekday = Weekday.fromIsoId(v.parse(WeekdayIsoId, 1));

    expect(weekday.isMonday()).toEqual(true);
  });

  test("equals", () => {
    expect(Weekday.MONDAY.equals(Weekday.MONDAY)).toEqual(true);
    expect(Weekday.MONDAY.equals(Weekday.WEDNESDAY)).toEqual(false);
  });

  test("list", () => {
    const list = Weekday.list();

    expect(list.length).toEqual(7);
    expect(list[0]?.get()).toEqual(v.parse(WeekdayIsoId, 1));
    expect(list[6]?.get()).toEqual(v.parse(WeekdayIsoId, 7));
  });

  test("toString", () => {
    expect(Weekday.MONDAY.toString()).toEqual("1");
  });

  test("toJSON", () => {
    expect(Weekday.MONDAY.toJSON()).toEqual(1);
  });
});
