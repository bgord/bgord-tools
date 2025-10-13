import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { DateFormatters } from "../src/date-formatter.service";

const testDate = new Date("2024-06-01T15:30:00Z");

describe("DateFormatters", () => {
  test("datetime formats date with date and time", () => {
    expect(DateFormatters.datetime(testDate)).toEqual("2024/06/01 15:30");
  });

  test("date formats date with just year/month/day", () => {
    expect(DateFormatters.date(testDate)).toEqual("2024/06/01");
  });

  test("monthDay formats date with just month/day", () => {
    expect(DateFormatters.monthDay(testDate)).toEqual("06/01");
  });

  describe("relative", () => {
    beforeEach(() => setSystemTime(new Date("2024-06-01T15:35:00Z")));
    afterEach(() => setSystemTime());

    test("returns relative time with suffix", () => {
      expect(DateFormatters.relative(testDate)).toEqual("5 minutes ago");
    });
  });
});
