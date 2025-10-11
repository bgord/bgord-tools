import { describe, expect, test } from "bun:test";
import { MoneyAmount, MoneyAmountError } from "../src/money-amount.vo";

describe("MoneyAmount", () => {
  test("accepts 0", () => {
    expect(MoneyAmount.safeParse(0).success).toEqual(true);
  });

  test("accepts 1_000", () => {
    expect(MoneyAmount.safeParse(1_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MoneyAmount.parse(null)).toThrow(MoneyAmountError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => MoneyAmount.parse("123")).toThrow(MoneyAmountError.Type);
  });

  test("rejects fractions", () => {
    expect(() => MoneyAmount.parse(1.5)).toThrow(MoneyAmountError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => MoneyAmount.parse(-1)).toThrow(MoneyAmountError.Invalid);
  });
});
