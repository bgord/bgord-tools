import { describe, expect, test } from "bun:test";
import { Distance, DistanceError } from "../src/distance.vo";
import { DistanceValue, DistanceValueError } from "../src/distance-value.vo";
import { RoundToDecimal } from "../src/rounding.adapter";

describe("Distance", () => {
  test("happy path", () => {
    expect(Distance.fromMeters().get()).toEqual(DistanceValue.parse(0));
    expect(Distance.fromMeters(100).get()).toEqual(DistanceValue.parse(100));
  });

  test("throws on invalid input", () => {
    expect(() => Distance.fromMeters(100.5)).toThrow(DistanceValueError.Type);
  });

  test("fromMetersSafe", () => {
    expect(Distance.fromMetersSafe(DistanceValue.parse(1)).get()).toEqual(DistanceValue.parse(1));
  });

  test("fromKilometers", () => {
    expect(Distance.fromKilometers(1).get()).toEqual(DistanceValue.parse(1000));
    expect(Distance.fromKilometers(1.5).get()).toEqual(DistanceValue.parse(1500));
    expect(Distance.fromKilometers(0.123456789).get()).toEqual(DistanceValue.parse(123));
  });

  test("fromKilometers - throws on invalid input", () => {
    expect(() => Distance.fromKilometers(0.123456789, new RoundToDecimal(5))).toThrow(
      DistanceValueError.Type,
    );
  });

  test("fromMiles", () => {
    expect(Distance.fromMiles(1).get()).toEqual(DistanceValue.parse(1609));
    expect(Distance.fromMiles(1.5).get()).toEqual(DistanceValue.parse(2414));
    expect(Distance.fromMiles(0.123456789).get()).toEqual(DistanceValue.parse(199));
  });

  test("fromMiles - throws on invalid input", () => {
    expect(() => Distance.fromMiles(1, new RoundToDecimal(1))).toThrow(DistanceValueError.Type);
  });

  test("add", () => {
    expect(Distance.fromMeters(100).add(Distance.fromMeters()).get()).toEqual(DistanceValue.parse(100));
    expect(Distance.fromMeters(15).add(Distance.fromMeters(10)).get()).toEqual(DistanceValue.parse(25));
  });

  test("subtract - result more than zero", () => {
    expect(Distance.fromMeters(100).subtract(Distance.fromMeters(20)).get()).toEqual(DistanceValue.parse(80));
  });

  test("subtract - result zero", () => {
    expect(Distance.fromMeters(100).subtract(Distance.fromMeters(100)).isZero()).toEqual(true);
  });

  test("subtract - result less than zero", () => {
    expect(() => Distance.fromMeters(100).subtract(Distance.fromMeters(120)).get()).toThrow(
      DistanceError.SubtractResultLessThanZero,
    );
  });

  test("equals", () => {
    const oneHundred = Distance.fromMeters(100);
    const twoHundred = Distance.fromMeters(200);

    expect(oneHundred.equals(oneHundred)).toEqual(true);
    expect(oneHundred.equals(twoHundred)).toEqual(false);
  });

  test("isLongerThan", () => {
    const oneHundred = Distance.fromMeters(100);
    const twoHundred = Distance.fromMeters(200);

    expect(oneHundred.isLongerThan(oneHundred)).toEqual(false);
    expect(twoHundred.isLongerThan(oneHundred)).toEqual(true);
  });

  test("isShorterThan", () => {
    const oneHundred = Distance.fromMeters(100);
    const twoHundred = Distance.fromMeters(200);

    expect(oneHundred.isShorterThan(oneHundred)).toEqual(false);
    expect(oneHundred.isShorterThan(twoHundred)).toEqual(true);
  });

  test("isZero", () => {
    expect(Distance.fromMeters().isZero()).toEqual(true);
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
      expect(Distance.fromMeters(value).format()).toEqual(result);
    }
  });

  test("toString", () => {
    expect(Distance.fromMeters(5).toString()).toEqual("5");
  });

  test("toJSON", () => {
    expect(Distance.fromMeters(5).toJSON()).toEqual(5);
  });
});
