import { describe, expect, test } from "bun:test";
import { WeekIsoId, WeekIsoIdError } from "../src/week-iso-id.vo";

describe("WeekIsoId", () => {
  test("accepts a normal mid-year week", () => {
    expect(WeekIsoId.safeParse("2025-W30").success).toEqual(true);
  });

  test("accepts week 01 (may start in Dec of prev calendar year)", () => {
    expect(WeekIsoId.safeParse("2026-W01").success).toEqual(true);
  });

  test("accepts week 53 when the ISO week-year really has 53 weeks", () => {
    expect(WeekIsoId.safeParse("2020-W53").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => WeekIsoId.parse("")).toThrow(WeekIsoIdError.BadChars);
  });

  test("rejects non-string null", () => {
    expect(() => WeekIsoId.parse(null)).toThrow(WeekIsoIdError.Type);
  });

  test("rejects non-string number", () => {
    expect(() => WeekIsoId.parse(123)).toThrow(WeekIsoIdError.Type);
  });

  test("rejects strings not matching the format", () => {
    expect(() => WeekIsoId.parse("2025-30")).toThrow(WeekIsoIdError.BadChars);
    expect(() => WeekIsoId.parse("25-W30")).toThrow(WeekIsoIdError.BadChars);
    expect(() => WeekIsoId.parse("2025-W3")).toThrow(WeekIsoIdError.BadChars);
  });

  test("rejects week numbers < 1 or > 53", () => {
    expect(() => WeekIsoId.parse("2025-W00")).toThrow(WeekIsoIdError.Invalid);
    expect(() => WeekIsoId.parse("2025-W54")).toThrow(WeekIsoIdError.Invalid);
  });

  test("rejects week 53 in a year that only has 52 ISO weeks", () => {
    expect(() => WeekIsoId.parse("2021-W53")).toThrow(WeekIsoIdError.Invalid);
  });
});
