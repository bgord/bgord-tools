import { describe, expect, test } from "bun:test";
import { endOfQuarter, startOfQuarter } from "date-fns";
import { Quarter } from "../src/quarter.vo";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Quarter", () => {
  test("creates the correct range & ISO id from a mid-quarter timestamp", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-08-15T12:00:00Z")); // Q3 2025
    const quarter = Quarter.fromTimestamp(timestamp);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(timestamp).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(timestamp).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2025-Q3"));
    expect(quarter.contains(timestamp)).toEqual(true);
  });

  test("handles a timestamp near year boundary in UTC", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-12-31T23:59:59Z")); // Q4 2025
    const quarter = Quarter.fromTimestamp(timestamp);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(timestamp).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(timestamp).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2025-Q4"));
  });

  test("round-trips via ISO id", () => {
    const ids = ["1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "2026-Q1"] as const;
    for (const id of ids) {
      expect(Quarter.fromIsoId(QuarterIsoId.parse(id)).toIsoId()).toEqual(QuarterIsoId.parse(id));
    }
  });

  test("fromNow equals fromTimestamp(now)", () => {
    const now = Timestamp.parse(Date.now());
    const a = Quarter.fromTimestamp(now);
    const b = Quarter.fromNow(now);
    expect(b.equals(a)).toEqual(true);
  });

  test("contains() returns false for timestamps outside the quarter", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-08-15T12:00:00Z")); // Q3 2025
    const quarter = Quarter.fromTimestamp(timestamp);
    expect(quarter.contains(Timestamp.parse(quarter.getStart() - 1))).toEqual(false);
    expect(quarter.contains(Timestamp.parse(quarter.getEnd() + 1))).toEqual(false);
  });
});
