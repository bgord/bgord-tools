import { describe, expect, test } from "bun:test";
import { HeightMillimeters, HeightMillimetersError } from "../src/height-milimiters.vo";

describe("HeightMillimeters", () => {
  test("happy path", () => {
    expect(HeightMillimeters.safeParse(1).success).toEqual(true);
    expect(HeightMillimeters.safeParse(50).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => HeightMillimeters.parse(null)).toThrow(HeightMillimetersError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => HeightMillimeters.parse("123")).toThrow(HeightMillimetersError.Type);
  });

  test("rejects fractions", () => {
    expect(() => HeightMillimeters.parse(1.5)).toThrow(HeightMillimetersError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => HeightMillimeters.parse(-1)).toThrow(HeightMillimetersError.Invalid);
  });
});
