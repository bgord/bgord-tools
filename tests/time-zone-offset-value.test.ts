import { describe, expect, test } from "bun:test";

import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  test("should parse a valid numeric string", () => {
    expect(TimeZoneOffsetValue.parse("120")).toBe(120);
    expect(TimeZoneOffsetValue.parse("-60")).toBe(-60);
    expect(TimeZoneOffsetValue.parse("0")).toBe(0);
  });

  test("should trim the string before parsing", () => {
    expect(TimeZoneOffsetValue.parse(" 90 ")).toBe(90);
  });

  test("should transform undefined to 0", () => {
    expect(TimeZoneOffsetValue.parse(undefined)).toBe(0);
  });

  test("should transform non-numeric strings to 0", () => {
    expect(TimeZoneOffsetValue.parse("abc")).toBe(0);
    expect(TimeZoneOffsetValue.parse("")).toBe(0);
    expect(TimeZoneOffsetValue.parse(" ")).toBe(0);
  });
});
