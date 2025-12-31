import { describe, expect, test } from "bun:test";
import { HourSchema } from "../src/hour-schema.vo";

describe("HourSchema", () => {
  test("happy path", () => {
    expect(HourSchema.safeParse(0).success).toEqual(true);
    expect(HourSchema.safeParse(23).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => HourSchema.parse(null)).toThrow("hour.schema.type");
  });

  test("rejects non-number - string", () => {
    expect(() => HourSchema.parse("123")).toThrow("hour.schema.type");
  });

  test("rejects fractions", () => {
    expect(() => HourSchema.parse(1.5)).toThrow("hour.schema.type");
  });

  test("rejects negative numbers", () => {
    expect(() => HourSchema.parse(-1)).toThrow("hour.schema.invalid");
  });

  test("rejects too big", () => {
    expect(() => HourSchema.parse(24)).toThrow("hour.schema.invalid");
  });
});
