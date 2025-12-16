import { describe, expect, test } from "bun:test";
import { ClockFormatters } from "../src/clock-format.service";
import { Hour } from "../src/hour.vo";
import { Minute } from "../src/minute.vo";

describe("ClockFormatters", () => {
  test("TWENTY_FOUR_HOURS", () => {
    const clock = { hour: Hour.fromValue(5), minute: Minute.fromValue(3) };

    expect(ClockFormatters.TWENTY_FOUR_HOURS(clock.hour, clock.minute)).toEqual("05:03");
  });

  test("TWELVE_HOURS ", () => {
    const midday = { hour: Hour.fromValue(12), minute: Minute.fromValue(0) };
    const afternoon = { hour: Hour.fromValue(15), minute: Minute.fromValue(9) };

    expect(ClockFormatters.TWELVE_HOURS(midday.hour, midday.minute)).toEqual("12:00");
    expect(ClockFormatters.TWELVE_HOURS(afternoon.hour, afternoon.minute)).toEqual("03:09");
  });
});
