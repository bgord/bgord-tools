import { describe, expect, test } from "bun:test";
import { endOfDay, startOfDay } from "date-fns";
import { Day } from "../src/day.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis

describe("Day VO", () => {
  /* ────────────────────────────────────────────────────────────
   * 1. Mid-year date – Tue 22 Jul 2025 => 2025-07-22
   * ────────────────────────────────────────────────────────── */
  test("creates the correct range & ISO id from a mid-day timestamp", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const day = Day.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfDay(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfDay(timestamp).getTime());

    expect(day.getStart()).toBe(expectedStart);
    expect(day.getEnd()).toBe(expectedEnd);
    expect(day.toIsoId()).toBe("2025-07-22");

    expect(day.contains(timestamp)).toBe(true);
  });

  /* ────────────────────────────────────────────────────────────
   * 2. Leap-day – Fri 29 Feb 2024 => 2024-02-29
   * ────────────────────────────────────────────────────────── */
  test("handles leap-day correctly", () => {
    const timestamp = toMs("2024-02-29T15:30:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toBe("2024-02-29");
    expect(day.contains(timestamp)).toBe(true);
  });

  /* ────────────────────────────────────────────────────────────
   * 3. Round-trip via ISO id
   * ────────────────────────────────────────────────────────── */
  test("round-trips ISO id → Day → ISO id", () => {
    const id = "2025-12-31";
    expect(Day.fromIsoId(id).toIsoId()).toBe(id);
  });

  /* ────────────────────────────────────────────────────────────
   * 4. fromNow() matches fromTimestamp(Date.now())
   * ────────────────────────────────────────────────────────── */
  test("fromNow() produces the same Day as fromTimestamp(Date.now())", () => {
    const now = Timestamp.parse(Date.now());
    const dayA = Day.fromTimestamp(now);
    const dayB = Day.fromNow(now);

    expect(dayB.equals(dayA)).toBe(true);
  });

  /* ────────────────────────────────────────────────────────────
   * 5. contains() returns false for values outside the range
   * ────────────────────────────────────────────────────────── */
  test("contains() returns false for timestamps outside the day", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.contains(Timestamp.parse(day.getStart() - 1))).toBe(false);
    expect(day.contains(Timestamp.parse(day.getEnd() + 1))).toBe(false);
  });
});
