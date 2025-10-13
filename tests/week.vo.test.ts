import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";
import { WeekIsoId } from "../src/week-iso-id.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis
const timestamp = toMs("2025-07-22T12:00:00Z"); // Tuesday

describe("Week", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const week = Week.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    expect(week.getStart()).toEqual(expectedStart);
    expect(week.getEnd()).toEqual(expectedEnd);
    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2025-W30"));
    expect(week.contains(timestamp)).toEqual(true);
  });

  test("correctly handles a date where ISO week spills into the next calendar year", () => {
    const ts = toMs("2025-12-31T23:59:59Z"); // Wednesday
    const week = Week.fromTimestamp(ts);

    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2026-W01"));
    expect(week.getStart()).toEqual(Timestamp.parse(startOfISOWeek(ts).getTime()));
    expect(week.getEnd()).toEqual(Timestamp.parse(endOfISOWeek(ts).getTime()));
  });

  test("next", () => {
    expect(Week.fromTimestamp(timestamp).next().toIsoId()).toEqual(WeekIsoId.parse("2025-W31"));
  });

  test("previous", () => {
    expect(Week.fromTimestamp(timestamp).previous().toIsoId()).toEqual(WeekIsoId.parse("2025-W29"));
  });

  test("shift", () => {
    expect(Week.fromTimestamp(timestamp).shift(2).toIsoId()).toEqual(WeekIsoId.parse("2025-W32"));
    expect(Week.fromTimestamp(timestamp).shift(-2).toIsoId()).toEqual(WeekIsoId.parse("2025-W28"));
  });

  test("round-trips via ISO id", () => {
    const id = WeekIsoId.parse("2026-W01");
    const week = Week.fromIsoId(id);
    expect(week.toIsoId()).toEqual(id);
  });

  test("fromNow", () => {
    const now = Timestamp.parse(Date.now());
    const weekA = Week.fromTimestamp(now);
    const weekB = Week.fromNow(now);
    expect(weekB.equals(weekA)).toEqual(true);
  });

  test("contains() returns false for timestamps outside the week", () => {
    const ts = toMs("2025-07-22T12:00:00Z");
    const week = Week.fromTimestamp(ts);
    expect(week.contains(Timestamp.parse(week.getStart() - 1))).toEqual(false);
    expect(week.contains(Timestamp.parse(week.getEnd() + 1))).toEqual(false);
  });
});
