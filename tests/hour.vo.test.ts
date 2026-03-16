import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Hour } from "../src/hour.vo";
import { HourValue } from "../src/hour-value.vo";
import * as mocks from "./mocks";

const FIVE = Hour.fromValue(5);
const THIRTEEN = Hour.fromValue(13);

describe("Hour", () => {
  test("happy path", () => {
    expect(FIVE.get()).toEqual(v.parse(HourValue, 5));
  });

  test("throws for invalid hour values", () => {
    expect(() => Hour.fromValue(12.5)).toThrow("hour.value.type");
    expect(() => Hour.fromValue(-1)).toThrow("hour.value.invalid");
    expect(() => Hour.fromValue(24)).toThrow("hour.value.invalid");
  });

  test("fromValueSafe", () => {
    expect(Hour.fromValueSafe(v.parse(HourValue, 1)).get()).toEqual(v.parse(HourValue, 1));
  });

  test("fromTimestampValue", () => {
    expect(Hour.fromTimestampValue(mocks.TIME_ZERO.ms).get()).toEqual(v.parse(HourValue, 22));
  });

  test("fromTimestamp", () => {
    expect(Hour.fromTimestamp(mocks.TIME_ZERO).get()).toEqual(v.parse(HourValue, 22));
  });

  test("zero", () => {
    expect(Hour.zero().get()).toEqual(v.parse(HourValue, 0));
  });

  test("max", () => {
    expect(Hour.max().get()).toEqual(v.parse(HourValue, 23));
  });

  test("get", () => {
    expect(FIVE.get()).toEqual(v.parse(HourValue, 5));
  });

  test("equals", () => {
    expect(FIVE.equals(FIVE)).toEqual(true);
    expect(FIVE.equals(THIRTEEN)).toEqual(false);
  });

  test("isAfter", () => {
    expect(THIRTEEN.isAfter(FIVE)).toEqual(true);
    expect(FIVE.isAfter(THIRTEEN)).toEqual(false);
    expect(THIRTEEN.isAfter(THIRTEEN)).toEqual(false);
  });

  test("isBefore", () => {
    expect(FIVE.isBefore(THIRTEEN)).toEqual(true);
    expect(THIRTEEN.isBefore(FIVE)).toEqual(false);
    expect(THIRTEEN.isBefore(THIRTEEN)).toEqual(false);
  });

  test("list", () => {
    const hours = Hour.list();

    expect(hours.length).toEqual(24);
    expect(hours[0].get()).toEqual(v.parse(HourValue, 0));
    expect(hours[23].get()).toEqual(v.parse(HourValue, 23));
    expect(Hour.list()).toEqual(hours);
  });

  test("toString", () => {
    expect(FIVE.toString()).toEqual("5");
    expect(THIRTEEN.toString()).toEqual("13");
  });

  test("toJSON", () => {
    expect(FIVE.toJSON()).toEqual(v.parse(HourValue, 5));
    expect(THIRTEEN.toJSON()).toEqual(13);
  });
});
