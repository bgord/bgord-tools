import { describe, expect, test } from "bun:test";
import { Clock } from "../src/clock.vo";
import { ClockFormatters } from "../src/clock-format.service";
import { Hour } from "../src/hour.vo";
import { HourFormatters } from "../src/hour-format.service";
import { HourSchema } from "../src/hour-schema.vo";
import { Minute } from "../src/minute.vo";
import { MinuteSchema } from "../src/minute-schema.vo";
import * as mocks from "./mocks";

const EIGHT = new Clock(Hour.fromValue(8), Minute.fromValue(0));
const EIGHT_FIFTY_NINE = new Clock(Hour.fromValue(8), Minute.fromValue(59));
const NINE = new Clock(Hour.fromValue(9), Minute.fromValue(0));

describe("Clock", () => {
  test("fromTimestamp", () => {
    expect(() => Clock.fromTimestamp(mocks.TIME_ZERO).get()).not.toThrow();
  });

  test("get", () => {
    expect(NINE.get()).toEqual({ hour: HourSchema.parse(9), minute: MinuteSchema.parse(0) });
  });

  test("equals", () => {
    expect(NINE.equals(new Clock(Hour.fromValue(9), Minute.fromValue(0)))).toEqual(true);
    expect(EIGHT_FIFTY_NINE.equals(NINE)).toEqual(false);
    expect(NINE.equals(new Clock(Hour.fromValue(9), Minute.fromValue(1)))).toEqual(false);
  });

  test("isAfter", () => {
    expect(NINE.isAfter(EIGHT_FIFTY_NINE)).toEqual(true);
    expect(EIGHT_FIFTY_NINE.isAfter(EIGHT)).toEqual(true);
    expect(EIGHT_FIFTY_NINE.isAfter(NINE)).toEqual(false);
  });

  test("isBefore", () => {
    expect(EIGHT_FIFTY_NINE.isBefore(NINE)).toEqual(true);
    expect(EIGHT.isBefore(EIGHT_FIFTY_NINE)).toEqual(true);
    expect(NINE.isBefore(EIGHT_FIFTY_NINE)).toEqual(false);
  });

  test("format - default", () => {
    expect(NINE.format()).toEqual("09:00");
  });

  test("format - TWELVE_HOURS", () => {
    expect(new Clock(Hour.fromValue(13), Minute.fromValue(3), ClockFormatters.TWELVE_HOURS).format()).toEqual(
      "01:03",
    );
  });

  test("format - custom", () => {
    const composed = (hour: Hour, minute: Minute) =>
      `${hour.format(HourFormatters.AM_PM)} @ ${minute.toString()} min`;

    expect(new Clock(Hour.fromValue(15), Minute.fromValue(7), composed).format()).toEqual("3 p.m. @ 07 min");
  });

  test("toString", () => {
    expect(NINE.toString()).toEqual("09:00");
  });

  test("toJSON", () => {
    expect(NINE.toJSON()).toEqual({ hour: HourSchema.parse(9), minute: MinuteSchema.parse(0) });
  });
});
