import { describe, expect, test } from "bun:test";
import { TimeZoneOffsetValue, TimeZoneOffsetValueType } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  test("should parse a valid numeric string", () => {
    expect(() => TimeZoneOffsetValue.parse("120")).not.toThrow();
    expect(() => TimeZoneOffsetValue.parse("-60")).not.toThrow();
    expect(() => TimeZoneOffsetValue.parse("0")).not.toThrow();
  });

  test("should trim the string before parsing", () => {
    expect(TimeZoneOffsetValue.parse(" 90 ")).toBe(90 as TimeZoneOffsetValueType);
  });

  test("should transform undefined to 0", () => {
    expect(TimeZoneOffsetValue.parse(undefined)).toBe(0 as TimeZoneOffsetValueType);
  });

  test("should transform non-numeric strings to 0", () => {
    expect(TimeZoneOffsetValue.parse("abc")).toBe(0 as TimeZoneOffsetValueType);
    expect(TimeZoneOffsetValue.parse("")).toBe(0 as TimeZoneOffsetValueType);
    expect(TimeZoneOffsetValue.parse(" ")).toBe(0 as TimeZoneOffsetValueType);
  });
});
