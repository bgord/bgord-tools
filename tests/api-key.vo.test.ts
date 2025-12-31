import { describe, expect, test } from "bun:test";
import { ApiKey } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("happy path", () => {
    expect(ApiKey.safeParse("a".repeat(64)).success).toEqual(true);
    expect(ApiKey.safeParse("A".repeat(64)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => ApiKey.parse(null)).toThrow("api.key.type");
  });

  test("rejects non-string - number", () => {
    expect(() => ApiKey.parse(123)).toThrow("api.key.type");
  });

  test("rejects empty", () => {
    expect(() => ApiKey.parse("")).toThrow("api.key.length");
  });

  test("rejects too long", () => {
    expect(() => ApiKey.parse(`${"a".repeat(64)}abc`)).toThrow("api.key.length");
  });

  test("rejects bad chars", () => {
    expect(() => ApiKey.parse(`${"a".repeat(63)}!`)).toThrow("api.key.bad.chars");
  });

  test("rejects prefix", () => {
    expect(() => ApiKey.parse(`prefix${"a".repeat(64)}`)).toThrow("api.key.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => ApiKey.parse(`${"a".repeat(64)}suffix`)).toThrow("api.key.bad.chars");
  });
});
