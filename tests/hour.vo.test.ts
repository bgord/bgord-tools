import { describe, expect, test } from "bun:test";
import { Hour } from "../src/hour.vo";
import { HourSchema } from "../src/hour-schema.vo";
import * as mocks from "./mocks";

const FIVE = Hour.fromValue(5);
const THIRTEEN = Hour.fromValue(13);

describe("Hour", () => {
  test("happy path", () => {
    expect(FIVE.get()).toEqual(HourSchema.parse(5));
  });

  test("throws for invalid hour values", () => {
    expect(() => Hour.fromValue(12.5)).toThrow("hour.schema.type");
    expect(() => Hour.fromValue(-1)).toThrow("hour.schema.invalid");
    expect(() => Hour.fromValue(24)).toThrow("hour.schema.invalid");
  });

  test("fromValueSafe", () => {
    expect(Hour.fromValueSafe(HourSchema.parse(1)).get()).toEqual(HourSchema.parse(1));
  });

  test("fromTimestampValue", () => {
    expect(Hour.fromTimestampValue(mocks.TIME_ZERO.ms).get()).toEqual(HourSchema.parse(22));
  });

  test("fromTimestamp", () => {
    expect(Hour.fromTimestamp(mocks.TIME_ZERO).get()).toEqual(HourSchema.parse(22));
  });

  test("zero", () => {
    expect(Hour.zero().get()).toEqual(HourSchema.parse(0));
  });

  test("max", () => {
    expect(Hour.max().get()).toEqual(HourSchema.parse(23));
  });

  test("get", () => {
    expect(FIVE.get()).toEqual(HourSchema.parse(5));
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
    expect(hours[0].get()).toEqual(HourSchema.parse(0));
    expect(hours[23].get()).toEqual(HourSchema.parse(23));
    expect(Hour.list()).toEqual(hours);
  });

  test("toString", () => {
    expect(FIVE.toString()).toEqual("5");
    expect(THIRTEEN.toString()).toEqual("13");
  });

  test("toJSON", () => {
    expect(FIVE.toJSON()).toEqual(HourSchema.parse(5));
    expect(THIRTEEN.toJSON()).toEqual(13);
  });
});
