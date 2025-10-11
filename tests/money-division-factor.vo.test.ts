import { describe, expect, test } from "bun:test";
import { MoneyDivisionFactor, MoneyDivisionFactorError } from "../src/money-division-factor.vo";

describe("MoneyDivisionFactor", () => {
  test("happy path", () => {
    expect(MoneyDivisionFactor.safeParse(10).success).toEqual(true);
    expect(MoneyDivisionFactor.safeParse(1.5).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MoneyDivisionFactor.parse(null)).toThrow(MoneyDivisionFactorError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => MoneyDivisionFactor.parse("123")).toThrow(MoneyDivisionFactorError.Type);
  });

  test("rejects zero", () => {
    expect(() => MoneyDivisionFactor.parse(0)).toThrow(MoneyDivisionFactorError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => MoneyDivisionFactor.parse(-1)).toThrow(MoneyDivisionFactorError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => MoneyDivisionFactor.parse(Number.POSITIVE_INFINITY)).toThrow(MoneyDivisionFactorError.Type);
  });
});
