import { describe, expect, test } from "bun:test";
import type { TimestampType } from "../src/timestamp.vo";
import { Weekday, WeekdayFormatterEnum, WeekdayFormatters } from "../src/weekday.vo";

describe("Weekday VO", () => {
  test("constructs valid weekdays 0..6 and exposes raw value", () => {
    for (let candidate = 0; candidate <= 6; candidate += 1) {
      expect(new Weekday(candidate).get().raw).toBe(candidate);
    }
  });

  test("throws on invalid constructor inputs", () => {
    expect(() => new Weekday(-1)).toThrow("Invalid weekday");
    expect(() => new Weekday(7)).toThrow("Invalid weekday");
    expect(() => new Weekday(Number.NaN)).toThrow("Invalid weekday");
    expect(() => new Weekday(1.5)).toThrow("Invalid weekday");
  });

  test("named statics map to correct values", () => {
    expect(Weekday.SUNDAY.get().raw).toBe(0);
    expect(Weekday.MONDAY.get().raw).toBe(1);
    expect(Weekday.TUESDAY.get().raw).toBe(2);
    expect(Weekday.WEDNESDAY.get().raw).toBe(3);
    expect(Weekday.THURSDAY.get().raw).toBe(4);
    expect(Weekday.FRIDAY.get().raw).toBe(5);
    expect(Weekday.SATURDAY.get().raw).toBe(6);
  });

  test("default formatter is FULL", () => {
    expect(new Weekday(0).get().formatted).toBe("Sunday");
    expect(new Weekday(3).get().formatted).toBe("Wednesday");
  });

  test("custom default formatter via constructor is used by get()", () => {
    const weekday = new Weekday(1, WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(weekday.get().formatted).toBe("Mon");
  });

  test("runtime formatter argument overrides default", () => {
    const weekday = new Weekday(1, WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(weekday.get(WeekdayFormatters[WeekdayFormatterEnum.FULL]).formatted).toBe("Monday");
    expect(weekday.get(WeekdayFormatters[WeekdayFormatterEnum.ZERO_BASED_NUMBER]).formatted).toBe("1");
    expect(weekday.get(WeekdayFormatters[WeekdayFormatterEnum.ISO_NUMBER]).formatted).toBe("1");
  });

  test("formatters produce expected values", () => {
    expect(WeekdayFormatters.FULL(0)).toBe("Sunday");
    expect(WeekdayFormatters.SHORT(3)).toBe("Wed");
    expect(WeekdayFormatters.ISO_NUMBER(0)).toBe("7"); // Sunday -> 7
    expect(WeekdayFormatters.ISO_NUMBER(1)).toBe("1"); // Monday -> 1
    expect(WeekdayFormatters.ZERO_BASED_NUMBER(6)).toBe("6");
  });

  test("fromUtcTimestamp builds correct weekday (UTC)", () => {
    const reference = Date.UTC(2024, 7, 5, 0, 0, 0, 0);
    const monday = Weekday.fromUtcTimestamp(reference as TimestampType);
    expect(monday.isMonday()).toBeTrue();
    expect(monday.get().raw).toBe(1);
  });

  test("equals", () => {
    const monday = new Weekday(1);
    const wednesday = new Weekday(3);

    expect(monday.equals(new Weekday(1))).toBeTrue();
    expect(monday.equals(wednesday)).toBeFalse();
  });

  test("toIsoNumber", () => {
    expect(new Weekday(0).toIsoNumber()).toBe(7); // Sunday
    expect(new Weekday(1).toIsoNumber()).toBe(1); // Monday
    expect(new Weekday(6).toIsoNumber()).toBe(6); // Saturday
  });

  test("day-name predicates", () => {
    expect(new Weekday(1).isMonday()).toBeTrue();
    expect(new Weekday(2).isTuesday()).toBeTrue();
    expect(new Weekday(3).isWednesday()).toBeTrue();
    expect(new Weekday(4).isThursday()).toBeTrue();
    expect(new Weekday(5).isFriday()).toBeTrue();
    expect(new Weekday(6).isSaturday()).toBeTrue();
    expect(new Weekday(0).isSunday()).toBeTrue();
  });

  test("list returns Sunday-first 0..6", () => {
    const days = Weekday.list();
    const rawValues = days.map((d) => d.get().raw);
    expect(rawValues).toEqual([0, 1, 2, 3, 4, 5, 6]);

    const shortDays = Weekday.list(WeekdayFormatters[WeekdayFormatterEnum.SHORT]);
    expect(shortDays[0].get().formatted).toBe("Sun");
    expect(shortDays[1].get().formatted).toBe("Mon");
  });

  test("listMondayFirst returns 1..6,0", () => {
    const days = Weekday.listMondayFirst();
    const rawValues = days.map((d) => d.get().raw);
    expect(rawValues).toEqual([1, 2, 3, 4, 5, 6, 0]);
  });
});
