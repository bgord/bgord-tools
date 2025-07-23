import { describe, expect, test } from "bun:test";
import { WeekIsoId } from "../src//week-iso-id.vo";

describe("WeekIsoId VO", () => {
  test("accepts a normal mid-year week", () => {
    expect(WeekIsoId.safeParse("2025-W30").success).toBe(true);
  });

  test("accepts week 01 (may start in Dec of prev calendar year)", () => {
    expect(WeekIsoId.safeParse("2026-W01").success).toBe(true);
  });

  test("accepts week 53 when the ISO week-year really has 53 weeks (e.g. 2020)", () => {
    expect(WeekIsoId.safeParse("2020-W53").success).toBe(true);
  });

  test("rejects strings that don’t match YYYY-Www", () => {
    expect(WeekIsoId.safeParse("2025-30").success).toBe(false);
    expect(WeekIsoId.safeParse("25-W30").success).toBe(false);
    expect(WeekIsoId.safeParse("2025-W3").success).toBe(false);
  });

  test("rejects week numbers < 1 or > 53", () => {
    expect(WeekIsoId.safeParse("2025-W00").success).toBe(false);
    expect(WeekIsoId.safeParse("2025-W54").success).toBe(false);
  });

  test("rejects week 53 in a year that only has 52 ISO weeks (e.g. 2021)", () => {
    expect(WeekIsoId.safeParse("2021-W53").success).toBe(false);
  });
});
