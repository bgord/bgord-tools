import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { WeightGrams } from "../src/weight-grams.vo";

describe("WeightGrams", () => {
  test("happy path", () => {
    expect(v.safeParse(WeightGrams, 0).success).toEqual(true);
    expect(v.safeParse(WeightGrams, 130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(WeightGrams, null)).toThrow("weight.grams.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(WeightGrams, "123")).toThrow("weight.grams.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(WeightGrams, -1)).toThrow("weight.grams.invalid");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(WeightGrams, 1.5)).toThrow("weight.grams.type");
  });
});
