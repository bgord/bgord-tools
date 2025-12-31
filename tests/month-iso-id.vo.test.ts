import { describe, expect, test } from "bun:test";
import { MonthIsoId } from "../src/month-iso-id.vo";

describe("MonthIsoId", () => {
  test("happy path", () => {
    const valid = ["0000-01", "1970-01", "1999-12", "2024-02", "2025-10", "9999-12"];

    for (const value of valid) {
      expect(MonthIsoId.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => MonthIsoId.parse("")).toThrow("month.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => MonthIsoId.parse(null)).toThrow("month.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => MonthIsoId.parse(123)).toThrow("month.iso.id.type");
  });

  test("rejects months < 1 and > 12", () => {
    expect(() => MonthIsoId.parse("2023-00")).toThrow("month.iso.id.invalid");
    expect(() => MonthIsoId.parse("2023-13")).toThrow("month.iso.id.invalid");
  });

  test("rejects structurally invalid strings", () => {
    const invalid = ["2023-1", "2023/01", "23-01"];

    for (const value of invalid) {
      expect(() => MonthIsoId.parse(value)).toThrow("month.iso.id.bad.chars");
    }
  });
});
