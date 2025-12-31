import { describe, expect, test } from "bun:test";
import { IntegerNonNegative } from "../src/integer-non-negative.vo";

describe("IntegerNonNegative VO", () => {
  test("happy path", () => {
    expect(IntegerNonNegative.safeParse(0).success).toEqual(true);
    expect(IntegerNonNegative.safeParse(1).success).toEqual(true);
    expect(IntegerNonNegative.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => IntegerNonNegative.parse(null)).toThrow("integer.non.negative.type");
  });

  test("rejects non-number - string", () => {
    expect(() => IntegerNonNegative.parse("100")).toThrow("integer.non.negative.type");
  });

  test("rejects fraction", () => {
    expect(() => IntegerNonNegative.parse(100.5)).toThrow("integer.non.negative.type");
  });
});
