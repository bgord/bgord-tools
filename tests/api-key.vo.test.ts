import { describe, expect, test } from "bun:test";
import { ApiKey, ApiKeyError } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("happy path", () => {
    expect(ApiKey.safeParse("a".repeat(64)).success).toEqual(true);
    expect(ApiKey.safeParse("A".repeat(64)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => ApiKey.parse(null)).toThrow(ApiKeyError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => ApiKey.parse(123)).toThrow(ApiKeyError.Type);
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
