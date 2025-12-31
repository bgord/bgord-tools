import { describe, expect, test } from "bun:test";
import { TimestampValue } from "../src/timestamp-value.vo";

describe("TimestampValue", () => {
  test("happy path", () => {
    expect(TimestampValue.safeParse(0).success).toEqual(true);
    expect(TimestampValue.safeParse(Date.now()).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => TimestampValue.parse(null)).toThrow("timestamp.invalid");
  });

  test("rejects non-number - string", () => {
    expect(() => TimestampValue.parse("123")).toThrow("timestamp.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => TimestampValue.parse(-1)).toThrow("timestamp.invalid");
  });

  test("rejects fractions", () => {
    expect(() => TimestampValue.parse(1.5)).toThrow("timestamp.invalid");
  });
});
