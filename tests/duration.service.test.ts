import { describe, expect, test } from "bun:test";
import { Duration, DurationMsError, DurationMsSchema } from "../src/duration.service";
import type { TimestampType } from "../src/timestamp.vo";

describe("Duration", () => {
  describe("Days", () => {
    test("should correctly convert days", () => {
      const days = Duration.Days(2);
      expect(days.days).toEqual(2);
      expect(days.hours).toEqual(48);
      expect(days.minutes).toEqual(2880);
      expect(days.seconds).toEqual(172800);
      expect(days.ms).toEqual(DurationMsSchema.parse(172800000));
    });
  });

  describe("Hours", () => {
    test("should correctly convert hours", () => {
      const hours = Duration.Hours(3);
      expect(hours.days).toEqual(0.13);
      expect(hours.hours).toEqual(3);
      expect(hours.minutes).toEqual(180);
      expect(hours.seconds).toEqual(10800);
      expect(hours.ms).toEqual(DurationMsSchema.parse(10800000));
    });
  });

  describe("Minutes", () => {
    test("should correctly convert minutes", () => {
      const minutes = Duration.Minutes(30);
      expect(minutes.days).toEqual(0.02);
      expect(minutes.hours).toEqual(0.5);
      expect(minutes.minutes).toEqual(30);
      expect(minutes.seconds).toEqual(1800);
      expect(minutes.ms).toEqual(DurationMsSchema.parse(1800000));
    });
  });

  describe("Seconds", () => {
    test("should correctly convert seconds", () => {
      const seconds = Duration.Seconds(120);
      expect(seconds.days).toEqual(0);
      expect(seconds.hours).toEqual(0.03);
      expect(seconds.minutes).toEqual(2);
      expect(seconds.seconds).toEqual(120);
      expect(seconds.ms).toEqual(DurationMsSchema.parse(120000));
    });
  });

  describe("Ms", () => {
    test("should correctly convert ms", () => {
      const ms = Duration.Ms(500);
      expect(ms.days).toEqual(0);
      expect(ms.hours).toEqual(0);
      expect(ms.minutes).toEqual(0.01);
      expect(ms.seconds).toEqual(0.5);
      expect(ms.ms).toEqual(DurationMsSchema.parse(500));
    });
  });

  describe("Now", () => {
    test("minus", () => {
      const result = Duration.Now(1700000000000 as TimestampType).Minus(Duration.Ms(500));
      expect(result.ms).toEqual(DurationMsSchema.parse(1699999999500));
    });

    test("add", () => {
      const result = Duration.Now(1700000000000 as TimestampType).Add(Duration.Ms(500));
      expect(result.ms).toEqual(DurationMsSchema.parse(1700000000500));
    });
  });

  describe("isAfter", () => {
    test("returns true when a time is after another", () => {
      expect(Duration.Ms(1700000000000).isAfter(Duration.Ms(0))).toEqual(true);
    });

    test("returns false when a time is not after another", () => {
      const now = Date.now() as TimestampType;
      expect(Duration.Ms(1700000000000).isAfter(Duration.Now(now).Minus(Duration.Days(3)))).toEqual(false);
    });
  });

  describe("ergonomics", () => {
    test("add/subtract on TimeResult", () => {
      const base = Duration.Seconds(10);
      const added = base.add(Duration.Seconds(5));
      const subtracted = base.subtract(Duration.Seconds(3));

      expect(added.seconds).toEqual(15);
      expect(subtracted.seconds).toEqual(7);
    });
  });

  describe("DurationMsSchema", () => {
    expect(() => DurationMsSchema.parse("a")).toThrow(DurationMsError.error);
    expect(() => DurationMsSchema.parse(1.5)).toThrow(DurationMsError.error);
  });
});
