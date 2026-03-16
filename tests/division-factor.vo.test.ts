import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DivisionFactor } from "../src/division-factor.vo";

describe("DivisionFactor", () => {
  test("happy path", () => {
    expect(v.safeParse(DivisionFactor, 10).success).toEqual(true);
    expect(v.safeParse(DivisionFactor, 1.5).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(DivisionFactor, null)).toThrow("division.factor.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(DivisionFactor, "123")).toThrow("division.factor.type");
  });

  test("rejects zero", () => {
    expect(() => v.parse(DivisionFactor, 0)).toThrow("division.factor.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(DivisionFactor, -1)).toThrow("division.factor.invalid");
  });
});
