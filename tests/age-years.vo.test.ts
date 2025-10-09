import { describe, expect, test } from "bun:test";
import { AgeYears, AgeYearsError } from "../src/age-years.vo";

describe("AgeYears", () => {
  test("accepts 1", () => {
    expect(AgeYears.safeParse(1).success).toEqual(true);
  });

  test("accepts 130", () => {
    expect(AgeYears.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => AgeYears.parse(null)).toThrow(AgeYearsError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => AgeYears.parse("100")).toThrow(AgeYearsError.Type);
  });

  test("rejects fraction", () => {
    expect(() => AgeYears.parse(100.5)).toThrow(AgeYearsError.Type);
  });

  test("rejects 0", () => {
    expect(() => AgeYears.parse(0)).toThrow(AgeYearsError.Invalid);
  });

  test("rejects 131", () => {
    expect(() => AgeYears.parse(131)).toThrow(AgeYearsError.Invalid);
  });
});
