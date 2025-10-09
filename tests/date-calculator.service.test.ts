import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { DateCalculator } from "../src/date-calculator.service";
import { Duration } from "../src/duration.service";
import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("DateCalculator", () => {
  beforeEach(() => setSystemTime(new Date("2024-06-01T12:00:00Z")));
  afterEach(() => setSystemTime());

  test("returns start of day timestamp for UTC timezone", () => {
    const now = Timestamp.parse(Date.now()); // 2024-06-01T12:00:00Z
    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: TimeZoneOffsetValue.parse(0),
    });

    expect(result).toEqual(Timestamp.parse(new Date("2024-06-01T00:00:00Z").getTime()));
  });

  test("returns start of day for UTC+2 timezone", () => {
    const now = Timestamp.parse(Date.now()); // 2024-06-01T12:00:00Z
    const offset = Duration.Hours(2).ms; // +2 hours
    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: TimeZoneOffsetValue.parse(offset),
    });

    // Local day = 2024-06-01 (because 12:00Z is 14:00 local).
    // Local midnight (00:00 +02:00) corresponds to 2024-06-01T02:00:00Z.
    expect(result).toEqual(Timestamp.parse(new Date("2024-06-01T02:00:00Z").getTime()));
  });

  test("returns start of day for UTC-5 timezone", () => {
    const now = Timestamp.parse(Date.now()); // 2024-06-01T12:00:00Z
    const offset = -Duration.Hours(5).ms; // -5 hours
    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: TimeZoneOffsetValue.parse(offset),
    });

    // Local day = 2024-06-01 (because 12:00Z is 07:00 local).
    // Local midnight (00:00 -05:00) corresponds to 2024-05-31T19:00:00Z.
    expect(result).toEqual(Timestamp.parse(new Date("2024-05-31T19:00:00Z").getTime()));
  });
});
