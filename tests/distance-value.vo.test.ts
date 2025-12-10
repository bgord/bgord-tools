import { describe, expect, test } from "bun:test";
import { DistanceValue, DistanceValueError } from "../src/distance-value.vo";

describe("DistanceValue", () => {
  test("happy path", () => {
    expect(DistanceValue.safeParse(0).success).toEqual(true);
    expect(DistanceValue.safeParse(1_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => DistanceValue.parse(null)).toThrow(DistanceValueError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => DistanceValue.parse("123")).toThrow(DistanceValueError.Type);
  });

  test("rejects fractions", () => {
    expect(() => DistanceValue.parse(1.5)).toThrow(DistanceValueError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => DistanceValue.parse(-1)).toThrow(DistanceValueError.Invalid);
  });
});
