import { describe, expect, test } from "bun:test";
import { WeightGrams } from "../src/weight-grams.vo";

describe("WeightGrams", () => {
  test("happy path", () => {
    expect(WeightGrams.safeParse(0).success).toEqual(true);
    expect(WeightGrams.safeParse(150).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => WeightGrams.parse(null)).toThrow("weight.grams.type");
  });

  test("rejects non-number - string", () => {
    expect(() => WeightGrams.parse("123")).toThrow("weight.grams.type");
  });

  test("rejects negative numbers", () => {
    expect(() => WeightGrams.parse(-1)).toThrow("weight.grams.invalid");
  });

  test("rejects fractions", () => {
    expect(() => WeightGrams.parse(1.5)).toThrow("weight.grams.type");
  });
});
