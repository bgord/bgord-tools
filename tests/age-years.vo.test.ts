import { describe, expect, test } from "bun:test";
import { AgeYears } from "../src/age-years.vo";

describe("AgeYears", () => {
  test("happy path", () => {
    expect(AgeYears.safeParse(1).success).toEqual(true);
    expect(AgeYears.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => AgeYears.parse(null)).toThrow("age.years.type");
  });

  test("rejects non-number - string", () => {
    expect(() => AgeYears.parse("100")).toThrow("age.years.type");
  });

  test("rejects fraction", () => {
    expect(() => AgeYears.parse(100.5)).toThrow("age.years.type");
  });

  test("rejects 0", () => {
    expect(() => AgeYears.parse(0)).toThrow("age.years.invalid");
  });

  test("rejects 131", () => {
    expect(() => AgeYears.parse(131)).toThrow("age.years.invalid");
  });
});
