import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { DateFormatters } from "../src/date-formatter.service";
import * as mocks from "./mocks";

const date = new Date(mocks.TIME_ZERO.get());

describe("DateFormatters", () => {
  test("datetime formats date with date and time", () => {
    expect(DateFormatters.datetime(date)).toEqual("2023/11/14 22:13");
  });

  test("date formats date with just year/month/day", () => {
    expect(DateFormatters.date(date)).toEqual("2023/11/14");
  });

  test("monthDay formats date with just month/day", () => {
    expect(DateFormatters.monthDay(date)).toEqual("11/14");
  });

  describe("relative", () => {
    beforeEach(() => setSystemTime(new Date("2024-06-01T15:35:00Z")));
    afterEach(() => setSystemTime());

    test("returns relative time with suffix", () => {
      expect(DateFormatters.relative(date)).toEqual("7 months ago");
    });
  });
});
