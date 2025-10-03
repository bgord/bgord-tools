import { describe, expect, test } from "bun:test";
import { TimeZoneOffsetValue, type TimeZoneOffsetValueType } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  test("parses valid numeric strings", () => {
    expect(() => TimeZoneOffsetValue.parse("120")).not.toThrow();
    expect(() => TimeZoneOffsetValue.parse("-60")).not.toThrow();
    expect(() => TimeZoneOffsetValue.parse("0")).not.toThrow();
  });

  test("trims the string before parsing", () => {
    expect(TimeZoneOffsetValue.parse(" 90 ")).toEqual(90 as TimeZoneOffsetValueType);
  });

  test("transforms undefined to 0", () => {
    expect(TimeZoneOffsetValue.parse(undefined)).toEqual(0 as TimeZoneOffsetValueType);
  });

  test("transforms non-numeric strings to 0", () => {
    expect(TimeZoneOffsetValue.parse("abc")).toEqual(0 as TimeZoneOffsetValueType);
    expect(TimeZoneOffsetValue.parse("")).toEqual(0 as TimeZoneOffsetValueType);
    expect(TimeZoneOffsetValue.parse(" ")).toEqual(0 as TimeZoneOffsetValueType);
  });
});
