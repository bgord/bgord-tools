import { expect, test } from "bun:test";
import { Timezone } from "../src/timezone.vo";

test("valid timezones", () => {
  const validTimezones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

  for (const tz of validTimezones) {
    const result = Timezone.safeParse(tz);
    expect(result.success).toBe(true);
  }
});

test("invalid timezones", () => {
  const invalidTimezones = ["invalid-timezone", "Moon/Base1", "GMT+25"];

  for (const tz of invalidTimezones) {
    const result = Timezone.safeParse(tz);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("timezone.invalid");
    }
  }
});
