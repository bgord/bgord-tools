import { describe, expect, test } from "bun:test";
import { Sum } from "../src/sum.service";

describe("Sum", () => {
  test("works for one value", () => {
    expect(Sum.of([1])).toEqual(1);
  });

  test("works for two values", () => {
    expect(Sum.of([1, 2])).toEqual(3);
  });

  test("works for three values", () => {
    expect(Sum.of([1, 3, 6])).toEqual(10);
  });

  test("works for all zeros", () => {
    expect(Sum.of([0, 0, 0])).toEqual(0);
  });

  test("works for empty array", () => {
    expect(Sum.of([])).toEqual(0);
  });

  test("works with negative numbers", () => {
    expect(Sum.of([5, -2, -3])).toEqual(0);
  });

  test("floating point: close to expected", () => {
    expect(Sum.of([0.1, 0.2])).toBeCloseTo(0.3, 12);
  });

  test("precise summation improves numerical stability", () => {
    const values = [1e12, ...Array.from({ length: 1000 }, () => 1e-3)];
    const naive = Sum.of(values);
    const precise = Sum.precise(values);

    const expected = 1e12 + 1; // 1000 * 1e-3

    // Precise should be extremely close
    expect(precise).toBeCloseTo(expected, 9);

    // Naive is close-ish but looser tolerance
    expect(naive).toBeCloseTo(expected, 1);

    // And precise should be at least as accurate as naive
    expect(Math.abs(precise - expected)).toBeLessThanOrEqual(Math.abs(naive - expected));
  });
});
