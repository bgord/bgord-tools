import { describe, expect, test } from "bun:test";
import { DayIsoId, DayIsoIdError } from "../src/day-iso-id.vo";

describe("DayIsoId", () => {
  test("happy path", () => {
    expect(DayIsoId.safeParse("2025-07-15").success).toEqual(true);
    expect(DayIsoId.safeParse("2024-02-29").success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => DayIsoId.parse(null)).toThrow(DayIsoIdError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => DayIsoId.parse(2024)).toThrow(DayIsoIdError.Type);
  });

  test("rejects empty", () => {
    expect(() => DayIsoId.parse("")).toThrow(DayIsoIdError.BadChars);
  });

  test("rejects strings that don’t match YYYY-MM-DD", () => {
    const invalid = ["2025-7-15", "25-07-15", "2025/07/15", "20250715"];

    for (const value in invalid) {
      expect(() => DayIsoId.parse(value)).toThrow(DayIsoIdError.BadChars);
    }
  });

  test("rejects impossible calendar dates", () => {
    const invalid = ["2025-02-30", "2025-13-01", "2025-00-10", "2025-04-31", "2025-02-29"];

    for (const value in invalid) {
      expect(() => DayIsoId.parse(value)).toThrow(DayIsoIdError.InvalidDate);
    }
  });
});
