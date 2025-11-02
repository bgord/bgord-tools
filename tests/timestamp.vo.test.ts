import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { TimestampVO } from "../src/timestamp.vo";
import { TimestampValue, TimestampValueError } from "../src/timestamp-value.vo";
import * as mocks from "./mocks";

describe("Timestamp", () => {
  test("fromValue - success", () => {
    expect(TimestampVO.fromValue(mocks.TIME_ZERO.ms()));
  });

  test("fromValue - error", () => {
    expect(() => TimestampVO.fromValue(TimestampValue.parse(-1))).toThrow(TimestampValueError.Invalid);
  });

  test("fromNumber - success", () => {
    expect(TimestampVO.fromNumber(mocks.TIME_ZERO.ms()));
  });

  test("fromNumber - error", () => {
    expect(() => TimestampVO.fromNumber(-1)).toThrow(TimestampValueError.Invalid);
  });

  test("add", () => {
    expect(mocks.TIME_ZERO.add(Duration.Ms(500)).ms()).toEqual(
      TimestampValue.parse(mocks.TIME_ZERO.ms() + 500),
    );
  });

  test("subtract", () => {
    expect(mocks.TIME_ZERO.subtract(Duration.Ms(500)).ms()).toEqual(
      TimestampValue.parse(mocks.TIME_ZERO.ms() - 500),
    );
  });

  test("isBefore", () => {
    expect(mocks.TIME_ZERO.isBefore(TimestampVO.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBefore(TimestampVO.fromNumber(0))).toEqual(false);
  });

  test("isBeforeOrEqual", () => {
    expect(mocks.TIME_ZERO.isBeforeOrEqual(TimestampVO.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(TimestampVO.fromNumber(0))).toEqual(false);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(mocks.TIME_ZERO)).toEqual(true);
  });

  test("isAfter", () => {
    expect(mocks.TIME_ZERO.isAfter(TimestampVO.fromNumber(Date.now()))).toEqual(false);
    expect(mocks.TIME_ZERO.isAfter(TimestampVO.fromNumber(0))).toEqual(true);
  });

  test("isAfterOrEqual", () => {
    expect(mocks.TIME_ZERO.isAfterOrEqual(TimestampVO.fromNumber(Date.now()))).toEqual(false);
    expect(mocks.TIME_ZERO.isAfterOrEqual(TimestampVO.fromNumber(0))).toEqual(true);
    expect(mocks.TIME_ZERO.isAfterOrEqual(mocks.TIME_ZERO)).toEqual(true);
  });

  test("equals", () => {
    expect(mocks.TIME_ZERO.equals(mocks.TIME_ZERO)).toEqual(true);
  });

  test("get", () => {
    expect(mocks.TIME_ZERO.ms()).toEqual(mocks.TIME_ZERO.ms());
  });

  test("toJSON", () => {
    expect(mocks.TIME_ZERO.toJSON()).toEqual(mocks.TIME_ZERO.ms());
  });

  test("toString", () => {
    expect(mocks.TIME_ZERO.toString()).toEqual(mocks.TIME_ZERO.ms().toString());
  });
});
