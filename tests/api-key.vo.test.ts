import { describe, expect, test } from "bun:test";

import { ApiKey } from "../src/api-key.vo";

describe("ApiKey", () => {
  test("should accept a 64-character non-empty trimmed string", () => {
    const validKey = "a".repeat(64);
    expect(() => ApiKey.parse(validKey)).not.toThrow();
  });

  test("should reject a string shorter than 64 characters", () => {
    const shortKey = "a".repeat(63);
    expect(() => ApiKey.parse(shortKey)).toThrow();
  });

  test("should reject a string longer than 64 characters", () => {
    const longKey = "a".repeat(65);
    expect(() => ApiKey.parse(longKey)).toThrow();
  });

  test("should reject a string with leading/trailing whitespace", () => {
    const keyWithSpaces = ` ${"a".repeat(63)}`;
    expect(() => ApiKey.parse(keyWithSpaces)).toThrow();
  });

  test("should trim input before validation", () => {
    const trimmedKey = "a".repeat(64);
    const withWhitespace = ` ${trimmedKey} `;
    // Zod's `.trim()` trims before `.length()` is checked
    expect(() => ApiKey.parse(withWhitespace)).not.toThrow();
  });

  test("should reject non-string values", () => {
    const nonString = 1234567890;
    expect(() => ApiKey.parse(nonString)).toThrow();
  });
});
