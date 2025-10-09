import { describe, expect, test } from "bun:test";
import { HourSchema, HourSchemaError } from "../src/hour-schema.vo";

describe("HourSchema", () => {
  test("accepts 0", () => {
    expect(HourSchema.safeParse(0).success).toEqual(true);
  });

  test("accepts 23", () => {
    expect(HourSchema.safeParse(23).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => HourSchema.parse(null)).toThrow(HourSchemaError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => HourSchema.parse("123")).toThrow(HourSchemaError.Type);
  });

  test("rejects fractions", () => {
    expect(() => HourSchema.parse(1.5)).toThrow(HourSchemaError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => HourSchema.parse(-1)).toThrow(HourSchemaError.Invalid);
  });

  test("rejects 24", () => {
    expect(() => HourSchema.parse(24)).toThrow(HourSchemaError.Invalid);
  });
});
