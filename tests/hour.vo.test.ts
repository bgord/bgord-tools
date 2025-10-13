import { describe, expect, test } from "bun:test";
import { Hour } from "../src/hour.vo";
import { HourSchema, HourSchemaError } from "../src/hour-schema.vo";
import * as mocks from "./mocks";

const FIVE = new Hour(5);
const THIRTEEN = new Hour(13);

describe("Hour", () => {
  test("happy path", () => {
    expect(FIVE.get()).toEqual(HourSchema.parse(5));
  });

  test("throws for invalid hour values", () => {
    expect(() => new Hour(12.5)).toThrow(HourSchemaError.Type);
    expect(() => new Hour(-1)).toThrow(HourSchemaError.Invalid);
    expect(() => new Hour(24)).toThrow(HourSchemaError.Invalid);
  });

  test("fromEpochMs extracts UTC hour", () => {
    expect(Hour.fromEpochMs(mocks.TIME_ZERO).get()).toEqual(HourSchema.parse(22));
  });

  test("Hour.ZERO", () => {
    expect(Hour.ZERO.get()).toEqual(HourSchema.parse(0));
  });

  test("Hour.MAX", () => {
    expect(Hour.MAX.get()).toEqual(HourSchema.parse(23));
  });

  test("get", () => {
    expect(FIVE.get()).toEqual(HourSchema.parse(5));
  });

  test("format", () => {
    expect(FIVE.toString()).toEqual("05");
    expect(THIRTEEN.toString()).toEqual("13");
  });

  test("equals", () => {
    expect(FIVE.equals(FIVE)).toEqual(true);
    expect(FIVE.equals(THIRTEEN)).toEqual(false);
  });

  test("isAfter", () => {
    expect(THIRTEEN.isAfter(FIVE)).toEqual(true);
    expect(FIVE.isAfter(THIRTEEN)).toEqual(false);
  });

  test("isBefore", () => {
    expect(FIVE.isBefore(THIRTEEN)).toEqual(true);
    expect(THIRTEEN.isBefore(FIVE)).toEqual(false);
  });

  test("Hour.list() returns cached 24 items", () => {
    const hours = Hour.list();

    expect(hours.length).toEqual(24);
    expect(hours[0].get()).toEqual(HourSchema.parse(0));
    expect(hours[23].get()).toEqual(HourSchema.parse(23));
    expect(Hour.list()).toEqual(hours);
  });

  test("toString", () => {
    expect(FIVE.toString()).toEqual("05");
    expect(THIRTEEN.toString()).toEqual("13");
  });

  test("toJSON", () => {
    expect(FIVE.toJSON()).toEqual(HourSchema.parse(5));
    expect(THIRTEEN.toJSON()).toEqual(13);
  });
});
