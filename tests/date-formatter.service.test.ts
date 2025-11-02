import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { DateFormatters } from "../src/date-formatter.service";
import * as mocks from "./mocks";

const date = new Date(mocks.TIME_ZERO.ms);

describe("DateFormatters", () => {
  test("datetime", () => {
    expect(DateFormatters.datetime(date)).toEqual("2023/11/14 22:13");
  });

  test("date", () => {
    expect(DateFormatters.date(date)).toEqual("2023/11/14");
  });

  test("monthDay", () => {
    expect(DateFormatters.monthDay(date)).toEqual("11/14");
  });

  describe("relative", () => {
    beforeEach(() => setSystemTime(new Date("2024-06-01T15:35:00Z")));
    afterEach(() => setSystemTime());

    test("happy path", () => {
      expect(DateFormatters.relative(date)).toEqual("7 months ago");
    });
  });
});
