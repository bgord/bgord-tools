import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { HourValue } from "../src/hour-value.vo";

describe("HourValue", () => {
  test("happy path", () => {
    expect(v.safeParse(HourValue, 0).success).toEqual(true);
    expect(v.safeParse(HourValue, 23).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(HourValue, null)).toThrow("hour.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(HourValue, "123")).toThrow("hour.value.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(HourValue, 1.5)).toThrow("hour.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(HourValue, -1)).toThrow("hour.value.invalid");
  });

  test("rejects too big", () => {
    expect(() => v.parse(HourValue, 24)).toThrow("hour.value.invalid");
  });
});
