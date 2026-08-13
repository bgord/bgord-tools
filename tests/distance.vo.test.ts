import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Distance } from "../src/distance.vo";
import { DistanceValue } from "../src/distance-value.vo";
import { RoundingDecimalStrategy } from "../src/rounding-decimal.strategy";

describe("Distance", () => {
  test("happy path", () => {
    expect(Distance.fromMeters(0).get()).toEqual(v.parse(DistanceValue, 0));
    expect(Distance.fromMeters(100).get()).toEqual(v.parse(DistanceValue, 100));
  });

  test("throws on invalid input", () => {
    expect(() => Distance.fromMeters(100.5)).toThrow("distance.value.type");
  });

  test("fromMetersSafe", () => {
    expect(Distance.fromMetersSafe(v.parse(DistanceValue, 1)).get()).toEqual(v.parse(DistanceValue, 1));
  });

  test("fromKilometers", () => {
    expect(Distance.fromKilometers(1).get()).toEqual(v.parse(DistanceValue, 1000));
    expect(Distance.fromKilometers(1.5).get()).toEqual(v.parse(DistanceValue, 1500));
    expect(Distance.fromKilometers(0.123456789).get()).toEqual(v.parse(DistanceValue, 123));
  });

  test("fromKilometers - throws on invalid input", () => {
    expect(() => Distance.fromKilometers(0.123456789, new RoundingDecimalStrategy(5))).toThrow(
      "distance.value.type",
    );
  });

  test("fromMiles", () => {
    expect(Distance.fromMiles(1).get()).toEqual(v.parse(DistanceValue, 1609));
    expect(Distance.fromMiles(1.5).get()).toEqual(v.parse(DistanceValue, 2414));
    expect(Distance.fromMiles(0.123456789).get()).toEqual(v.parse(DistanceValue, 199));
  });

  test("fromMiles - throws on invalid input", () => {
    expect(() => Distance.fromMiles(1, new RoundingDecimalStrategy(1))).toThrow("distance.value.type");
  });

  test("add", () => {
    expect(Distance.fromMeters(100).add(Distance.fromMeters(0)).get()).toEqual(v.parse(DistanceValue, 100));
    expect(Distance.fromMeters(15).add(Distance.fromMeters(10)).get()).toEqual(v.parse(DistanceValue, 25));
  });

  test("subtract - result more than zero", () => {
    expect(Distance.fromMeters(100).subtract(Distance.fromMeters(20)).get()).toEqual(
      v.parse(DistanceValue, 80),
    );
  });

  test("subtract - result zero", () => {
    expect(Distance.fromMeters(100).subtract(Distance.fromMeters(100)).isZero()).toEqual(true);
  });

  test("subtract - result less than zero", () => {
    expect(() => Distance.fromMeters(100).subtract(Distance.fromMeters(120)).get()).toThrow(
      "distance.subtract.result.less.than.zero",
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
    expect(Distance.fromMeters(0).isZero()).toEqual(true);
    expect(Distance.fromMeters(1).isZero()).toEqual(false);
  });

  test("zero", () => {
    expect(Distance.zero().isZero()).toEqual(true);
  });

  test("toMeters", () => {
    expect(Distance.fromKilometers(1.5).toMeters()).toEqual(v.parse(DistanceValue, 1500));
  });

  test("toKilometers", () => {
    expect(Distance.fromMeters(1500).toKilometers()).toEqual(1.5);
    expect(Distance.fromKilometers(2).toKilometers()).toEqual(2);
  });

  test("toMiles", () => {
    expect(Distance.fromMeters(1_609_344).toMiles()).toEqual(1000);
    // Metres are stored as integers, so a single mile does not round-trip exactly
    expect(Distance.fromMiles(1).toMiles()).toBeCloseTo(1, 3);
  });

  test("toString", () => {
    expect(Distance.fromMeters(5).toString()).toEqual("5");
  });

  test("toJSON", () => {
    expect(Distance.fromMeters(5).toJSON()).toEqual(5);
  });
});
