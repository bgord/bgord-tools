import { describe, expect, test } from "bun:test";
import { Duration, DurationMsError, DurationMsSchema, Time } from "../src/duration.service";
import { Timestamp, type TimestampType } from "../src/timestamp.vo";

describe("Duration", () => {
  describe("Days", () => {
    test("converts days", () => {
      const days = Duration.Days(2);
      expect(days.days).toEqual(2);
      expect(days.hours).toEqual(48);
      expect(days.minutes).toEqual(2880);
      expect(days.seconds).toEqual(172800);
      expect(days.ms).toEqual(DurationMsSchema.parse(172_800_000));
    });
  });

  describe("Hours", () => {
    test("converts hours", () => {
      const hours = Duration.Hours(3);
      expect(hours.days).toEqual(0.13);
      expect(hours.hours).toEqual(3);
      expect(hours.minutes).toEqual(180);
      expect(hours.seconds).toEqual(10_800);
      expect(hours.ms).toEqual(DurationMsSchema.parse(10_800_000));
    });
  });

  describe("Minutes", () => {
    test("converts minutes", () => {
      const minutes = Duration.Minutes(30);
      expect(minutes.days).toEqual(0.02);
      expect(minutes.hours).toEqual(0.5);
      expect(minutes.minutes).toEqual(30);
      expect(minutes.seconds).toEqual(1_800);
      expect(minutes.ms).toEqual(DurationMsSchema.parse(1_800_000));
    });
  });

  describe("Seconds", () => {
    test("converts seconds", () => {
      const seconds = Duration.Seconds(120);
      expect(seconds.days).toEqual(0);
      expect(seconds.hours).toEqual(0.03);
      expect(seconds.minutes).toEqual(2);
      expect(seconds.seconds).toEqual(120);
      expect(seconds.ms).toEqual(DurationMsSchema.parse(120_000));
    });
  });

  describe("Ms", () => {
    test("converts ms", () => {
      const ms = Duration.Ms(500);
      expect(ms.days).toEqual(0);
      expect(ms.hours).toEqual(0);
      expect(ms.minutes).toEqual(0.01);
      expect(ms.seconds).toEqual(0.5);
      expect(ms.ms).toEqual(DurationMsSchema.parse(500));
    });
  });

  describe("arithmetic", () => {
    test("add/subtract", () => {
      const base = Duration.Seconds(10);
      const added = base.add(Duration.Seconds(5));
      const subtracted = base.subtract(Duration.Seconds(3));

      expect(added.seconds).toEqual(15);
      expect(subtracted.seconds).toEqual(7);
    });

    test("equals / comparisons", () => {
      const a = Duration.Ms(1_000);
      const b = Duration.Ms(1_000);
      const c = Duration.Ms(2_000);

      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);

      expect(c.isLongerThan(a)).toBe(true);
      expect(a.isShorterThan(c)).toBe(true);
      expect(a.isLongerThan(c)).toBe(false);
      expect(c.isShorterThan(a)).toBe(false);
    });
  });

  describe("Time.Now", () => {
    test("Minus produces a timestamp", () => {
      const start = Timestamp.parse(1_700_000_000_000);
      const result = Time.Now(start).Minus(Duration.Ms(500));
      expect(result).toEqual(Timestamp.parse(1_699_999_999_500));
    });

    test("Add produces a timestamp", () => {
      const start = Timestamp.parse(1_700_000_000_000);
      const result = Time.Now(start).Add(Duration.Ms(500));
      expect(result).toEqual(Timestamp.parse(1_700_000_000_500));
    });
  });

  describe("DurationMsSchema", () => {
    test("rejects non-number", () => {
      expect(() => DurationMsSchema.parse("a")).toThrow(DurationMsError.error);
    });

    test("rejects non-integer ms", () => {
      expect(() => DurationMsSchema.parse(1.5)).toThrow(DurationMsError.error);
    });

    test("accepts finite integer ms", () => {
      // @ts-expect-error
      expect(DurationMsSchema.parse(1_234)).toEqual(1_234);
    });
  });
});
