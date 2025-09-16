import { describe, expect, test } from "bun:test";
import { endOfYear, startOfYear } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId } from "../src/year-iso-id.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → ms (UTC)

describe("Year VO", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toBe(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toBe(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toBe("2025");
    expect(year.contains(timestamp)).toBe(true);
  });

  test("handles a timestamp near year boundary in UTC", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z"); // still 2025 in UTC
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toBe(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toBe(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toBe("2025");
  });

  test("round-trips via ISO id", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"] as const; // keep 0000 out to avoid JS Date quirks
    for (const id of ids) {
      const parsed = YearIsoId.parse(id);
      const year = Year.fromIsoId(parsed);
      expect(year.toIsoId()).toBe(id);
    }
  });

  test("fromNow equals fromTimestamp(now)", () => {
    const now = Timestamp.parse(Date.now());
    const a = Year.fromTimestamp(now);
    const b = Year.fromNow(now);
    expect(b.equals(a)).toBe(true);
  });

  test("contains() returns false for timestamps outside the year", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const year = Year.fromTimestamp(timestamp);
    expect(year.contains(Timestamp.parse(year.getStart() - 1))).toBe(false);
    expect(year.contains(Timestamp.parse(year.getEnd() + 1))).toBe(false);
  });
});
