import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { TimestampValue } from "../src/timestamp-value.vo";

describe("TimestampValue", () => {
  test("happy path", () => {
    expect(v.safeParse(TimestampValue, 0).success).toEqual(true);
    expect(v.safeParse(TimestampValue, Temporal.Now.instant().epochMilliseconds).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(TimestampValue, null)).toThrow("timestamp.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(TimestampValue, "123")).toThrow("timestamp.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(TimestampValue, -1)).toThrow("timestamp.invalid");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(TimestampValue, 1.5)).toThrow("timestamp.type");
  });

  test("rejects unsafe integers", () => {
    expect(() => v.parse(TimestampValue, Number.MAX_SAFE_INTEGER + 2)).toThrow("timestamp.type");
    expect(() => v.parse(TimestampValue, 1e308)).toThrow("timestamp.type");
  });
});
