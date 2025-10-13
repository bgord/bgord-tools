import { describe, expect, test } from "bun:test";
import { Hour } from "../src/hour.vo";
import { HourSchema, HourSchemaError } from "../src/hour-schema.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Hour", () => {
  test("happy path", () => {
    expect(new Hour(5).get()).toEqual(HourSchema.parse(5));
  });

  test("throws for invalid hour values", () => {
    expect(() => new Hour(12.5)).toThrow(HourSchemaError.Type);
    expect(() => new Hour(-1)).toThrow(HourSchemaError.Invalid);
    expect(() => new Hour(24)).toThrow(HourSchemaError.Invalid);
  });

  test("fromEpochMs extracts UTC hour", () => {
    expect(Hour.fromEpochMs(Timestamp.parse(1700000000000)).get()).toEqual(HourSchema.parse(22));
  });

  test("Hour.ZERO", () => {
    expect(Hour.ZERO.get()).toEqual(HourSchema.parse(0));
  });

  test("Hour.MAX", () => {
    expect(Hour.MAX.get()).toEqual(HourSchema.parse(23));
  });

  test("get", () => {
    expect(new Hour(5).get()).toEqual(HourSchema.parse(5));
  });

  test("format", () => {
    expect(new Hour(5).toString()).toEqual("05");
    expect(new Hour(13).toString()).toEqual("13");
  });

  test("equals", () => {
    expect(new Hour(8).equals(new Hour(8))).toEqual(true);
    expect(new Hour(8).equals(new Hour(9))).toEqual(false);
  });

  test("isAfter", () => {
    expect(new Hour(10).isAfter(new Hour(9))).toEqual(true);
    expect(new Hour(9).isAfter(new Hour(10))).toEqual(false);
  });

  test("isBefore", () => {
    expect(new Hour(9).isBefore(new Hour(10))).toEqual(true);
    expect(new Hour(10).isBefore(new Hour(9))).toEqual(false);
  });

  test("Hour.list() returns cached 24 items", () => {
    const hours = Hour.list();

    expect(hours.length).toEqual(24);
    expect(hours[0].get()).toEqual(HourSchema.parse(0));
    expect(hours[23].get()).toEqual(HourSchema.parse(23));
    expect(Hour.list()).toEqual(hours);
  });

  test("toString", () => {
    expect(new Hour(3).toString()).toEqual("03");
    expect(new Hour(12).toString()).toEqual("12");
  });

  test("toJSON", () => {
    expect(new Hour(3).toJSON()).toEqual(3);
    expect(new Hour(12).toJSON()).toEqual(12);
  });
});
