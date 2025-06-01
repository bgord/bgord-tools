import { describe, expect, it } from "bun:test";
import { TimeZoneOffset } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  it("should parse a valid numeric string", () => {
    expect(TimeZoneOffset.parse("120")).toBe(120);
    expect(TimeZoneOffset.parse("-60")).toBe(-60);
    expect(TimeZoneOffset.parse("0")).toBe(0);
  });

  it("should trim the string before parsing", () => {
    expect(TimeZoneOffset.parse(" 90 ")).toBe(90);
  });

  it("should transform undefined to 0", () => {
    expect(TimeZoneOffset.parse(undefined)).toBe(0);
  });

  it("should transform non-numeric strings to 0", () => {
    expect(TimeZoneOffset.parse("abc")).toBe(0);
    expect(TimeZoneOffset.parse("")).toBe(0);
    expect(TimeZoneOffset.parse(" ")).toBe(0);
  });
});
