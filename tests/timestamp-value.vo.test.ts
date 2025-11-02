import { describe, expect, test } from "bun:test";
import { TimestampError, TimestampValue } from "../src/timestamp-value.vo";

describe("TimestampValue", () => {
  test("happy path", () => {
    expect(TimestampValue.safeParse(0).success).toEqual(true);
    expect(TimestampValue.safeParse(Date.now()).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => TimestampValue.parse(null)).toThrow(TimestampError.Invalid);
  });

  test("rejects non-number - string", () => {
    expect(() => TimestampValue.parse("123")).toThrow(TimestampError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => TimestampValue.parse(-1)).toThrow(TimestampError.Invalid);
  });

  test("rejects fractions", () => {
    expect(() => TimestampValue.parse(1.5)).toThrow(TimestampError.Invalid);
  });
});
