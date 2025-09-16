import { describe, expect, test } from "bun:test";
import { MonthIsoId } from "../src/month-iso-id.vo";

describe("MonthIsoId", () => {
  test("accepts valid YYYY-MM values", () => {
    const months = ["0000-01", "1970-01", "1999-12", "2024-02", "2025-10", "9999-12"];

    for (const month of months) {
      expect(MonthIsoId.safeParse(month).success).toBe(true);
    }
  });

  test("rejects structurally invalid strings (regex mismatch)", () => {
    const invalidFormat = [
      "2023-1",
      "2023/01",
      "23-01",
      "2023-001",
      "2023-0x",
      " 2023-01",
      "2023-01 ",
      "2023- 01",
      "202301",
      "2023--01",
      "10000-01",
      "",
    ];

    for (const sample of invalidFormat) {
      expect(MonthIsoId.safeParse(sample).success).toBe(false);
    }
  });

  test("rejects semantically invalid months but matching the regex", () => {
    const months = ["2023-00", "2023-13"];

    for (const month of months) {
      expect(MonthIsoId.safeParse(month).success).toBe(false);
    }
  });
});
