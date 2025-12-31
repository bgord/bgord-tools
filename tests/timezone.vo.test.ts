import { describe, expect, test } from "bun:test";
import { Timezone } from "../src/timezone.vo";

describe("Timezone", () => {
  test("happy path", () => {
    const valid = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

    for (const value of valid) {
      expect(Timezone.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => Timezone.parse("")).toThrow("timezone.empty");
  });

  test("rejects non-string - null", () => {
    expect(() => Timezone.parse(null)).toThrow("timezone.type");
  });

  test("rejects non-string - number", () => {
    expect(() => Timezone.parse(123)).toThrow("timezone.type");
  });

  test("rejects too long", () => {
    expect(() => Timezone.parse("a".repeat(129))).toThrow("timezone.too.long");
  });

  test("rejects invalid timezones", () => {
    const invalid = ["invalid-timezone", "Moon/Base1", "GMT+25"];

    for (const value of invalid) {
      expect(() => Timezone.parse(value)).toThrow("timezone.invalid");
    }
  });
});
