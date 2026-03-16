import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { MonthIsoId } from "../src/month-iso-id.vo";

describe("MonthIsoId", () => {
  test("happy path", () => {
    const valid = ["0000-01", "1970-01", "1999-12", "2024-02", "2025-10", "9999-12"];

    for (const value of valid) {
      expect(v.safeParse(MonthIsoId, value).success).toEqual(true);
    }
  });

  test("rejects prefix", () => {
    expect(() => v.parse(MonthIsoId, "prefix2000-01")).toThrow("month.iso.id.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(MonthIsoId, "2000-01suffix")).toThrow("month.iso.id.bad.chars");
  });

  test("rejects empty", () => {
    expect(() => v.parse(MonthIsoId, "")).toThrow("month.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(MonthIsoId, null)).toThrow("month.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(MonthIsoId, 123)).toThrow("month.iso.id.type");
  });

  test("rejects months < 1 and > 12", () => {
    expect(() => v.parse(MonthIsoId, "2023-00")).toThrow("month.iso.id.invalid");
    expect(() => v.parse(MonthIsoId, "2023-13")).toThrow("month.iso.id.invalid");
  });

  test("rejects structurally invalid strings", () => {
    const invalid = ["2023-1", "2023/01", "23-01"];
    for (const value of invalid) {
      expect(() => v.parse(MonthIsoId, value)).toThrow("month.iso.id.bad.chars");
    }
  });
});
