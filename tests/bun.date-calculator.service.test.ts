import { afterEach, beforeEach, describe, expect, it, setSystemTime } from "bun:test";

import { DateCalculator } from "../src/date-calculator.service";
import { Time } from "../src/time.service";

describe("DateCalculator", () => {
  // UTC noon
  beforeEach(() => setSystemTime(new Date("2024-06-01T12:00:00Z")));

  afterEach(() => setSystemTime());

  it("returns start of day timestamp for UTC timezone", () => {
    const now = Date.now(); // 2024-06-01T12:00:00Z
    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: 0,
    });

    const expected = new Date("2024-06-01T00:00:00Z").getTime();
    expect(result).toBe(expected);
  });

  it("returns start of day for UTC+2 timezone", () => {
    const now = Date.now(); // 2024-06-01T12:00:00Z
    const offset = Time.Hours(2).ms; // +2 hours

    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: offset,
    });

    // In UTC, 12:00 maps to 14:00 local time
    // So start of that local day is 2024-06-01T00:00:00+02:00 => 2024-06-01T02:00:00Z
    const expected = new Date("2024-06-01T02:00:00Z").getTime();
    expect(result).toBe(expected);
  });

  it("returns start of day for UTC-5 timezone", () => {
    const now = Date.now(); // 2024-06-01T12:00:00Z
    const offset = -Time.Hours(5).ms;

    const result = DateCalculator.getStartOfDayTsInTz({
      now,
      timeZoneOffsetMs: offset,
    });

    // In UTC, 12:00 maps to 07:00 local time
    // So start of that local day is 2024-06-01T00:00:00-05:00 => 2024-06-01T05:00:00Z
    const expected = new Date("2024-05-31T19:00:00Z").getTime();
    expect(result).toBe(expected);
  });
});
