import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { AgeYears } from "../src/age-years.vo";

describe("AgeYears", () => {
  test("happy path", () => {
    expect(v.safeParse(AgeYears, 0).success).toEqual(true);
    expect(v.safeParse(AgeYears, 130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(AgeYears, null)).toThrow("age.years.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(AgeYears, "100")).toThrow("age.years.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(AgeYears, 100.5)).toThrow("age.years.type");
  });

  test("rejects negative", () => {
    expect(() => v.parse(AgeYears, -1)).toThrow("age.years.invalid");
  });

  test("rejects 131", () => {
    expect(() => v.parse(AgeYears, 131)).toThrow("age.years.invalid");
  });
});
