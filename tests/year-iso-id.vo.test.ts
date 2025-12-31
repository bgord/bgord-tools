import { describe, expect, test } from "bun:test";
import { YearIsoId } from "../src/year-iso-id.vo";

describe("YearIsoId", () => {
  test("happy path", () => {
    const valid = ["0000", "1970", "1999", "2024", "2025", "9999"];

    for (const year of valid) {
      expect(YearIsoId.safeParse(year).success).toEqual(true);
    }
  });

  test("rejects non-string - null", () => {
    expect(() => YearIsoId.parse(null)).toThrow("year.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => YearIsoId.parse(123)).toThrow("year.iso.id.type");
  });

  test("rejects invalid year", () => {
    expect(() => YearIsoId.parse("202A")).toThrow("year.iso.id.bad.chars");
  });

  test("rejects 5 digits year", () => {
    expect(() => YearIsoId.parse("202A")).toThrow("year.iso.id.bad.chars");
  });
});
