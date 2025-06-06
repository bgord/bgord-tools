import { describe, expect, it } from "bun:test";

import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  it("should parse a valid numeric string", () => {
    expect(TimeZoneOffsetValue.parse("120")).toBe(120);
    expect(TimeZoneOffsetValue.parse("-60")).toBe(-60);
    expect(TimeZoneOffsetValue.parse("0")).toBe(0);
  });

  it("should trim the string before parsing", () => {
    expect(TimeZoneOffsetValue.parse(" 90 ")).toBe(90);
  });

  it("should transform undefined to 0", () => {
    expect(TimeZoneOffsetValue.parse(undefined)).toBe(0);
  });

  it("should transform non-numeric strings to 0", () => {
    expect(TimeZoneOffsetValue.parse("abc")).toBe(0);
    expect(TimeZoneOffsetValue.parse("")).toBe(0);
    expect(TimeZoneOffsetValue.parse(" ")).toBe(0);
  });
});
