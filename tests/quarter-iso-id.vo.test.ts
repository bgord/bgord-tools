import { describe, expect, test } from "bun:test";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";

describe("QuarterIsoId", () => {
  test("happy path", () => {
    const valid = ["0000-Q1", "1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "9999-Q4"];

    for (const value of valid) {
      expect(QuarterIsoId.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => QuarterIsoId.parse("")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => QuarterIsoId.parse(null)).toThrow("quarter.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => QuarterIsoId.parse(123)).toThrow("quarter.iso.id.type");
  });

  test("rejects quarters < 1 and > 4", () => {
    expect(() => QuarterIsoId.parse("2025-Q0")).toThrow("quarter.iso.id.bad.chars");
    expect(() => QuarterIsoId.parse("2025-Q5")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects structurally invalid strings", () => {
    const invalid = ["2025Q1", "2025-Q", "25-Q1", "2025-q1", "2025-QA", "2025-01"];

    for (const value of invalid) {
      expect(() => QuarterIsoId.parse(value)).toThrow("quarter.iso.id.bad.chars");
    }
  });
});
