import { describe, expect, test } from "bun:test";
import {
  MoneyMultiplicationFactor,
  MoneyMultiplicationFactorError,
} from "../src/money-multiplication-factor.vo";

describe("MoneyDivisionFactor", () => {
  test("happy path", () => {
    expect(MoneyMultiplicationFactor.safeParse(10).success).toEqual(true);
    expect(MoneyMultiplicationFactor.safeParse(1.5).success).toEqual(true);
    expect(MoneyMultiplicationFactor.safeParse(0).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MoneyMultiplicationFactor.parse(null)).toThrow(MoneyMultiplicationFactorError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => MoneyMultiplicationFactor.parse("123")).toThrow(MoneyMultiplicationFactorError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => MoneyMultiplicationFactor.parse(-1)).toThrow(MoneyMultiplicationFactorError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => MoneyMultiplicationFactor.parse(Number.POSITIVE_INFINITY)).toThrow(
      MoneyMultiplicationFactorError.Type,
    );
  });
});
