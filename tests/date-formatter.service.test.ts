import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";

import { DateFormatters } from "../src/date-formatter.service";

describe("DateFormatters", () => {
  const testDate = new Date("2024-06-01T15:30:00Z");

  describe("datetime", () => {
    test("formats date with date and time", () => {
      const result = DateFormatters.datetime(testDate);
      expect(result).toBe("2024/06/01 15:30");
    });
  });

  describe("date", () => {
    test("formats date with just year/month/day", () => {
      const result = DateFormatters.date(testDate);
      expect(result).toBe("2024/06/01");
    });
  });

  describe("monthDay", () => {
    test("formats date with just month/day", () => {
      const result = DateFormatters.monthDay(testDate);
      expect(result).toBe("06/01");
    });
  });

  describe("relative", () => {
    beforeEach(() => setSystemTime(new Date("2024-06-01T15:35:00Z")));

    afterEach(() => setSystemTime());

    test("returns relative time with suffix", () => {
      const result = DateFormatters.relative(testDate);
      expect(result).toBe("5 minutes ago");
    });
  });
});
