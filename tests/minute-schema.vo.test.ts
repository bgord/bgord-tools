import { describe, expect, test } from "bun:test";
import { MinuteSchema, MinuteSchemaError } from "../src/minute-schema.vo";

describe("MinuteSchema", () => {
  test("happy path", () => {
    expect(MinuteSchema.safeParse(0).success).toEqual(true);
    expect(MinuteSchema.safeParse(59).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MinuteSchema.parse(null)).toThrow(MinuteSchemaError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => MinuteSchema.parse("123")).toThrow(MinuteSchemaError.Type);
  });

  test("rejects fractions", () => {
    expect(() => MinuteSchema.parse(1.5)).toThrow(MinuteSchemaError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => MinuteSchema.parse(-1)).toThrow(MinuteSchemaError.Invalid);
  });

  test("rejects 60", () => {
    expect(() => MinuteSchema.parse(60)).toThrow(MinuteSchemaError.Invalid);
  });
});
