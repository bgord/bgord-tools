import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Duration } from "../src/duration.service";
import { Temporal } from "../src/temporal";
import { Timestamp } from "../src/timestamp.vo";
import { TimestampValue } from "../src/timestamp-value.vo";
import * as mocks from "./mocks";

describe("Timestamp", () => {
  test("fromInstant", () => {
    expect(Timestamp.fromInstant(Temporal.Instant.from(mocks.TIME_ZERO_PLAIN_DATE_TIME)));
  });

  test("fromString - success", () => {
    expect(Timestamp.fromString(mocks.TIME_ZERO_PLAIN_DATE_TIME));
  });

  test("fromString - error", () => {
    expect(() => Timestamp.fromString("not-a-date")).toThrow("Cannot parse: not-a-date");
  });

  test("fromValue - success", () => {
    expect(Timestamp.fromValue(mocks.TIME_ZERO.ms));
  });

  test("fromValue - error", () => {
    expect(() => Timestamp.fromValue(v.parse(TimestampValue, -1))).toThrow("timestamp.invalid");
  });

  test("fromNumber - success", () => {
    expect(Timestamp.fromNumber(mocks.TIME_ZERO.ms));
  });

  test("fromNumber - error", () => {
    expect(() => Timestamp.fromNumber(-1)).toThrow("timestamp.invalid");
  });

  test("add", () => {
    expect(mocks.TIME_ZERO.add(Duration.Ms(500)).ms).toEqual(
      v.parse(TimestampValue, mocks.TIME_ZERO.ms + 500),
    );
  });

  test("subtract", () => {
    expect(mocks.TIME_ZERO.subtract(Duration.Ms(500)).ms).toEqual(
      v.parse(TimestampValue, mocks.TIME_ZERO.ms - 500),
    );
  });

  test("difference", () => {
    expect(mocks.TIME_ZERO.difference(mocks.TIME_ZERO.subtract(Duration.Minutes(30)))).toEqual(
      Duration.Minutes(30),
    );
  });

  test("isBefore", () => {
    expect(mocks.TIME_ZERO.isBefore(Timestamp.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBefore(Timestamp.fromNumber(0))).toEqual(false);
    expect(mocks.TIME_ZERO.isBefore(mocks.TIME_ZERO)).toEqual(false);
  });

  test("isBeforeOrEqual", () => {
    expect(mocks.TIME_ZERO.isBeforeOrEqual(Timestamp.fromNumber(Date.now()))).toEqual(true);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(Timestamp.fromNumber(0))).toEqual(false);
    expect(mocks.TIME_ZERO.isBeforeOrEqual(mocks.TIME_ZERO)).toEqual(true);
  });

  test("isAfter", () => {
    expect(mocks.TIME_ZERO.isAfter(Timestamp.fromNumber(0))).toEqual(true);
    expect(mocks.TIME_ZERO.isAfter(Timestamp.fromNumber(Date.now()))).toEqual(false);
    expect(mocks.TIME_ZERO.isAfter(mocks.TIME_ZERO)).toEqual(false);
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
    expect(mocks.TIME_ZERO.ms).toEqual(mocks.TIME_ZERO.ms);
  });

  test("toInstant", () => {
    expect(mocks.TIME_ZERO.toInstant().toString()).toEqual(mocks.TIME_ZERO_PLAIN_DATE_TIME);
  });

  test("toJSON", () => {
    expect(mocks.TIME_ZERO.toJSON()).toEqual(mocks.TIME_ZERO.ms);
  });

  test("toString", () => {
    expect(mocks.TIME_ZERO.toString()).toEqual(mocks.TIME_ZERO.ms.toString());
  });
});
