import { describe, expect, test } from "bun:test";
import { ApiKey } from "../src/api-key.vo";

const validLower = "a".repeat(64);
const validUpper = "A".repeat(64);

describe("ApiKey (smoke tests)", () => {
  test("accepts a 64-char hex string", () => {
    expect(() => ApiKey.parse(validLower)).not.toThrow();
    expect(() => ApiKey.parse(validUpper)).not.toThrow();
  });

  test("accepts valid key with surrounding whitespace (trimmed)", () => {
    expect(() => ApiKey.parse(`  ${validLower}  `)).not.toThrow();
  });

  test("rejects wrong length", () => {
    expect(() => ApiKey.parse("a".repeat(63))).toThrow();
    expect(() => ApiKey.parse("a".repeat(65))).toThrow();
  });

  test("rejects non-string input", () => {
    expect(() => ApiKey.parse(1234)).toThrow();
  });
});
