import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Email } from "../src/email.vo";

describe("Email", () => {
  test("happy path", () => {
    expect(v.safeParse(Email, "user@example.com").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => v.parse(Email, "")).toThrow("email.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(Email, null)).toThrow("email.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(Email, 123)).toThrow("email.type");
  });

  test("rejects too long", () => {
    expect(() => v.parse(Email, `${"a".repeat(250)}@x.com`)).toThrow("email.too.long");
  });
});
