import { describe, expect, test } from "bun:test";
import {
  RoundDown,
  RoundingDecimalError,
  RoundToDecimal,
  RoundToNearest,
  RoundUp,
} from "../src/rounding.adapter";

describe("Rounding", () => {
  test("RoundToNearest", () => {
    const rounding = new RoundToNearest();

    expect(rounding.round(5.6)).toEqual(6);
    expect(rounding.round(3.2)).toEqual(3);
  });

  test("RoundUp", () => {
    const rounding = new RoundUp();

    expect(rounding.round(5.6)).toEqual(6);
    expect(rounding.round(3.2)).toEqual(4);
  });

  test("RoundDown", () => {
    const rounding = new RoundDown();

    expect(rounding.round(5.6)).toEqual(5);
    expect(rounding.round(3.2)).toEqual(3);
  });

  test("RoundToDecimal", () => {
    const rounding = new RoundToDecimal(2);

    expect(rounding.round(5.678)).toEqual(5.68);
    expect(rounding.round(3.245)).toEqual(3.25);
  });

  test("RoundToDecimal", () => {
    expect(() => new RoundToDecimal(-1)).toThrow(RoundingDecimalError.Invalid);
    expect(() => new RoundToDecimal(0)).toThrow(RoundingDecimalError.Invalid);
    expect(() => new RoundToDecimal(1.5)).toThrow(RoundingDecimalError.Invalid);
    expect(() => new RoundToDecimal(101)).toThrow(RoundingDecimalError.Invalid);
  });
});
