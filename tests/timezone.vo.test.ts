import { describe, expect, test } from "bun:test";
import { Timezone } from "../src/timezone.vo";

describe("Timezone", () => {
  test("valid timezones", () => {
    const validTimezones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];
    for (const tz of validTimezones) expect(Timezone.safeParse(tz).success).toBe(true);
  });

  test("invalid timezones", () => {
    const invalidTimezones = ["invalid-timezone", "Moon/Base1", "GMT+25"];
    for (const tz of invalidTimezones) expect(Timezone.safeParse(tz).success).toBe(false);
  });
});
