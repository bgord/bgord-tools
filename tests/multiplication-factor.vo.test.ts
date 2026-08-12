import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";

describe("MultiplicationFactor", () => {
  test("happy path", () => {
    expect(v.safeParse(MultiplicationFactor, 10).success).toEqual(true);
    expect(v.safeParse(MultiplicationFactor, 1.5).success).toEqual(true);
    expect(v.safeParse(MultiplicationFactor, 0).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(MultiplicationFactor, null)).toThrow("multiplication.factor.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(MultiplicationFactor, "123")).toThrow("multiplication.factor.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(MultiplicationFactor, -1)).toThrow("multiplication.factor.invalid");
  });

  test("rejects Infinity", () => {
    expect(() => v.parse(MultiplicationFactor, Number.POSITIVE_INFINITY)).toThrow(
      "multiplication.factor.invalid",
    );
    expect(() => v.parse(MultiplicationFactor, Number.NEGATIVE_INFINITY)).toThrow(
      "multiplication.factor.invalid",
    );
  });
});
