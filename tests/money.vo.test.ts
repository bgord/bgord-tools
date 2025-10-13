import { describe, expect, test } from "bun:test";
import { DivisionFactor } from "../src/division-factor.vo";
import { Money, MoneyError } from "../src/money.vo";
import { MoneyAmount, MoneyAmountError } from "../src/money-amount.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";
import { RoundDown, RoundUp } from "../src/rounding.adapter";

const roundUp = new RoundUp();
const roundDown = new RoundDown();

describe("Money", () => {
  test("creates an empty instance", () => {
    expect(new Money().getAmount()).toEqual(MoneyAmount.parse(0));
  });

  test("creates an instance with a value", () => {
    expect(new Money(100).getAmount()).toEqual(MoneyAmount.parse(100));
  });

  test("throws an error when passing a float value", () => {
    expect(() => new Money(100.5)).toThrow(MoneyAmountError.Type);
  });

  test("add", () => {
    expect(new Money(100).add(new Money()).getAmount()).toEqual(MoneyAmount.parse(100));
    expect(new Money(15).add(new Money(10)).getAmount()).toEqual(MoneyAmount.parse(25));
  });

  test("multiply - integer factor", () => {
    expect(new Money(100).multiply(MultiplicationFactor.parse(5)).getAmount()).toEqual(
      MoneyAmount.parse(500),
    );
  });

  test("multiply - float factor", () => {
    expect(new Money(100).multiply(MultiplicationFactor.parse(1.5)).getAmount()).toEqual(
      MoneyAmount.parse(150),
    );
  });

  test("subtract - result more than zero", () => {
    expect(new Money(100).subtract(new Money(20)).getAmount()).toEqual(MoneyAmount.parse(80));
  });

  test("subtract - result zero", () => {
    expect(new Money(100).subtract(new Money(100)).isZero()).toEqual(true);
  });

  test("subtract - result less than zero", () => {
    expect(() => new Money(100).subtract(new Money(120)).getAmount()).toThrow(
      MoneyError.SubtractResultLessThanZero,
    );
  });

  test("multiply - float factor - default round-to-nearest", () => {
    expect(new Money(99).multiply(MultiplicationFactor.parse(1.5)).getAmount()).toEqual(
      MoneyAmount.parse(149),
    );
  });

  test("multiply - float factor - round-up", () => {
    expect(new Money(99, roundUp).multiply(MultiplicationFactor.parse(1.5)).getAmount()).toEqual(
      MoneyAmount.parse(149),
    );
  });

  test("multiply - float factor - round-down", () => {
    expect(new Money(99, roundDown).multiply(MultiplicationFactor.parse(1.5)).getAmount()).toEqual(
      MoneyAmount.parse(148),
    );
  });

  test("divide - float factor - default round-to-nearest", () => {
    expect(new Money(98).divide(DivisionFactor.parse(2.5)).getAmount()).toEqual(MoneyAmount.parse(39));
  });

  test("divide - float factor - round-up", () => {
    expect(new Money(98, roundUp).divide(DivisionFactor.parse(2.5)).getAmount()).toEqual(
      MoneyAmount.parse(40),
    );
  });

  test("divide - float factor - round-down", () => {
    expect(new Money(98, roundDown).divide(DivisionFactor.parse(2.5)).getAmount()).toEqual(
      MoneyAmount.parse(39),
    );
  });

  test("equals", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("isGreaterThan", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.isGreaterThan(oneHundred)).toEqual(false);
    expect(twoHundred.isGreaterThan(oneHundred)).toEqual(true);
  });

  test("isLessThan", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.isLessThan(oneHundred)).toEqual(false);
    expect(oneHundred.isLessThan(twoHundred)).toEqual(true);
  });

  test("isZero", () => {
    expect(new Money().isZero()).toEqual(true);
  });

  test("format", () => {
    const cases = [
      [9999, "99.99"],
      [90, "0.90"],
      [99, "0.99"],
      [10209, "102.09"],
      [0, "0.00"],
      [1, "0.01"],
      [100, "1.00"],
      [1000, "10.00"],
      [123456789, "1234567.89"],
    ] as const;

    for (const [value, result] of cases) {
      expect(new Money(value).format()).toEqual(result);
    }
  });
});
