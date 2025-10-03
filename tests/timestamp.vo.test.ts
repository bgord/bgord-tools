import { describe, expect, test } from "bun:test";
import { Timestamp, TimestampError } from "../src/timestamp.vo";

describe("Timestamp", () => {
  test("accepts valid timestamps", () => {
    for (const value of [0, Date.now(), Number.MAX_SAFE_INTEGER]) {
      expect(Timestamp.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects invalid timestamps with VO error", () => {
    const invalid = [
      -1,
      123.45,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.MAX_SAFE_INTEGER + 1,
      "123",
    ];

    for (const value of invalid) {
      expect(() => Timestamp.parse(value)).toThrow(TimestampError.error);
    }
  });
});
