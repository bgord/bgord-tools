import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { DateCalculator } from "../src/date-calculator.service";
import { Duration } from "../src/duration.service";
import { TimestampVO } from "../src/timestamp.vo";

describe("DateCalculator", () => {
  beforeEach(() => setSystemTime(new Date("2024-06-01T12:00:00Z")));
  afterEach(() => setSystemTime());

  test("UTC timezone", () => {
    const now = TimestampVO.fromNumber(Date.now()); // 2024-06-01T12:00:00Z
    const result = DateCalculator.getStartOfDayTsInTz({ now, timeZoneOffset: Duration.Ms(0) });

    expect(result).toEqual(TimestampVO.fromNumber(new Date("2024-06-01T00:00:00Z").getTime()));
  });

  test("UTC+2 timezone", () => {
    const now = TimestampVO.fromNumber(Date.now()); // 2024-06-01T12:00:00Z
    const result = DateCalculator.getStartOfDayTsInTz({ now, timeZoneOffset: Duration.Hours(2) });

    // Local day = 2024-06-01 (because 12:00Z is 14:00 local).
    // Local midnight (00:00 +02:00) corresponds to 2024-06-01T02:00:00Z.
    expect(result).toEqual(TimestampVO.fromNumber(new Date("2024-06-01T02:00:00Z").getTime()));
  });

  test("UTC-5 timezone", () => {
    const now = TimestampVO.fromNumber(Date.now()); // 2024-06-01T12:00:00Z
    const result = DateCalculator.getStartOfDayTsInTz({ now, timeZoneOffset: Duration.Hours(-5) });

    // Local day = 2024-06-01 (because 12:00Z is 07:00 local).
    // Local midnight (00:00 -05:00) corresponds to 2024-05-31T19:00:00Z.
    expect(result).toEqual(TimestampVO.fromNumber(new Date("2024-05-31T19:00:00Z").getTime()));
  });
});
