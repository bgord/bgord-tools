import { describe, expect, test } from "bun:test";
import { MinuteValue } from "../src/minute-value.vo";

describe("MinuteValue", () => {
  test("happy path", () => {
    expect(MinuteValue.safeParse(0).success).toEqual(true);
    expect(MinuteValue.safeParse(59).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MinuteValue.parse(null)).toThrow("minute.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => MinuteValue.parse("123")).toThrow("minute.value.type");
  });

  test("rejects fractions", () => {
    expect(() => MinuteValue.parse(1.5)).toThrow("minute.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => MinuteValue.parse(-1)).toThrow("minute.value.invalid");
  });

  test("rejects 60", () => {
    expect(() => MinuteValue.parse(60)).toThrow("minute.value.invalid");
  });
});
