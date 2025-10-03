import { describe, expect, test } from "bun:test";
import { Time } from "../src/time.service";
import type { TimestampType } from "../src/timestamp.vo";

describe("Time", () => {
  describe("Days", () => {
    test("should correctly convert days", () => {
      const days = Time.Days(2);
      expect(days.days).toEqual(2);
      expect(days.hours).toEqual(48);
      expect(days.minutes).toEqual(2880);
      expect(days.seconds).toEqual(172800);
      expect(days.ms).toEqual(172800000 as TimestampType);
    });
  });

  describe("Hours", () => {
    test("should correctly convert hours", () => {
      const hours = Time.Hours(3);
      expect(hours.days).toEqual(0.13);
      expect(hours.hours).toEqual(3);
      expect(hours.minutes).toEqual(180);
      expect(hours.seconds).toEqual(10800);
      expect(hours.ms).toEqual(10800000 as TimestampType);
    });
  });

  describe("Minutes", () => {
    test("should correctly convert minutes", () => {
      const minutes = Time.Minutes(30);
      expect(minutes.days).toEqual(0.02);
      expect(minutes.hours).toEqual(0.5);
      expect(minutes.minutes).toEqual(30);
      expect(minutes.seconds).toEqual(1800);
      expect(minutes.ms).toEqual(1800000 as TimestampType);
    });
  });

  describe("Seconds", () => {
    test("should correctly convert seconds", () => {
      const seconds = Time.Seconds(120);
      expect(seconds.days).toEqual(0);
      expect(seconds.hours).toEqual(0.03);
      expect(seconds.minutes).toEqual(2);
      expect(seconds.seconds).toEqual(120);
      expect(seconds.ms).toEqual(120000 as TimestampType);
    });
  });

  describe("Ms", () => {
    test("should correctly convert ms", () => {
      const ms = Time.Ms(500);
      expect(ms.days).toEqual(0);
      expect(ms.hours).toEqual(0);
      expect(ms.minutes).toEqual(0.01);
      expect(ms.seconds).toEqual(0.5);
      expect(ms.ms).toEqual(500 as TimestampType);
    });
  });

  describe("Now", () => {
    test("minus", () => {
      const result = Time.Now(1700000000000 as TimestampType).Minus(Time.Ms(500));
      expect(result.ms).toEqual(1699999999500 as TimestampType);
    });

    test("add", () => {
      const result = Time.Now(1700000000000 as TimestampType).Add(Time.Ms(500));
      expect(result.ms).toEqual(1700000000500 as TimestampType);
    });
  });

  describe("isAfter", () => {
    test("returns true when a time is after another", () => {
      expect(Time.Ms(1700000000000).isAfter(Time.Ms(0))).toEqual(true);
    });

    test("returns false when a time is not after another", () => {
      const now = Date.now() as TimestampType;
      expect(Time.Ms(1700000000000).isAfter(Time.Now(now).Minus(Time.Days(3)))).toEqual(false);
    });
  });

  describe("ergonomics", () => {
    test("add/subtract on TimeResult", () => {
      const base = Time.Seconds(10);
      const added = base.add(Time.Seconds(5));
      const subtracted = base.subtract(Time.Seconds(3));

      expect(added.seconds).toEqual(15);
      expect(subtracted.seconds).toEqual(7);
    });
  });
});
