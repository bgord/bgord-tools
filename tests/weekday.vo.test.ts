import { describe, expect, test } from "bun:test";
import { Weekday } from "../src/weekday.vo";
import { WeekdayIsoId } from "../src/weekday-iso-id.vo";
import * as mocks from "./mocks";

describe("Weekday", () => {
  test("predefined", () => {
    expect(Weekday.MONDAY.isMonday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(1)).get()).toEqual(WeekdayIsoId.parse(1));

    expect(Weekday.TUESDAY.isTuesday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(2)).get()).toEqual(WeekdayIsoId.parse(2));

    expect(Weekday.WEDNESDAY.isWednesday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(3)).get()).toEqual(WeekdayIsoId.parse(3));

    expect(Weekday.THURSDAY.isThursday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(4)).get()).toEqual(WeekdayIsoId.parse(4));

    expect(Weekday.FRIDAY.isFriday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(5)).get()).toEqual(WeekdayIsoId.parse(5));

    expect(Weekday.SATURDAY.isSaturday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(6)).get()).toEqual(WeekdayIsoId.parse(6));

    expect(Weekday.SUNDAY.isSunday()).toEqual(true);
    expect(Weekday.fromIsoId(WeekdayIsoId.parse(7)).get()).toEqual(WeekdayIsoId.parse(7));
  });

  test("fromTimestamp", () => {
    const weekday = Weekday.fromTimestamp(mocks.TIME_ZERO);

    expect(weekday.isTuesday()).toEqual(true);
  });

  test("fromTimestampValue", () => {
    const weekday = Weekday.fromTimestampValue(mocks.TIME_ZERO.ms);

    expect(weekday.isTuesday()).toEqual(true);
  });

  test("fromIsoId", () => {
    const weekday = Weekday.fromIsoId(WeekdayIsoId.parse(1));

    expect(weekday.isMonday()).toEqual(true);
  });

  test("equals", () => {
    expect(Weekday.MONDAY.equals(Weekday.MONDAY)).toEqual(true);
    expect(Weekday.MONDAY.equals(Weekday.WEDNESDAY)).toEqual(false);
  });
});
