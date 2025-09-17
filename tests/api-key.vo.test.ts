import { describe, expect, test } from "bun:test";
import { ApiKey } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("should accept a 64-character non-empty trimmed string", () => {
    expect(() => ApiKey.parse("a".repeat(64))).not.toThrow();
  });

  test("should reject a string shorter than 64 characters", () => {
    expect(() => ApiKey.parse("a".repeat(63))).toThrow();
  });

  test("should reject a string longer than 64 characters", () => {
    expect(() => ApiKey.parse("a".repeat(65))).toThrow();
  });

  test("should reject a string with leading/trailing whitespace", () => {
    expect(() => ApiKey.parse(` ${"a".repeat(63)}`)).toThrow();
  });

  test("should trim input before validation", () => {
    expect(() => ApiKey.parse(` ${"a".repeat(64)} `)).not.toThrow();
  });

  test("should reject non-string values", () => {
    expect(() => ApiKey.parse(1234567890)).toThrow();
  });
});
