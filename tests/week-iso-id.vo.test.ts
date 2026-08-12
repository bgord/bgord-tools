import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { WeekIsoId } from "../src/week-iso-id.vo";

describe("WeekIsoId", () => {
  test("happy path", () => {
    expect(v.safeParse(WeekIsoId, "2025-W30").success).toEqual(true);
    expect(v.safeParse(WeekIsoId, "2026-W01").success).toEqual(true);
    expect(v.safeParse(WeekIsoId, "2020-W53").success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => v.parse(WeekIsoId, "prefix2025-W01")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(WeekIsoId, "2025-W01suffix")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects empty", () => {
    expect(() => v.parse(WeekIsoId, "")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(WeekIsoId, null)).toThrow("week.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(WeekIsoId, 123)).toThrow("week.iso.id.type");
  });

  test("rejects strings not matching the format", () => {
    expect(() => v.parse(WeekIsoId, "2025-30")).toThrow("week.iso.id.bad.chars");
    expect(() => v.parse(WeekIsoId, "25-W30")).toThrow("week.iso.id.bad.chars");
    expect(() => v.parse(WeekIsoId, "2025-W3")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects week numbers < 1 or > 53", () => {
    expect(() => v.parse(WeekIsoId, "2025-W00")).toThrow("week.iso.id.bad.chars");
    expect(() => v.parse(WeekIsoId, "2025-W54")).toThrow("week.iso.id.bad.chars");
  });

  test("rejects week 53 in a year that only has 52 ISO weeks", () => {
    expect(() => v.parse(WeekIsoId, "2021-W53")).toThrow("week.iso.id.invalid");
  });
});
