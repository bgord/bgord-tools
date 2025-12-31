import { describe, expect, test } from "bun:test";
import { HeightMillimeters } from "../src/height-milimiters.vo";

describe("HeightMillimeters", () => {
  test("happy path", () => {
    expect(HeightMillimeters.safeParse(1).success).toEqual(true);
    expect(HeightMillimeters.safeParse(50).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => HeightMillimeters.parse(null)).toThrow("height.millimeters.type");
  });

  test("rejects non-number - string", () => {
    expect(() => HeightMillimeters.parse("123")).toThrow("height.millimeters.type");
  });

  test("rejects fractions", () => {
    expect(() => HeightMillimeters.parse(1.5)).toThrow("height.millimeters.type");
  });

  test("rejects negative numbers", () => {
    expect(() => HeightMillimeters.parse(-1)).toThrow("height.millimeters.invalid");
  });
});
