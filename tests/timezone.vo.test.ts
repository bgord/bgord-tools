import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Timezone } from "../src/timezone.vo";

describe("Timezone", () => {
  test("happy path", () => {
    const valid = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];
    for (const value of valid) {
      expect(v.safeParse(Timezone, value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => v.parse(Timezone, "")).toThrow("timezone.empty");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(Timezone, null)).toThrow("timezone.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(Timezone, 123)).toThrow("timezone.type");
  });

  test("rejects too long", () => {
    expect(() => v.parse(Timezone, "a".repeat(129))).toThrow("timezone.too.long");
  });

  test("rejects invalid timezones", () => {
    const invalid = ["invalid-timezone", "Moon/Base1", "GMT+25"];
    for (const value of invalid) {
      expect(() => v.parse(Timezone, value)).toThrow("timezone.invalid");
    }
  });
});
