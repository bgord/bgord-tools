import { describe, expect, test } from "bun:test";
import { Minute } from "../src/minute.vo";
import { MinuteSchema } from "../src/minute-schema.vo";
import * as mocks from "./mocks";

const FIVE = Minute.fromValue(5);
const TEN = Minute.fromValue(10);

describe("Minute", () => {
  test("happy path", () => {
    expect(FIVE.get()).toEqual(MinuteSchema.parse(5));
  });

  test("throws for invalid minute values", () => {
    expect(() => Minute.fromValue(12.5)).toThrow("minute.schema.error");
    expect(() => Minute.fromValue(-1)).toThrow("minute.schema.invalid");
    expect(() => Minute.fromValue(60)).toThrow("minute.schema.invalid");
  });

  test("fromValueSafe", () => {
    expect(Minute.fromValueSafe(MinuteSchema.parse(13)).get()).toEqual(MinuteSchema.parse(13));
  });

  test("fromTimestamp extracts UTC minutes", () => {
    expect(Minute.fromTimestamp(mocks.TIME_ZERO).get()).toEqual(MinuteSchema.parse(13));
  });

  test("fromTimestampValue", () => {
    expect(Minute.fromTimestampValue(mocks.TIME_ZERO.ms).get()).toEqual(MinuteSchema.parse(13));
  });

  test("zero", () => {
    expect(Minute.zero().get()).toEqual(MinuteSchema.parse(0));
  });

  test("max", () => {
    expect(Minute.max().get()).toEqual(MinuteSchema.parse(59));
  });

  test("get", () => {
    expect(FIVE.get()).toEqual(MinuteSchema.parse(5));
  });

  test("equals", () => {
    expect(FIVE.equals(FIVE)).toEqual(true);
    expect(FIVE.equals(TEN)).toEqual(false);
  });

  test("isBefore", () => {
    expect(FIVE.isBefore(TEN)).toEqual(true);
    expect(TEN.isBefore(FIVE)).toEqual(false);
    expect(TEN.isBefore(TEN)).toEqual(false);
  });

  test("isAfter", () => {
    expect(TEN.isAfter(FIVE)).toEqual(true);
    expect(FIVE.isAfter(TEN)).toEqual(false);
    expect(FIVE.isAfter(FIVE)).toEqual(false);
  });

  test("Minute.list()", () => {
    const list = Minute.list();

    expect(list.length).toEqual(60);
    expect(list[0].get()).toEqual(MinuteSchema.parse(0));
    expect(list[59].get()).toEqual(MinuteSchema.parse(59));
  });

  test("toString", () => {
    expect(FIVE.toString()).toEqual("05");
    expect(TEN.toString()).toEqual("10");
  });

  test("toJSON", () => {
    expect(FIVE.toJSON()).toEqual(MinuteSchema.parse(5));
    expect(TEN.toJSON()).toEqual(MinuteSchema.parse(10));
  });
});
