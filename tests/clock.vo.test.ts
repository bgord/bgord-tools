import { describe, expect, test } from "bun:test";
import { Clock } from "../src/clock.vo";
import { ClockFormatters } from "../src/clock-format.service";
import { Hour } from "../src/hour.vo";
import { HourFormatters } from "../src/hour-format.service";
import { Minute } from "../src/minute.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Clock", () => {
  test("toString() defaults to 24h zero-padded", () => {
    expect(new Clock(new Hour(9), new Minute(5)).toString()).toEqual("09:05");
  });

  test("format(TWELVE_HOURS) formats hour in 12h and preserves minute padding", () => {
    expect(new Clock(new Hour(13), new Minute(3), ClockFormatters.TWELVE_HOURS).format()).toEqual("01:03");
  });

  test("get() returns raw numeric hour and minute", () => {
    expect(new Clock(new Hour(7), new Minute(8)).get()).toEqual({ hour: 7, minute: 8 });
  });

  test("equals compares hour and minute", () => {
    const a = new Clock(new Hour(10), new Minute(45));
    const b = new Clock(new Hour(10), new Minute(45));
    const c = new Clock(new Hour(11), new Minute(45));
    const d = new Clock(new Hour(10), new Minute(46));

    expect(a.equals(b)).toEqual(true);
    expect(a.equals(c)).toEqual(false);
    expect(a.equals(d)).toEqual(false);
  });

  test("isAfter handles hour and minute ordering", () => {
    expect(new Clock(new Hour(11), new Minute(0)).isAfter(new Clock(new Hour(10), new Minute(59)))).toEqual(
      true,
    );
    expect(new Clock(new Hour(10), new Minute(30)).isAfter(new Clock(new Hour(10), new Minute(15)))).toEqual(
      true,
    );
    expect(new Clock(new Hour(9), new Minute(15)).isAfter(new Clock(new Hour(10), new Minute(0)))).toEqual(
      false,
    );
  });

  test("isBefore handles hour and minute ordering", () => {
    expect(new Clock(new Hour(8), new Minute(59)).isBefore(new Clock(new Hour(9), new Minute(0)))).toEqual(
      true,
    );
    expect(new Clock(new Hour(9), new Minute(30)).isBefore(new Clock(new Hour(9), new Minute(45)))).toEqual(
      true,
    );
    expect(new Clock(new Hour(12), new Minute(30)).isBefore(new Clock(new Hour(12), new Minute(15)))).toEqual(
      false,
    );
  });

  test("fromEpochMs uses UTC hour and minute", () => {
    expect(Clock.fromEpochMs(Timestamp.parse(1700000000000)).get()).toEqual({ hour: 22, minute: 13 });
  });

  test("composes HourFormatters with a custom Clock formatter", () => {
    const composed = (hour: Hour, minute: Minute) =>
      `${hour.format(HourFormatters.AM_PM)} @ ${minute.toString()} min`;

    const clock = new Clock(new Hour(15), new Minute(7), composed);

    expect(clock.format()).toEqual("3 p.m. @ 07 min");
  });

  test("toJSON", () => {
    expect(new Clock(new Hour(15), new Minute(7)).toJSON()).toEqual({ hour: 15, minute: 7 });
  });
});
