import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { IntegerNonNegative } from "../src/integer-non-negative.vo";

describe("IntegerNonNegative VO", () => {
  test("happy path", () => {
    expect(v.safeParse(IntegerNonNegative, 0).success).toEqual(true);
    expect(v.safeParse(IntegerNonNegative, 1).success).toEqual(true);
    expect(v.safeParse(IntegerNonNegative, 130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(IntegerNonNegative, null)).toThrow("integer.non.negative.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(IntegerNonNegative, "100")).toThrow("integer.non.negative.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(IntegerNonNegative, 100.5)).toThrow("integer.non.negative.type");
  });

  test("rejects negative", () => {
    expect(() => v.parse(IntegerNonNegative, -1)).toThrow("integer.non.negative.invalid");
  });

  test("rejects unsafe integers", () => {
    expect(() => v.parse(IntegerNonNegative, Number.MAX_SAFE_INTEGER + 2)).toThrow(
      "integer.non.negative.type",
    );
    expect(() => v.parse(IntegerNonNegative, 1e308)).toThrow("integer.non.negative.type");
  });
});
