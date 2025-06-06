import { describe, expect, test } from "bun:test";
import { subDays } from "date-fns";

import { StreakCalculator } from "../src/streak-calculator.service";

const now = new Date();
const today = StreakCalculator.format(now);
const yesterday = StreakCalculator.format(subDays(now, 1));
const dayBeforeYesterday = StreakCalculator.format(subDays(now, 2));
const dayBeforeDayBeforeYesterday = StreakCalculator.format(subDays(now, 3));

describe("StreakCalculator", () => {
  const streakCalculator = new StreakCalculator();

  test("returns 0 for no dates", () => {
    expect(streakCalculator.calculate([]).streak).toEqual(0);
  });

  test("returns proper metadata", () => {
    expect(streakCalculator.calculate([])).toEqual({
      cutoff: today,
      streak: 0,
      dates: [],
    });
  });

  test("returns 1 for one date streak", () => {
    expect(streakCalculator.calculate([today]).streak).toEqual(1);
  });

  test("returns 1 for one date streak - deduplicated", () => {
    expect(streakCalculator.calculate([today, today, today]).streak).toEqual(1);
  });

  test("returns 2 for two date streak", () => {
    expect(streakCalculator.calculate([today, yesterday]).streak).toEqual(2);
  });

  test("returns 3 for three date streak", () => {
    expect(streakCalculator.calculate([today, yesterday, dayBeforeYesterday]).streak).toEqual(3);
  });

  test("returns 4 for four date streak", () => {
    expect(
      streakCalculator.calculate([today, yesterday, dayBeforeYesterday, dayBeforeDayBeforeYesterday]).streak,
    ).toEqual(4);
  });

  test("returns 0 for one date which is different than today", () => {
    expect(streakCalculator.calculate([yesterday]).streak).toEqual(0);
  });

  test("returns 1 for one day break", () => {
    expect(streakCalculator.calculate([today, dayBeforeYesterday]).streak).toEqual(1);
  });

  test("returns 1 for two days break", () => {
    expect(streakCalculator.calculate([today, dayBeforeDayBeforeYesterday]).streak).toEqual(1);
  });

  test("returns 2 for two days after one day break", () => {
    expect(streakCalculator.calculate([today, yesterday, dayBeforeDayBeforeYesterday]).streak).toEqual(2);
  });
});
