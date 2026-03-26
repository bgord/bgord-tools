import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { SmsBody } from "../src/sms-body.vo";

describe("SmsBody", () => {
  test("happy path", () => {
    expect(v.safeParse(SmsBody, "Your OTP is 123456").success).toEqual(true);
  });

  test("happy path - max length", () => {
    expect(v.safeParse(SmsBody, "a".repeat(640)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(SmsBody, null)).toThrow("sms.body.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(SmsBody, 123456)).toThrow("sms.body.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(SmsBody, "")).toThrow("sms.body.empty");
  });

  test("rejects too long", () => {
    expect(() => v.parse(SmsBody, "a".repeat(641))).toThrow("sms.body.too.long");
  });
});
