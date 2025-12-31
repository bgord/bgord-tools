import { describe, expect, test } from "bun:test";
import { IntegerPositive } from "../src/integer-positive.vo";

describe("IntegerPositive VO", () => {
  test("happy path", () => {
    expect(IntegerPositive.safeParse(1).success).toEqual(true);
    expect(IntegerPositive.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => IntegerPositive.parse(null)).toThrow("integer.positive.type");
  });

  test("rejects non-number - string", () => {
    expect(() => IntegerPositive.parse("100")).toThrow("integer.positive.type");
  });

  test("rejects fraction", () => {
    expect(() => IntegerPositive.parse(100.5)).toThrow("integer.positive.type");
  });

  test("rejects 0", () => {
    expect(() => IntegerPositive.parse(0)).toThrow("integer.positive.invalid");
  });
});
