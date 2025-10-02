import { describe, expect, test } from "bun:test";
import { Hour } from "../src/hour.vo";
import { HourFormatters } from "../src/hour-format.service";

describe("Hour", () => {
  test("formats using TWENTY_FOUR_HOURS_WO_PADDING", () => {
    expect(new Hour(5).format(HourFormatters.TWENTY_FOUR_HOURS_WO_PADDING)).toEqual("5");
  });

  test("formats using AM_PM", () => {
    expect(new Hour(5).format(HourFormatters.AM_PM)).toEqual("5 a.m.");
    expect(new Hour(15).format(HourFormatters.AM_PM)).toEqual("3 p.m.");
    expect(new Hour(0).format(HourFormatters.AM_PM)).toEqual("12 a.m.");
    expect(new Hour(12).format(HourFormatters.AM_PM)).toEqual("12 p.m.");
  });

  test("formats using TWELVE_HOURS", () => {
    expect(new Hour(15).format(HourFormatters.TWELVE_HOURS)).toEqual("03");
    expect(new Hour(0).format(HourFormatters.TWELVE_HOURS)).toEqual("12");
  });

  test("formats using TWELVE_HOURS_WO_PADDING", () => {
    expect(new Hour(15).format(HourFormatters.TWELVE_HOURS_WO_PADDING)).toEqual("3");
    expect(new Hour(0).format(HourFormatters.TWELVE_HOURS_WO_PADDING)).toEqual("12");
  });
});
