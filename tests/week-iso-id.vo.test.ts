import { describe, expect, test } from "bun:test";
import { WeekIsoId } from "../src/week-iso-id.vo";

describe("WeekIsoId", () => {
  test("happy path", () => {
    expect(WeekIsoId.safeParse("2025-W30").success).toEqual(true);
    expect(WeekIsoId.safeParse("2026-W01").success).toEqual(true);
    expect(WeekIsoId.safeParse("2020-W53").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => WeekIsoId.parse("")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => WeekIsoId.parse(null)).toThrow("week.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => WeekIsoId.parse(123)).toThrow("week.iso.id.type");
  });

  test("rejects strings not matching the format", () => {
    expect(() => WeekIsoId.parse("2025-30")).toThrow("week.iso.id.bad.chars");
    expect(() => WeekIsoId.parse("25-W30")).toThrow("week.iso.id.bad.chars");
    expect(() => WeekIsoId.parse("2025-W3")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects week numbers < 1 or > 53", () => {
    expect(() => WeekIsoId.parse("2025-W00")).toThrow("week.iso.id.invalid");
    expect(() => WeekIsoId.parse("2025-W54")).toThrow("week.iso.id.invalid");
  });

  test("rejects week 53 in a year that only has 52 ISO weeks", () => {
    expect(() => WeekIsoId.parse("2021-W53")).toThrow("week.iso.id.invalid");
  });
});
