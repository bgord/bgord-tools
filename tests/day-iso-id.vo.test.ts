import { describe, expect, test } from "bun:test";
import { DayIsoId } from "../src/day-iso-id.vo";

describe("DayIsoId", () => {
  test("accepts a normal mid-year day", () => {
    expect(DayIsoId.safeParse("2025-07-15").success).toEqual(true);
  });

  test("accepts leap day in a leap year", () => {
    expect(DayIsoId.safeParse("2024-02-29").success).toEqual(true);
  });

  test("rejects strings that don’t match YYYY-MM-DD", () => {
    expect(DayIsoId.safeParse("2025-7-15").success).toEqual(false);
    expect(DayIsoId.safeParse("25-07-15").success).toEqual(false);
    expect(DayIsoId.safeParse("2025/07/15").success).toEqual(false);
    expect(DayIsoId.safeParse("20250715").success).toEqual(false);
  });

  test("rejects impossible calendar dates", () => {
    expect(DayIsoId.safeParse("2025-02-30").success).toEqual(false);
    expect(DayIsoId.safeParse("2025-13-01").success).toEqual(false);
    expect(DayIsoId.safeParse("2025-00-10").success).toEqual(false);
    expect(DayIsoId.safeParse("2025-04-31").success).toEqual(false);
    expect(DayIsoId.safeParse("2025-02-29").success).toEqual(false);
  });
});
