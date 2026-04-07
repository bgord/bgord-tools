import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";

describe("QuarterIsoId", () => {
  test("happy path", () => {
    const valid = ["0000-Q1", "1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "9999-Q4"];
    for (const value of valid) {
      expect(v.safeParse(QuarterIsoId, value).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => v.parse(QuarterIsoId, "")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(QuarterIsoId, null)).toThrow("quarter.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(QuarterIsoId, 123)).toThrow("quarter.iso.id.type");
  });

  test("rejects trailing characters", () => {
    expect(() => v.parse(QuarterIsoId, "2025-Q1x")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects leading characters", () => {
    expect(() => v.parse(QuarterIsoId, "x2025-Q1")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects quarters < 1 and > 4", () => {
    expect(() => v.parse(QuarterIsoId, "2025-Q0")).toThrow("quarter.iso.id.bad.chars");
    expect(() => v.parse(QuarterIsoId, "2025-Q5")).toThrow("quarter.iso.id.bad.chars");
  });

  test("rejects structurally invalid strings", () => {
    for (const value of ["2025Q1", "2025-Q", "25-Q1", "2025-q1", "2025-QA", "2025-01"]) {
      expect(() => v.parse(QuarterIsoId, value)).toThrow("quarter.iso.id.bad.chars");
    }
  });
});
