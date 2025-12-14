import { describe, expect, test } from "bun:test";
import { Email, EmailError } from "../src/email.vo";

describe("Email", () => {
  test("happy path", () => {
    expect(Email.safeParse("user@example.com").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => Email.parse("")).toThrow(EmailError.Invalid);
  });

  test("rejects non-string - null", () => {
    expect(() => Email.parse(null)).toThrow(EmailError.Invalid);
  });

  test("rejects non-string - number", () => {
    expect(() => Email.parse(123)).toThrow(EmailError.Invalid);
  });
});
