import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { MinuteValue } from "../src/minute-value.vo";

describe("MinuteValue", () => {
  test("happy path", () => {
    expect(v.safeParse(MinuteValue, 0).success).toEqual(true);
    expect(v.safeParse(MinuteValue, 59).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(MinuteValue, null)).toThrow("minute.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(MinuteValue, "123")).toThrow("minute.value.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(MinuteValue, 1.5)).toThrow("minute.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(MinuteValue, -1)).toThrow("minute.value.invalid");
  });

  test("rejects 60", () => {
    expect(() => v.parse(MinuteValue, 60)).toThrow("minute.value.invalid");
  });
});
