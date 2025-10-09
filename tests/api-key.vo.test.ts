import { describe, expect, test } from "bun:test";
import { ApiKey, ApiKeyError } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("accepts a 64-char string", () => {
    expect(ApiKey.safeParse("a".repeat(64)).success).toEqual(true);
    expect(ApiKey.safeParse("A".repeat(64)).success).toEqual(true);
  });

  test("accepts a 64-char string trimmed", () => {
    expect(() => ApiKey.parse(`  ${"a".repeat(64)}  `)).not.toThrow();
  });

  test("rejects non-string input - number", () => {
    expect(() => ApiKey.parse(123)).toThrow(ApiKeyError.Type);
  });

  test("rejects non-string input - null", () => {
    expect(() => ApiKey.parse(null)).toThrow(ApiKeyError.Type);
  });

  test("rejects empty", () => {
    expect(() => ApiKey.parse("")).toThrow(ApiKeyError.Length);
  });

  test("rejects too long", () => {
    expect(() => ApiKey.parse(`${"a".repeat(64)}abc`)).toThrow(ApiKeyError.Length);
  });

  test("rejects bad chars", () => {
    expect(() => ApiKey.parse(`${"a".repeat(63)}!`)).toThrow(ApiKeyError.BadChars);
  });
});
