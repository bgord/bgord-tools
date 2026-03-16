import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { MoneyAmount } from "../src/money-amount.vo";

describe("MoneyAmount", () => {
  test("happy path", () => {
    expect(v.safeParse(MoneyAmount, 0).success).toEqual(true);
    expect(v.safeParse(MoneyAmount, 1_000).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(MoneyAmount, null)).toThrow("money.amount.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(MoneyAmount, "123")).toThrow("money.amount.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(MoneyAmount, 1.5)).toThrow("money.amount.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(MoneyAmount, -1)).toThrow("money.amount.invalid");
  });
});
