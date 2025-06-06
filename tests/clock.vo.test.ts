import { describe, expect, test } from "bun:test";

import { Clock, ClockFormatters } from "../src/clock.vo";
import { Hour } from "../src/hour.vo";
import { Minute } from "../src/minute.vo";

describe("Clock", () => {
  test("formats using default TWENTY_FOUR_HOURS", () => {
    const clock = new Clock(new Hour(9), new Minute(5));
    expect(clock.get().formatted).toBe("09:05");
  });

  test("formats using TWELVE_HOURS", () => {
    const clock = new Clock(new Hour(13), new Minute(30));
    expect(clock.get(ClockFormatters.TWELVE_HOURS).formatted).toBe("01:30");
  });

  test("formats using a custom formatter", () => {
    const clock = new Clock(new Hour(15), new Minute(30));
    const customFormatter = (h: Hour, m: Minute) => `Hour=${h.get().formatted}, Min=${m.get().formatted}`;
    expect(clock.get(customFormatter).formatted).toBe("Hour=15, Min=30");
  });

  test("equals returns true for same hour and minute", () => {
    const c1 = new Clock(new Hour(10), new Minute(45));
    const c2 = new Clock(new Hour(10), new Minute(45));
    expect(c1.equals(c2)).toBe(true);
  });

  test("equals returns false for different hour or minute", () => {
    const c1 = new Clock(new Hour(10), new Minute(45));
    const c2 = new Clock(new Hour(11), new Minute(45));
    const c3 = new Clock(new Hour(10), new Minute(46));

    expect(c1.equals(c2)).toBe(false);
    expect(c1.equals(c3)).toBe(false);
  });

  test("isAfter returns true when hour is greater", () => {
    const c1 = new Clock(new Hour(11), new Minute(0));
    const c2 = new Clock(new Hour(10), new Minute(59));
    expect(c1.isAfter(c2)).toBe(true);
  });

  test("isAfter returns true when hour is same and minute is greater", () => {
    const c1 = new Clock(new Hour(10), new Minute(30));
    const c2 = new Clock(new Hour(10), new Minute(15));
    expect(c1.isAfter(c2)).toBe(true);
  });

  test("isAfter returns false when not after", () => {
    const c1 = new Clock(new Hour(9), new Minute(15));
    const c2 = new Clock(new Hour(10), new Minute(0));
    expect(c1.isAfter(c2)).toBe(false);
  });

  test("isBefore returns true when hour is less", () => {
    const c1 = new Clock(new Hour(8), new Minute(59));
    const c2 = new Clock(new Hour(9), new Minute(0));
    expect(c1.isBefore(c2)).toBe(true);
  });

  test("isBefore returns true when hour is same and minute is less", () => {
    const c1 = new Clock(new Hour(9), new Minute(30));
    const c2 = new Clock(new Hour(9), new Minute(45));
    expect(c1.isBefore(c2)).toBe(true);
  });

  test("isBefore returns false when not before", () => {
    const c1 = new Clock(new Hour(12), new Minute(30));
    const c2 = new Clock(new Hour(12), new Minute(15));
    expect(c1.isBefore(c2)).toBe(false);
  });

  test("raw values from get() are correct", () => {
    const hour = new Hour(7);
    const minute = new Minute(8);
    const clock = new Clock(hour, minute);
    expect(clock.get().raw).toEqual({ hour: 7, minute: 8 });
  });
});
