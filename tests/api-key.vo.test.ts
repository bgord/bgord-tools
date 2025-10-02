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

  test("rejects non-hex content at length 64", () => {
    // 'G' is not a hex character
    const nonHex = "A".repeat(63) + "G";
    expect(() => ApiKey.parse(nonHex)).toThrow();

    // internal whitespace also fails the hex regex
    const midSpace = "a".repeat(32) + " " + "a".repeat(31);
    expect(() => ApiKey.parse(midSpace)).toThrow();
  });

  test("rejects non-string input", () => {
    expect(() => ApiKey.parse(1234)).toThrow();
  });
});
