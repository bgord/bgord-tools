import { describe, expect, test } from "bun:test";
import { DivisionFactor, DivisionFactorError } from "../src/division-factor.vo";

describe("DivisionFactor", () => {
  test("happy path", () => {
    expect(DivisionFactor.safeParse(10).success).toEqual(true);
    expect(DivisionFactor.safeParse(1.5).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => DivisionFactor.parse(null)).toThrow(DivisionFactorError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => DivisionFactor.parse("123")).toThrow(DivisionFactorError.Type);
  });

  test("rejects zero", () => {
    expect(() => DivisionFactor.parse(0)).toThrow(DivisionFactorError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => DivisionFactor.parse(-1)).toThrow(DivisionFactorError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => DivisionFactor.parse(Number.POSITIVE_INFINITY)).toThrow(DivisionFactorError.Type);
  });
});
