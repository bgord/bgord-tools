import { describe, expect, test } from "bun:test";
import { Sum } from "../src/sum.service";

describe("Sum", () => {
  describe("naive", () => {
    expect(Sum.of([1])).toEqual(1);
    expect(Sum.of([1, 2])).toEqual(3);
    expect(Sum.of([1, 3, 6])).toEqual(10);
    expect(Sum.of([0, 0, 0])).toEqual(0);
    expect(Sum.of([])).toEqual(0);
    expect(Sum.of([5, -2, -3])).toEqual(0);
    expect(Sum.of([0.1, 0.2])).toBeCloseTo(0.3, 12);
  });

  test("precise", () => {
    const values = [1e12, ...Array.from({ length: 1000 }, () => 1e-3)];
    const naive = Sum.of(values);
    const expected = 1e12 + 1;

    const precise = Sum.precise(values);

    expect(precise).toBeCloseTo(expected, 9);
    expect(naive).toBeCloseTo(expected, 1);
    expect(Math.abs(precise - expected)).toBeLessThanOrEqual(Math.abs(naive - expected));
  });
});
