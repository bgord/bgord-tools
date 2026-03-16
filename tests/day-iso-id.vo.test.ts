import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DayIsoId } from "../src/day-iso-id.vo";

describe("DayIsoId", () => {
  test("happy path", () => {
    expect(v.safeParse(DayIsoId, "2025-07-15").success).toEqual(true);
    expect(v.safeParse(DayIsoId, "2024-02-29").success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => v.parse(DayIsoId, "prefix2025-07-15")).toThrow("day.iso.id.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(DayIsoId, "2025-07-15suffix")).toThrow("day.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(DayIsoId, null)).toThrow("day.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(DayIsoId, 2024)).toThrow("day.iso.id.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(DayIsoId, "")).toThrow("day.iso.id.bad.chars");
  });

  test("rejects strings that don't match YYYY-MM-DD", () => {
    const invalid = ["2025-7-15", "25-07-15", "2025/07/15", "20250715"];
    for (const value of invalid) {
      expect(() => v.parse(DayIsoId, value)).toThrow("day.iso.id.bad.chars");
    }
  });

  test("rejects impossible calendar dates", () => {
    const invalid = ["2025-02-30", "2025-13-01", "2025-00-10", "2025-04-31", "2025-02-29"];
    for (const value of invalid) {
      expect(() => v.parse(DayIsoId, value)).toThrow("day.iso.id.invalid.date");
    }
  });
});
