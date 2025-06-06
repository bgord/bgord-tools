import { describe, expect, test } from "bun:test";

import { Hour, HourFormatters } from "../src/hour.vo";

describe("Hour", () => {
  test("throws for invalid hour values", () => {
    expect(() => new Hour(-1)).toThrow("Invalid hour");
    expect(() => new Hour(24)).toThrow("Invalid hour");
    expect(() => new Hour(12.5)).toThrow("Invalid hour");
  });

  test("creates a valid Hour instance", () => {
    const hour = new Hour(5);
    expect(hour.get().raw).toBe(5);
  });

  test("formats using default (TWENTY_FOUR_HOURS)", () => {
    const hour = new Hour(5);
    expect(hour.get().formatted).toBe("05");
  });

  test("formats using TWENTY_FOUR_HOURS_WO_PADDING", () => {
    const hour = new Hour(5, HourFormatters.TWENTY_FOUR_HOURS_WO_PADDING);
    expect(hour.get().formatted).toBe("5");
  });

  test("formats using AM_PM", () => {
    const hour = new Hour(5, HourFormatters.AM_PM);
    expect(hour.get().formatted).toBe("5 a.m.");

    const hour2 = new Hour(15, HourFormatters.AM_PM);
    expect(hour2.get().formatted).toBe("15 p.m.");
  });

  test("formats using TWELVE_HOURS", () => {
    const hour = new Hour(15, HourFormatters.TWELVE_HOURS);
    expect(hour.get().formatted).toBe("03");

    const hour2 = new Hour(0, HourFormatters.TWELVE_HOURS);
    expect(hour2.get().formatted).toBe("00");
  });

  test("formats using TWELVE_HOURS_WO_PADDING", () => {
    const hour = new Hour(15, HourFormatters.TWELVE_HOURS_WO_PADDING);
    expect(hour.get().formatted).toBe("3");

    const hour2 = new Hour(0, HourFormatters.TWELVE_HOURS_WO_PADDING);
    expect(hour2.get().formatted).toBe("0");
  });

  test("get() supports overriding formatter", () => {
    const hour = new Hour(13);
    const result = hour.get(HourFormatters.AM_PM);
    expect(result.formatted).toBe("13 p.m.");
  });

  test("equals compares correctly", () => {
    const a = new Hour(8);
    const b = new Hour(8);
    const c = new Hour(9);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  test("isAfter and isBefore work correctly", () => {
    const a = new Hour(10);
    const b = new Hour(9);
    const c = new Hour(10);

    expect(a.isAfter(b)).toBe(true);
    expect(b.isBefore(a)).toBe(true);
    expect(a.isBefore(c)).toBe(false);
  });

  test("Hour.list() returns 24 items", () => {
    const hours = Hour.list();
    expect(hours.length).toBe(24);
    expect(hours[0].get().raw).toBe(0);
    expect(hours[23].get().raw).toBe(23);
  });

  test("Hour.ZERO and Hour.MAX are correct", () => {
    expect(Hour.ZERO.get().raw).toBe(0);
    expect(Hour.MAX.get().raw).toBe(23);
  });
});
