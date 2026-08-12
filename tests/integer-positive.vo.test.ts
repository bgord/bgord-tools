import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { IntegerPositive } from "../src/integer-positive.vo";

describe("IntegerPositive VO", () => {
  test("happy path", () => {
    expect(v.safeParse(IntegerPositive, 1).success).toEqual(true);
    expect(v.safeParse(IntegerPositive, 130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(IntegerPositive, null)).toThrow("integer.positive.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(IntegerPositive, "100")).toThrow("integer.positive.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(IntegerPositive, 100.5)).toThrow("integer.positive.type");
  });

  test("rejects 0", () => {
    expect(() => v.parse(IntegerPositive, 0)).toThrow("integer.positive.invalid");
  });

  test("rejects unsafe integers", () => {
    expect(() => v.parse(IntegerPositive, Number.MAX_SAFE_INTEGER + 2)).toThrow("integer.positive.type");
    expect(() => v.parse(IntegerPositive, 1e308)).toThrow("integer.positive.type");
  });
});
