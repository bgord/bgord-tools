import { describe, expect, test } from "bun:test";
import { Distance, DistanceError } from "../src/distance.vo";
import { DistanceValue, DistanceValueError } from "../src/distance-value.vo";

describe("Distance", () => {
  test("happy path", () => {
    expect(new Distance().get()).toEqual(DistanceValue.parse(0));
    expect(new Distance(100).get()).toEqual(DistanceValue.parse(100));
  });

  test("throws on invalid input", () => {
    expect(() => new Distance(100.5)).toThrow(DistanceValueError.Type);
  });

  test("add", () => {
    expect(new Distance(100).add(new Distance()).get()).toEqual(DistanceValue.parse(100));
    expect(new Distance(15).add(new Distance(10)).get()).toEqual(DistanceValue.parse(25));
  });

  test("subtract - result more than zero", () => {
    expect(new Distance(100).subtract(new Distance(20)).get()).toEqual(DistanceValue.parse(80));
  });

  test("subtract - result zero", () => {
    expect(new Distance(100).subtract(new Distance(100)).isZero()).toEqual(true);
  });

  test("subtract - result less than zero", () => {
    expect(() => new Distance(100).subtract(new Distance(120)).get()).toThrow(
      DistanceError.SubtractResultLessThanZero,
    );
  });

  test("equals", () => {
    const oneHundred = new Distance(100);
    const twoHundred = new Distance(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("isLongerThan", () => {
    const oneHundred = new Distance(100);
    const twoHundred = new Distance(200);

    expect(oneHundred.isLongerThan(oneHundred)).toEqual(false);
    expect(twoHundred.isLongerThan(oneHundred)).toEqual(true);
  });

  test("isShorterThan", () => {
    const oneHundred = new Distance(100);
    const twoHundred = new Distance(200);

    expect(oneHundred.isShorterThan(oneHundred)).toEqual(false);
    expect(oneHundred.isShorterThan(twoHundred)).toEqual(true);
  });

  test("isZero", () => {
    expect(new Distance().isZero()).toEqual(true);
  });

  test("format", () => {
    const cases = [
      [9999, "9999"],
      [90, "90"],
      [99, "99"],
      [10209, "10209"],
      [0, "0"],
      [1, "1"],
      [100, "100"],
      [1000, "1000"],
      [123456789, "123456789"],
    ] as const;

    for (const [value, result] of cases) {
      expect(new Distance(value).format()).toEqual(result);
    }
  });

  test("toString", () => {
    expect(new Distance(5).toString()).toEqual("5");
  });

  test("toJSON", () => {
    expect(new Distance(5).toJSON()).toEqual(5);
  });
});
