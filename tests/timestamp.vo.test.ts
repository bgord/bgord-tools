import { describe, expect, test } from "bun:test";
import { Timestamp, TimestampError } from "../src/timestamp.vo";

describe("Timestamp", () => {
  test("accepts 0", () => {
    expect(Timestamp.safeParse(0).success).toEqual(true);
  });

  test("accepts current timestamp", () => {
    expect(Timestamp.safeParse(Date.now()).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => Timestamp.parse(null)).toThrow(TimestampError.Invalid);
  });

  test("rejects non-number - string", () => {
    expect(() => Timestamp.parse("123")).toThrow(TimestampError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => Timestamp.parse(-1)).toThrow(TimestampError.Invalid);
  });

  test("rejects fractions", () => {
    expect(() => Timestamp.parse(1.5)).toThrow(TimestampError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => Timestamp.parse(Number.POSITIVE_INFINITY)).toThrow(TimestampError.Invalid);
  });
});
