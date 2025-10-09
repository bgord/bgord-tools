import { describe, expect, test } from "bun:test";
import { QuarterIsoId, QuarterIsoIdError } from "../src/quarter-iso-id.vo";

describe("QuarterIsoId", () => {
  test("accepts valid YYYY-Qn values", () => {
    const quarters = ["0000-Q1", "1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "9999-Q4"];

    for (const quarter of quarters) {
      expect(QuarterIsoId.safeParse(quarter).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => QuarterIsoId.parse("")).toThrow(QuarterIsoIdError.BadChars);
  });

  test("rejects non-string - null", () => {
    expect(() => QuarterIsoId.parse(null)).toThrow(QuarterIsoIdError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => QuarterIsoId.parse(123)).toThrow(QuarterIsoIdError.Type);
  });

  test("rejects quarters < 1 and > 4", () => {
    const invalid = ["2025-Q0", "2025-Q5"];

    for (const value of invalid) {
      expect(() => QuarterIsoId.parse(value)).toThrow(QuarterIsoIdError.BadChars);
    }
  });

  test("rejects structurally invalid strings", () => {
    const invalid = ["2025Q1", "2025-Q", "25-Q1", "2025-q1", "2025-QA", "2025-01"];

    for (const value of invalid) {
      expect(() => QuarterIsoId.parse(value)).toThrow(QuarterIsoIdError.BadChars);
    }
  });
});
