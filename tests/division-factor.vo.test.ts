import { describe, expect, test } from "bun:test";
import { DivisionFactor } from "../src/division-factor.vo";

describe("DivisionFactor", () => {
  test("happy path", () => {
    expect(DivisionFactor.safeParse(10).success).toEqual(true);
    expect(DivisionFactor.safeParse(1.5).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => DivisionFactor.parse(null)).toThrow("division.factor.type");
  });

  test("rejects non-number - string", () => {
    expect(() => DivisionFactor.parse("123")).toThrow("division.factor.type");
  });

  test("rejects zero", () => {
    expect(() => DivisionFactor.parse(0)).toThrow("division.factor.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => DivisionFactor.parse(-1)).toThrow("division.factor.invalid");
  });
});
