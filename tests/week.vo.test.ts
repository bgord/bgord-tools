import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis

const timestamp = toMs("2025-07-22T12:00:00Z"); // Tuesday

describe("Week VO", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const week = Week.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    expect(week.getStart()).toBe(expectedStart);
    expect(week.getEnd()).toBe(expectedEnd);
    expect(week.toIsoId()).toBe("2025-W30");

    expect(week.contains(timestamp)).toBe(true);
  });

  test("correctly handles a date where ISO week spills into the next calendar year", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z"); // Wednesday
    const week = Week.fromTimestamp(timestamp);

    expect(week.toIsoId()).toBe("2026-W01");

    expect(week.getStart()).toBe(Timestamp.parse(startOfISOWeek(timestamp).getTime()));
    expect(week.getEnd()).toBe(Timestamp.parse(endOfISOWeek(timestamp).getTime()));
  });

  test("next", () => {
    expect(Week.fromTimestamp(timestamp).next().toIsoId()).toBe("2025-W31");
  });

  test("previous", () => {
    expect(Week.fromTimestamp(timestamp).previous().toIsoId()).toBe("2025-W29");
  });

  test("shift", () => {
    expect(Week.fromTimestamp(timestamp).shift(2).toIsoId()).toBe("2025-W32");
    expect(Week.fromTimestamp(timestamp).shift(-2).toIsoId()).toBe("2025-W28");
  });

  test("round-trips via ISO id", () => {
    const id = "2026-W01";
    const week = Week.fromIsoId(id);

    expect(week.toIsoId()).toBe(id);
  });

  test("fromNow", () => {
    const now = Timestamp.parse(Date.now());
    const weekA = Week.fromTimestamp(now);
    const weekB = Week.fromNow(now);

    expect(weekB.equals(weekA)).toBe(true);
  });

  test("contains() returns false for timestamps outside the week", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const week = Week.fromTimestamp(timestamp);

    expect(week.contains(Timestamp.parse(week.getStart() - 1))).toBe(false);
    expect(week.contains(Timestamp.parse(week.getEnd() + 1))).toBe(false);
  });
});
