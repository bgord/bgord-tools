import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { YearIsoId } from "../src/year-iso-id.vo";

describe("YearIsoId", () => {
  test("happy path", () => {
    const valid = ["0000", "1970", "1999", "2024", "2025", "9999"];

    for (const year of valid) {
      expect(v.safeParse(YearIsoId, year).success).toEqual(true);
    }
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(YearIsoId, null)).toThrow("year.iso.id.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(YearIsoId, 123)).toThrow("year.iso.id.type");
  });

  test("rejects invalid year", () => {
    expect(() => v.parse(YearIsoId, "202A")).toThrow("year.iso.id.bad.chars");
  });

  test("rejects 5 digits year", () => {
    expect(() => v.parse(YearIsoId, "202A")).toThrow("year.iso.id.bad.chars");
  });
});
