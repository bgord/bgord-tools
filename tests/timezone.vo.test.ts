import { describe, expect, test } from "bun:test";
import { Timezone, TimezoneError } from "../src/timezone.vo";

describe("Timezone", () => {
  test("valid timezones parse", () => {
    for (const timezone of ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"]) {
      expect(() => Timezone.parse(timezone)).not.toThrow();
    }
  });

  test("invalid timezones throw with the VO-specific error", () => {
    for (const timezone of ["invalid-timezone", "Moon/Base1", "GMT+25"]) {
      expect(() => Timezone.parse(timezone)).toThrow(TimezoneError.error);
    }
  });
});
