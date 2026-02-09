import { describe, expect, test } from "bun:test";
import { HourValue } from "../src/hour-value.vo";

describe("HourValue", () => {
  test("happy path", () => {
    expect(HourValue.safeParse(0).success).toEqual(true);
    expect(HourValue.safeParse(23).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => HourValue.parse(null)).toThrow("hour.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => HourValue.parse("123")).toThrow("hour.value.type");
  });

  test("rejects fractions", () => {
    expect(() => HourValue.parse(1.5)).toThrow("hour.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => HourValue.parse(-1)).toThrow("hour.value.invalid");
  });

  test("rejects too big", () => {
    expect(() => HourValue.parse(24)).toThrow("hour.value.invalid");
  });
});
