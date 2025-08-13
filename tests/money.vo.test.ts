import { describe, expect, test } from "bun:test";
import { Money, MoneyAmount, MoneyDivisionFactor, MoneyMultiplicationFactor } from "../src/money.vo";
import { RoundDown, RoundUp } from "../src/rounding.service";

const roundUp = new RoundUp();
const roundDown = new RoundDown();

describe("Money", () => {
  test("creates an empty instance", () => {
    const money = new Money();
    expect(money.getAmount()).toEqual(MoneyAmount.parse(0));
  });

  test("creates an instance with a value", () => {
    const money = new Money(100);
    expect(money.getAmount()).toEqual(MoneyAmount.parse(100));
  });

  test("throws an error when passing a float value", () => {
    expect(() => new Money(100.5)).toThrow();
  });

  test("add()", () => {
    const money1 = new Money(100);
    const money2 = new Money();

    expect(money1.add(money2).getAmount()).toEqual(MoneyAmount.parse(100));
  });

  test("multiply() - integer", () => {
    const money = new Money(100);
    const factor = MoneyMultiplicationFactor.parse(5);

    expect(money.multiply(factor).getAmount()).toEqual(MoneyAmount.parse(500));
  });

  test("multiply() - float", () => {
    const money = new Money(100);
    const factor = MoneyMultiplicationFactor.parse(1.5);

    expect(money.multiply(factor).getAmount()).toEqual(MoneyAmount.parse(150));
  });

  test("subtract() - result more than zero", () => {
    const money1 = new Money(100);
    const money2 = new Money(20);

    expect(money1.subtract(money2).getAmount()).toEqual(MoneyAmount.parse(80));
  });

  test("subtract() - result zero", () => {
    const money1 = new Money(100);
    const money2 = new Money(100);

    expect(money1.subtract(money2).getAmount()).toEqual(MoneyAmount.parse(0));
  });

  test("subtract() - result less than zero", () => {
    const money1 = new Money(100);
    const money2 = new Money(120);

    expect(() => money1.subtract(money2).getAmount()).toThrow("Less than zero");
  });

  test("multiply() - float - with default round-to-nearest rounding", () => {
    const money = new Money(99);
    const factor = MoneyMultiplicationFactor.parse(1.5);

    expect(money.multiply(factor).getAmount()).toEqual(MoneyAmount.parse(149));
  });

  test("multiply() - float - with round-up rounding", () => {
    const money = new Money(99, roundUp);
    const factor = MoneyMultiplicationFactor.parse(1.5);

    expect(money.multiply(factor).getAmount()).toEqual(MoneyAmount.parse(149));
  });

  test("multiply() - float - with round-down rounding", () => {
    const money = new Money(99, roundDown);
    const factor = MoneyMultiplicationFactor.parse(1.5);

    expect(money.multiply(factor).getAmount()).toEqual(MoneyAmount.parse(148));
  });

  test("divide() - int", () => {
    const money = new Money(99);
    const factor = MoneyDivisionFactor.parse(1.5);

    expect(money.divide(factor).getAmount()).toEqual(MoneyAmount.parse(66));
  });

  test("divide() - float - with default round-to-nearest rounding", () => {
    const money = new Money(99);
    const factor = MoneyDivisionFactor.parse(2);

    expect(money.divide(factor).getAmount()).toEqual(MoneyAmount.parse(50));
  });

  test("divide() - float - with round-up rounding", () => {
    const money = new Money(99, roundUp);
    const factor = MoneyDivisionFactor.parse(2);

    expect(money.divide(factor).getAmount()).toEqual(MoneyAmount.parse(50));
  });

  test("divide() - float - with round-down rounding", () => {
    const money = new Money(99, roundDown);
    const factor = MoneyDivisionFactor.parse(2);

    expect(money.divide(factor).getAmount()).toEqual(MoneyAmount.parse(49));
  });

  test("equals()", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("equals()", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("isGreaterThan()", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.isGreaterThan(oneHundred)).toEqual(false);
    expect(twoHundred.isGreaterThan(oneHundred)).toEqual(true);
  });

  test("isLessThan()", () => {
    const oneHundred = new Money(100);
    const twoHundred = new Money(200);

    expect(oneHundred.isLessThan(oneHundred)).toEqual(false);
    expect(oneHundred.isLessThan(twoHundred)).toEqual(true);
  });

  test("isZero()", () => {
    const money = new Money();

    expect(money.isZero()).toEqual(true);
  });

  test("format()", () => {
    const cases: [number, string][] = [
      [9999, "99.99"], // Standard case
      [90, "0.90"], // Less than a dollar, two decimal places
      [99, "0.99"], // Less than a dollar, two decimal places
      [10209, "102.09"], // More than a dollar, two decimal places
      [0, "0.00"], // Zero value
      [1, "0.01"], // One cent
      [100, "1.00"], // One dollar, no cents
      [1000, "10.00"], // Ten dollars, no cents
      [123456789, "1234567.89"], // Large value with cents
    ];

    for (const [value, string] of cases) {
      expect(new Money(value).format()).toEqual(string);
    }
  });
});
