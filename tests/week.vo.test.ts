import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis

describe("Week VO", () => {
  /* ────────────────────────────────────────────────────────────
   * 1. Mid-year date – Tue 22 Jul 2025 should be week 30/2025
   * ────────────────────────────────────────────────────────── */
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z"); // Tuesday
    const week = Week.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    expect(week.getStart()).toBe(expectedStart);
    expect(week.getEnd()).toBe(expectedEnd);
    expect(week.toIsoId()).toBe("2025-W30");

    expect(week.contains(timestamp)).toBe(true);
  });

  /* ────────────────────────────────────────────────────────────
   * 2. Year-crossing date – Wed 31 Dec 2025 belongs to week 01/2026
   * ────────────────────────────────────────────────────────── */
  test("correctly handles a date where ISO week spills into the next calendar year", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z"); // Wednesday
    const week = Week.fromTimestamp(timestamp);

    expect(week.toIsoId()).toBe("2026-W01");

    expect(week.getStart()).toBe(Timestamp.parse(startOfISOWeek(timestamp).getTime()));
    expect(week.getEnd()).toBe(Timestamp.parse(endOfISOWeek(timestamp).getTime()));
  });

  test("round-trips via ISO id", () => {
    const id = "2026-W01";
    const week = Week.fromIsoId(id);

    expect(week.toIsoId()).toBe(id);
  });

  test("fromNow() produces the same week as fromTimestamp(Date.now())", () => {
    const now = Timestamp.parse(Date.now());
    const weekA = Week.fromTimestamp(now);
    const weekB = Week.fromNow(now);

    expect(weekB.equals(weekA)).toBe(true);
  });

  /* ────────────────────────────────────────────────────────────
   * 5. contains() returns false for values outside the range
   * ────────────────────────────────────────────────────────── */
  test("contains() returns false for timestamps outside the week", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const week = Week.fromTimestamp(timestamp);

    expect(week.contains(Timestamp.parse(week.getStart() - 1))).toBe(false);
    expect(week.contains(Timestamp.parse(week.getEnd() + 1))).toBe(false);
  });
});
