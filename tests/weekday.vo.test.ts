import { describe, expect, test } from "bun:test";
import type { TimestampType } from "../src/timestamp.vo";
import { Weekday, WeekdayFormatterEnum, WeekdayFormatters, WeekdayValueError } from "../src/weekday.vo";

describe("Weekday VO", () => {
  test("constructs valid weekdays 0..6 and exposes raw value", () => {
    for (let candidate = 0; candidate <= 6; candidate += 1) {
      expect(new Weekday(candidate).get()).toEqual(candidate);
    }
  });

  test("throws on invalid constructor inputs", () => {
    expect(() => new Weekday(-1)).toThrow(WeekdayValueError);
    expect(() => new Weekday(7)).toThrow(WeekdayValueError);
    expect(() => new Weekday(Number.NaN)).toThrow(WeekdayValueError);
    expect(() => new Weekday(1.5)).toThrow(WeekdayValueError);
  });

  test("named statics map to correct values", () => {
    expect(Weekday.SUNDAY.get()).toEqual(0);
    expect(Weekday.MONDAY.get()).toEqual(1);
    expect(Weekday.TUESDAY.get()).toEqual(2);
    expect(Weekday.WEDNESDAY.get()).toEqual(3);
    expect(Weekday.THURSDAY.get()).toEqual(4);
    expect(Weekday.FRIDAY.get()).toEqual(5);
    expect(Weekday.SATURDAY.get()).toEqual(6);
  });

  test("default formatter is FULL", () => {
    expect(new Weekday(0).toString()).toEqual("Sunday");
    expect(new Weekday(3).toString()).toEqual("Wednesday");
    expect(new Weekday(0).format()).toEqual("Sunday");
  });

  test("custom default formatter via constructor is used by format()", () => {
    const weekday = new Weekday(1, WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(weekday.format()).toEqual("Mon");
  });

  test("runtime formatter argument overrides default", () => {
    const weekday = new Weekday(1, WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(weekday.format(WeekdayFormatters[WeekdayFormatterEnum.FULL])).toEqual("Monday");
    expect(weekday.format(WeekdayFormatters[WeekdayFormatterEnum.ZERO_BASED_NUMBER])).toEqual("1");
    expect(weekday.format(WeekdayFormatters[WeekdayFormatterEnum.ISO_NUMBER])).toEqual("1");
  });

  test("formatters produce expected values", () => {
    expect(WeekdayFormatters.FULL(0)).toEqual("Sunday");
    expect(WeekdayFormatters.SHORT(3)).toEqual("Wed");
    expect(WeekdayFormatters.ISO_NUMBER(0)).toEqual("7"); // Sunday -> 7
    expect(WeekdayFormatters.ISO_NUMBER(1)).toEqual("1"); // Monday -> 1
    expect(WeekdayFormatters.ZERO_BASED_NUMBER(6)).toEqual("6");
  });

  test("fromUtcTimestamp builds correct weekday (UTC)", () => {
    const reference = Date.UTC(2024, 7, 5, 0, 0, 0, 0);
    const monday = Weekday.fromUtcTimestamp(reference as TimestampType);
    expect(monday.isMonday()).toEqual(true);
    expect(monday.get()).toEqual(1);
  });

  test("equals", () => {
    const monday = new Weekday(1);
    const wednesday = new Weekday(3);

    expect(monday.equals(new Weekday(1))).toEqual(true);
    expect(monday.equals(wednesday)).toEqual(false);
  });

  test("toIsoNumber", () => {
    expect(new Weekday(0).toIsoNumber()).toEqual(7); // Sunday
    expect(new Weekday(1).toIsoNumber()).toEqual(1); // Monday
    expect(new Weekday(6).toIsoNumber()).toEqual(6); // Saturday
  });

  test("day-name predicates", () => {
    expect(new Weekday(1).isMonday()).toEqual(true);
    expect(new Weekday(2).isTuesday()).toEqual(true);
    expect(new Weekday(3).isWednesday()).toEqual(true);
    expect(new Weekday(4).isThursday()).toEqual(true);
    expect(new Weekday(5).isFriday()).toEqual(true);
    expect(new Weekday(6).isSaturday()).toEqual(true);
    expect(new Weekday(0).isSunday()).toEqual(true);
  });

  test("list returns Sunday-first 0..6", () => {
    const days = Weekday.list();
    const rawValues = days.map((d) => d.get());
    expect(rawValues).toEqual([0, 1, 2, 3, 4, 5, 6]);

    const shortDays = Weekday.list(WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(shortDays[0].format()).toEqual("Sun");
    expect(shortDays[1].format()).toEqual("Mon");
  });

  test("listMondayFirst returns 1..6,0", () => {
    const days = Weekday.listMondayFirst();
    const rawValues = days.map((d) => d.get());
    expect(rawValues).toEqual([1, 2, 3, 4, 5, 6, 0]);
  });
});
