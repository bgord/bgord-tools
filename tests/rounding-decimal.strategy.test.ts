import { describe, expect, test } from "bun:test";
import { RoundingDecimalStrategy } from "../src/rounding-decimal.strategy";

describe("RoundingDecimalStrategy", () => {
  test("happy path", () => {
    const rounding = new RoundingDecimalStrategy(2);

    expect(rounding.round(5.678)).toEqual(5.68);
    expect(rounding.round(3.245)).toEqual(3.25);
  });

  test("invalid", () => {
    // @ts-expect-error
    expect(() => new RoundingDecimalStrategy("")).toThrow("rounding.decimal.type");
    expect(() => new RoundingDecimalStrategy(-1)).toThrow("rounding.decimal.invalid");
    expect(() => new RoundingDecimalStrategy(1.5)).toThrow("rounding.decimal.type");
    expect(() => new RoundingDecimalStrategy(101)).toThrow("rounding.decimal.invalid");
  });

  test("zero decimals rounds to whole numbers", () => {
    const rounding = new RoundingDecimalStrategy(0);

    expect(rounding.round(5.678)).toEqual(6);
    expect(rounding.round(-1.5)).toEqual(-2);
  });
});
