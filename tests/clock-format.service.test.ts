import { describe, expect, test } from "bun:test";
import { ClockFormatters } from "../src/clock-format.service";
import { Hour } from "../src/hour.vo";
import { Minute } from "../src/minute.vo";

describe("ClockFormatters", () => {
  test("TWENTY_FOUR_HOURS -> HH:MM (zero-padded)", () => {
    const clock = { hour: new Hour(5), minute: new Minute(3) };
    expect(ClockFormatters.TWENTY_FOUR_HOURS(clock.hour, clock.minute)).toBe("05:03");
  });

  test("TWELVE_HOURS formats the hour in 12h and preserves minute padding", () => {
    const midday = { hour: new Hour(12), minute: new Minute(0) };
    const afternoon = { hour: new Hour(15), minute: new Minute(9) };

    expect(ClockFormatters.TWELVE_HOURS(midday.hour, midday.minute)).toBe("12:00");
    expect(ClockFormatters.TWELVE_HOURS(afternoon.hour, afternoon.minute)).toBe("03:09");
  });
});
