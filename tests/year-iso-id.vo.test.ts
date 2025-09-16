import { describe, expect, test } from "bun:test";
import { YearIsoId } from "../src/year-iso-id.vo";

describe("YearIsoId", () => {
  test("accepts 4-digit years", () => {
    const years = ["0000", "1970", "1999", "2024", "2025", "9999"];
    for (const year of years) expect(YearIsoId.safeParse(year).success).toBe(true);
  });

  test('rejects non-4-digit or malformed values ("year-iso-id.invalid")', () => {
    const years = ["", "1", "20", "202", "20251", "202A", " 2025", "2025 ", "2025-01"];
    for (const year of years) expect(YearIsoId.safeParse(year).success).toBe(false);
  });
});
