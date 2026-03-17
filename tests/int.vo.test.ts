import { describe, expect, test } from "bun:test";
import { Int } from "../src/int.vo";

describe("Int VO", () => {
  test("positive", () => {
    expect(() => Int.positive(1)).not.toThrow();
    expect(() => Int.positive(0)).toThrow("integer.positive.invalid");
  });

  test("nonNegative", () => {
    expect(() => Int.nonNegative(0)).not.toThrow();
    expect(() => Int.nonNegative(-1)).toThrow("integer.non.negative.invalid");
  });

  test("of", () => {
    expect(() => Int.of(1)).not.toThrow();
    expect(() => Int.of(1.5)).toThrow("integer.type");
  });
});
