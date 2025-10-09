import { describe, expect, test } from "bun:test";
import { Timezone, TimezoneError } from "../src/timezone.vo";

describe("Timezone", () => {
  test("valid timezones parse", () => {
    const valid = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

    for (const value of valid) {
      expect(Timezone.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => Timezone.parse("")).toThrow(TimezoneError.Empty);
  });

  test("rejects non-string - null", () => {
    expect(() => Timezone.parse(null)).toThrow(TimezoneError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => Timezone.parse(123)).toThrow(TimezoneError.Type);
  });

  test("rejects too long", () => {
    expect(() => Timezone.parse("a".repeat(129))).toThrow(TimezoneError.TooLong);
  });

  test("rejects invalid timezones", () => {
    const invalid = ["invalid-timezone", "Moon/Base1", "GMT+25"];

    for (const value of invalid) {
      expect(() => Timezone.parse(value)).toThrow(TimezoneError.Invalid);
    }
  });
});
