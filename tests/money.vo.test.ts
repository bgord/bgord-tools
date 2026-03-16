import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DivisionFactor } from "../src/division-factor.vo";
import { Money } from "../src/money.vo";
import { MoneyAmount } from "../src/money-amount.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";
import { RoundingDownStrategy } from "../src/rounding-down.strategy";
import { RoundingUpStrategy } from "../src/rounding-up.strategy";

const roundUp = new RoundingUpStrategy();
const roundDown = new RoundingDownStrategy();

const divisor = v.parse(DivisionFactor, 2.5);
const multiplier = v.parse(MultiplicationFactor, 1.5);

describe("Money", () => {
  test("fromAmount", () => {
    expect(Money.fromAmount(0).getAmount()).toEqual(MoneyAmount.parse(0));
    expect(Money.fromAmount(100).getAmount()).toEqual(MoneyAmount.parse(100));
  });

  test("fromAmount - invalid input", () => {
    expect(() => Money.fromAmount(100.5)).toThrow("money.amount.type");
  });

  test("fromAmountSafe", () => {
    expect(Money.fromAmountSafe(MoneyAmount.parse(0)).getAmount()).toEqual(MoneyAmount.parse(0));
    expect(Money.fromAmountSafe(MoneyAmount.parse(100)).getAmount()).toEqual(MoneyAmount.parse(100));
  });

  test("add", () => {
    expect(Money.fromAmount(100).add(Money.fromAmount(0)).getAmount()).toEqual(MoneyAmount.parse(100));
    expect(Money.fromAmount(15).add(Money.fromAmount(10)).getAmount()).toEqual(MoneyAmount.parse(25));
  });

  test("multiply - integer factor", () => {
    expect(Money.fromAmount(100).multiply(v.parse(MultiplicationFactor, 5)).getAmount()).toEqual(
      MoneyAmount.parse(500),
    );
  });

  test("multiply - float factor - default round-to-nearest", () => {
    expect(Money.fromAmount(99).multiply(multiplier).getAmount()).toEqual(MoneyAmount.parse(149));
  });

  test("multiply - float factor - round-up", () => {
    expect(Money.fromAmount(99).multiply(multiplier, roundUp).getAmount()).toEqual(MoneyAmount.parse(149));
  });

  test("multiply - float factor - round-down", () => {
    expect(Money.fromAmount(99).multiply(multiplier, roundDown).getAmount()).toEqual(MoneyAmount.parse(148));
  });

  test("subtract - result more than zero", () => {
    expect(Money.fromAmount(100).subtract(Money.fromAmount(20)).getAmount()).toEqual(MoneyAmount.parse(80));
  });

  test("subtract - result zero", () => {
    expect(Money.fromAmount(100).subtract(Money.fromAmount(100)).isZero()).toEqual(true);
  });

  test("subtract - result less than zero", () => {
    expect(() => Money.fromAmount(100).subtract(Money.fromAmount(120)).getAmount()).toThrow(
      "money.subtract.result.less.than.zero",
    );
  });

  test("divide - float factor - default round-to-nearest", () => {
    expect(Money.fromAmount(98).divide(divisor).getAmount()).toEqual(MoneyAmount.parse(39));
  });

  test("divide - float factor - round-up", () => {
    expect(Money.fromAmount(98).divide(divisor, roundUp).getAmount()).toEqual(MoneyAmount.parse(40));
  });

  test("divide - float factor - round-down", () => {
    expect(Money.fromAmount(98).divide(divisor, roundDown).getAmount()).toEqual(MoneyAmount.parse(39));
  });

  test("equals", () => {
    const oneHundred = Money.fromAmount(100);
    const twoHundred = Money.fromAmount(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("isGreaterThan", () => {
    const oneHundred = Money.fromAmount(100);
    const twoHundred = Money.fromAmount(200);

    expect(oneHundred.isGreaterThan(oneHundred)).toEqual(false);
    expect(twoHundred.isGreaterThan(oneHundred)).toEqual(true);
  });

  test("isLessThan", () => {
    const oneHundred = Money.fromAmount(100);
    const twoHundred = Money.fromAmount(200);

    expect(oneHundred.isLessThan(oneHundred)).toEqual(false);
    expect(oneHundred.isLessThan(twoHundred)).toEqual(true);
  });

  test("isZero", () => {
    expect(Money.fromAmount(0).isZero()).toEqual(true);
    expect(Money.fromAmount(1).isZero()).toEqual(false);
  });

  test("zero", () => {
    expect(Money.zero()).toEqual(Money.fromAmountSafe(MoneyAmount.parse(0)));
  });

  test("toString", () => {
    expect(Money.fromAmount(5).toString()).toEqual("5");
  });

  test("toJSON", () => {
    expect(Money.fromAmount(5).toJSON()).toEqual(5);
  });
});
