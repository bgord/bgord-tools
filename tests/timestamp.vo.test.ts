import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { Timestamp } from "../src/timestamp.vo";
import { TimestampError, TimestampValue } from "../src/timestamp-value.vo";
import * as mocks from "./mocks";

describe("Timestamp", () => {
  test("fromValue - success", () => {
    expect(Timestamp.fromValue(mocks.TIME_ZERO.get()));
  });

  test("fromValue - error", () => {
    expect(() => Timestamp.fromValue(TimestampValue.parse(-1))).toThrow(TimestampError.Invalid);
  });

  test("fromNumber - success", () => {
    expect(Timestamp.fromNumber(mocks.TIME_ZERO.get()));
  });

  test("fromNumber - error", () => {
    expect(() => Timestamp.fromNumber(-1)).toThrow(TimestampError.Invalid);
  });

  test("add", () => {
    expect(mocks.TIME_ZERO.add(Duration.Ms(500)).get()).toEqual(
      TimestampValue.parse(mocks.TIME_ZERO.get() + 500),
    );
  });

  test("subtract", () => {
    expect(mocks.TIME_ZERO.subtract(Duration.Ms(500)).get()).toEqual(
      TimestampValue.parse(mocks.TIME_ZERO.get() - 500),
    );
  });

  test("isBefore", () => {
    expect(mocks.TIME_ZERO.isBefore(Timestamp.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBefore(Timestamp.fromNumber(0))).toEqual(false);
  });

  test("isBeforeOrEqual", () => {
    expect(mocks.TIME_ZERO.isBeforeOrEqual(Timestamp.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(Timestamp.fromNumber(0))).toEqual(false);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(mocks.TIME_ZERO)).toEqual(true);
  });

  test("isAfter", () => {
    expect(mocks.TIME_ZERO.isAfter(Timestamp.fromNumber(Date.now()))).toEqual(false);
    expect(mocks.TIME_ZERO.isAfter(Timestamp.fromNumber(0))).toEqual(true);
  });

  test("isAfterOrEqual", () => {
    expect(mocks.TIME_ZERO.isAfterOrEqual(Timestamp.fromNumber(Date.now()))).toEqual(false);
    expect(mocks.TIME_ZERO.isAfterOrEqual(Timestamp.fromNumber(0))).toEqual(true);
    expect(mocks.TIME_ZERO.isAfterOrEqual(mocks.TIME_ZERO)).toEqual(true);
  });

  test("equals", () => {
    expect(mocks.TIME_ZERO.equals(mocks.TIME_ZERO)).toEqual(true);
  });

  test("get", () => {
    expect(mocks.TIME_ZERO.get()).toEqual(mocks.TIME_ZERO.get());
  });

  test("toJSON", () => {
    expect(mocks.TIME_ZERO.toJSON()).toEqual(mocks.TIME_ZERO.get());
  });

  test("toString", () => {
    expect(mocks.TIME_ZERO.toString()).toEqual(mocks.TIME_ZERO.get().toString());
  });
});
