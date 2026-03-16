import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { ApiKey } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("happy path", () => {
    expect(v.safeParse(ApiKey, "a".repeat(64)).success).toEqual(true);
    expect(v.safeParse(ApiKey, "A".repeat(64)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(ApiKey, null)).toThrow("api.key.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(ApiKey, 123)).toThrow("api.key.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(ApiKey, "")).toThrow("api.key.bad.chars");
  });

  test("rejects too long", () => {
    expect(() => v.parse(ApiKey, `${"a".repeat(64)}abc`)).toThrow("api.key.bad.chars");
  });

  test("rejects bad chars", () => {
    expect(() => v.parse(ApiKey, `${"a".repeat(63)}!`)).toThrow("api.key.bad.chars");
  });
});
