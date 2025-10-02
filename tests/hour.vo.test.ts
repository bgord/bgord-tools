import { describe, expect, test } from "bun:test";
import { Hour, HourValueError } from "../src/hour.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Hour", () => {
  test("throws for invalid hour values", () => {
    expect(() => new Hour(-1)).toThrow(HourValueError);
    expect(() => new Hour(24)).toThrow(HourValueError);
    expect(() => new Hour(12.5)).toThrow(HourValueError);
  });

  test("creates a valid Hour instance", () => {
    expect(new Hour(5).get()).toBe(5);
  });

  test("default string formatting is 24h zero-padded", () => {
    expect(new Hour(5).toString()).toBe("05");
    expect(new Hour(13).toString()).toBe("13");
  });

  test("equals compares correctly", () => {
    const eightA = new Hour(8);
    const eightB = new Hour(8);
    const nine = new Hour(9);
    expect(eightA.equals(eightB)).toBe(true);
    expect(eightA.equals(nine)).toBe(false);
  });

  test("isAfter and isBefore work correctly", () => {
    const ten = new Hour(10);
    const nine = new Hour(9);
    const tenClone = new Hour(10);

    expect(ten.isAfter(nine)).toBe(true);
    expect(nine.isBefore(ten)).toBe(true);
    expect(ten.isBefore(tenClone)).toBe(false);
  });

  test("Hour.list() returns cached 24 items", () => {
    const hours = Hour.list();
    expect(hours.length).toBe(24);
    expect(hours[0].get()).toBe(0);
    expect(hours[23].get()).toBe(23);
    expect(Hour.list()).toEqual(hours);
  });

  test("Hour.ZERO and Hour.MAX are correct", () => {
    expect(Hour.ZERO.get()).toBe(0);
    expect(Hour.MAX.get()).toBe(23);
  });

  test("fromEpochMs extracts UTC hour", () => {
    expect(Hour.fromEpochMs(Timestamp.parse(1700000000000)).get()).toBe(22);
  });
});
