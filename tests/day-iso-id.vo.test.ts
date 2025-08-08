import { describe, expect, test } from "bun:test";
import { DayIsoId } from "../src/day-iso-id.vo";

describe("DayIsoId VO", () => {
  test("accepts a normal mid-year day", () => {
    expect(DayIsoId.safeParse("2025-07-15").success).toBe(true);
  });

  test("accepts leap day in a leap year", () => {
    expect(DayIsoId.safeParse("2024-02-29").success).toBe(true);
  });

  test("rejects strings that don’t match YYYY-MM-DD", () => {
    expect(DayIsoId.safeParse("2025-7-15").success).toBe(false); // missing zero-pad
    expect(DayIsoId.safeParse("25-07-15").success).toBe(false); // 2-digit year
    expect(DayIsoId.safeParse("2025/07/15").success).toBe(false); // wrong separator
    expect(DayIsoId.safeParse("20250715").success).toBe(false); // no separator
  });

  test("rejects impossible calendar dates", () => {
    expect(DayIsoId.safeParse("2025-02-30").success).toBe(false); // Feb 30th
    expect(DayIsoId.safeParse("2025-13-01").success).toBe(false); // month 13
    expect(DayIsoId.safeParse("2025-00-10").success).toBe(false); // month 00
    expect(DayIsoId.safeParse("2025-04-31").success).toBe(false); // April has 30 days
    expect(DayIsoId.safeParse("2025-02-29").success).toBe(false); // 2025 isn’t leap year
  });
});
