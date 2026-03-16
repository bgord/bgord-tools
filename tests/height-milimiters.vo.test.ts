import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { HeightMillimeters } from "../src/height-milimiters.vo";

describe("HeightMillimeters", () => {
  test("happy path", () => {
    expect(v.safeParse(HeightMillimeters, 1).success).toEqual(true);
    expect(v.safeParse(HeightMillimeters, 50).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(HeightMillimeters, null)).toThrow("height.millimeters.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(HeightMillimeters, "123")).toThrow("height.millimeters.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(HeightMillimeters, 1.5)).toThrow("height.millimeters.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(HeightMillimeters, -1)).toThrow("height.millimeters.invalid");
  });
});
