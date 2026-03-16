import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DistanceValue } from "../src/distance-value.vo";

describe("DistanceValue", () => {
  test("happy path", () => {
    expect(v.safeParse(DistanceValue, 0).success).toEqual(true);
    expect(v.safeParse(DistanceValue, 1_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(DistanceValue, null)).toThrow("distance.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(DistanceValue, "123")).toThrow("distance.value.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(DistanceValue, 1.5)).toThrow("distance.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(DistanceValue, -1)).toThrow("distance.value.invalid");
  });
});
