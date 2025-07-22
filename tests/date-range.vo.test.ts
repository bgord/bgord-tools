import { describe, expect, test } from "bun:test";
import { DateRange } from "../src/date-range.vo";
import { Timestamp } from "../src/timestamp.vo";

/**
 * Fixed epoch values keep the tests deterministic and easy to read.
 */
const START = Timestamp.parse(1_700_000_000_000); // ≈ 2023-11-14T06:40:00Z
const END = Timestamp.parse(START + 1_000); // 1 second later

const range = new DateRange(START, END);

describe("DateRange", () => {
  /* ───────────────────────── constructor ───────────────────────── */

  test("throws when start > end", () => {
    expect(() => new DateRange(END, START)).toThrow("Invalid date range");
  });

  /* ───────────────────────── accessors ─────────────────────────── */

  test("returns the exact start timestamp", () => {
    expect(range.getStart()).toBe(START);
  });

  test("returns the exact end timestamp", () => {
    expect(range.getEnd()).toBe(END);
  });

  test("returns a tuple [start, end] via toRange()", () => {
    expect(range.toRange()).toEqual([START, END]);
  });

  /* ───────────────────────── contains() ────────────────────────── */

  test("contains the start, an inner point and the end", () => {
    expect(range.contains(START)).toBe(true);
    expect(range.contains(Timestamp.parse(START + 500))).toBe(true);
    expect(range.contains(END)).toBe(true);
  });

  test("does NOT contain values outside the range", () => {
    expect(range.contains(Timestamp.parse(START - 1))).toBe(false);
    expect(range.contains(Timestamp.parse(END + 1))).toBe(false);
  });

  /* ───────────────────────── equals() ──────────────────────────── */

  test("equals another DateRange with identical boundaries", () => {
    const same = new DateRange(START, END);
    expect(range.equals(same)).toBe(true);
  });

  test("does NOT equal a DateRange with different boundaries", () => {
    const different = new DateRange(START, Timestamp.parse(END + 1_000));
    expect(range.equals(different)).toBe(false);
  });
});
