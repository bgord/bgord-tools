import { describe, expect, test } from "bun:test";
import { Email } from "../src/email.vo";

describe("Email", () => {
  test("happy path", () => {
    expect(Email.safeParse("user@example.com").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => Email.parse("")).toThrow("email.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => Email.parse(null)).toThrow("email.invalid");
  });

  test("rejects non-string - number", () => {
    expect(() => Email.parse(123)).toThrow("email.invalid");
  });
});
