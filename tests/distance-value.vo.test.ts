import { describe, expect, test } from "bun:test";
import { DistanceValue } from "../src/distance-value.vo";

describe("DistanceValue", () => {
  test("happy path", () => {
    expect(DistanceValue.safeParse(0).success).toEqual(true);
    expect(DistanceValue.safeParse(1_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => DistanceValue.parse(null)).toThrow("distance.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => DistanceValue.parse("123")).toThrow("distance.value.type");
  });

  test("rejects fractions", () => {
    expect(() => DistanceValue.parse(1.5)).toThrow("distance.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => DistanceValue.parse(-1)).toThrow("distance.value.invalid");
  });
});
