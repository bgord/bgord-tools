import { describe, expect, test } from "bun:test";
import { MinuteSchema } from "../src/minute-schema.vo";

describe("MinuteSchema", () => {
  test("happy path", () => {
    expect(MinuteSchema.safeParse(0).success).toEqual(true);
    expect(MinuteSchema.safeParse(59).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MinuteSchema.parse(null)).toThrow("minute.schema.error");
  });

  test("rejects non-number - string", () => {
    expect(() => MinuteSchema.parse("123")).toThrow("minute.schema.error");
  });

  test("rejects fractions", () => {
    expect(() => MinuteSchema.parse(1.5)).toThrow("minute.schema.error");
  });

  test("rejects negative numbers", () => {
    expect(() => MinuteSchema.parse(-1)).toThrow("minute.schema.invalid");
  });

  test("rejects 60", () => {
    expect(() => MinuteSchema.parse(60)).toThrow("minute.schema.invalid");
  });
});
