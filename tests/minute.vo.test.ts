import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Minute } from "../src/minute.vo";
import { MinuteValue } from "../src/minute-value.vo";
import * as mocks from "./mocks";

const FIVE = Minute.fromNumber(5);
const TEN = Minute.fromNumber(10);

const thirteenth = v.parse(MinuteValue, 13);

describe("Minute", () => {
  test("happy path", () => {
    expect(FIVE.get()).toEqual(v.parse(MinuteValue, 5));
  });

  test("throws for invalid minute values", () => {
    expect(() => Minute.fromNumber(12.5)).toThrow("minute.value.type");
    expect(() => Minute.fromNumber(-1)).toThrow("minute.value.invalid");
    expect(() => Minute.fromNumber(60)).toThrow("minute.value.invalid");
  });

  test("fromValueSafe", () => {
    expect(Minute.fromValueSafe(thirteenth).get()).toEqual(thirteenth);
  });

  test("fromTimestamp", () => {
    expect(Minute.fromTimestamp(mocks.TIME_ZERO).get()).toEqual(thirteenth);
  });

  test("fromTimestampValue", () => {
    expect(Minute.fromTimestampValue(mocks.TIME_ZERO.ms).get()).toEqual(thirteenth);
  });

  test("zero", () => {
    expect(Minute.zero().get()).toEqual(v.parse(MinuteValue, 0));
  });

  test("max", () => {
    expect(Minute.max().get()).toEqual(v.parse(MinuteValue, 59));
  });

  test("get", () => {
    expect(FIVE.get()).toEqual(v.parse(MinuteValue, 5));
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

  test("list", () => {
    const list = Minute.list();

    expect(list.length).toEqual(60);
    expect(list[0]?.get()).toEqual(v.parse(MinuteValue, 0));
    expect(list[59]?.get()).toEqual(v.parse(MinuteValue, 59));
  });

  test("toString", () => {
    expect(FIVE.toString()).toEqual("05");
    expect(TEN.toString()).toEqual("10");
  });

  test("toJSON", () => {
    expect(FIVE.toJSON()).toEqual(v.parse(MinuteValue, 5));
    expect(TEN.toJSON()).toEqual(v.parse(MinuteValue, 10));
  });
});
