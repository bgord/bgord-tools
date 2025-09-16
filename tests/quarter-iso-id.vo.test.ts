import { describe, expect, test } from "bun:test";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";

describe("QuarterIsoId", () => {
  test("accepts valid YYYY-Qn values", () => {
    const quarters = ["0000-Q1", "1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "9999-Q4"];
    for (const quarter of quarters) expect(QuarterIsoId.safeParse(quarter).success).toBe(true);
  });

  test('rejects values outside 1..4 with message "quarter-iso-id.invalid"', () => {
    const quarters = ["2025-Q0", "2025-Q5"];
    for (const quarter of quarters) expect(QuarterIsoId.safeParse(quarter).success).toBe(false);
  });

  test("rejects structurally invalid strings", () => {
    const quarters = [
      "2025Q1",
      "2025-Q",
      "2025-Q11",
      "25-Q1",
      "2025-q1",
      "2025- Q1",
      " 2025-Q1",
      "2025-Q1 ",
      "2025-QA",
      "2025-01",
      "",
    ];
    for (const quarter of quarters) expect(QuarterIsoId.safeParse(quarter).success).toBe(false);
  });
});
