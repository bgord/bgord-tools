import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";
import { WeekIsoId } from "../src/week-iso-id.vo";

const toMs = (date: string) => Timestamp.parse(Date.parse(date));
const timestamp = toMs("2025-07-22T12:00:00Z"); // Tuesday

describe("Week", () => {
  test("happy path", () => {
    const week = Week.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfISOWeek(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfISOWeek(timestamp).getTime());

    expect(week.getStart()).toEqual(expectedStart);
    expect(week.getEnd()).toEqual(expectedEnd);
    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2025-W30"));
    expect(week.contains(timestamp)).toEqual(true);
  });

  test("happy path - ISO week spills into the next year", () => {
    const ts = toMs("2025-12-31T23:59:59Z"); // Wednesday
    const week = Week.fromTimestamp(ts);

    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2026-W01"));
    expect(week.getStart()).toEqual(Timestamp.parse(startOfISOWeek(ts).getTime()));
    expect(week.getEnd()).toEqual(Timestamp.parse(endOfISOWeek(ts).getTime()));
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);
    expect(Week.fromNow(timestamp).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("fromTimestamp", () => {
    const timestamp = Timestamp.parse(1700000000000);
    expect(Week.fromTimestamp(timestamp).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("fromIsoId", () => {
    expect(Week.fromIsoId(WeekIsoId.parse("2023-W46")).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
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

  test("round-trips", () => {
    const id = WeekIsoId.parse("2026-W01");
    const week = Week.fromIsoId(id);
    expect(week.toIsoId()).toEqual(id);
  });

  test("contains", () => {
    const ts = toMs("2025-07-22T12:00:00Z");
    const week = Week.fromTimestamp(ts);
    expect(week.contains(Timestamp.parse(week.getStart() - 1))).toEqual(false);
    expect(week.contains(Timestamp.parse(week.getEnd() + 1))).toEqual(false);
  });

  test("toString", () => {
    expect(Week.fromIsoId(WeekIsoId.parse("2023-W46")).toString()).toEqual("2023-W46");
  });

  test("toJSON", () => {
    expect(Week.fromIsoId(WeekIsoId.parse("2023-W46")).toJSON()).toEqual({
      start: 1699833600000,
      end: 1700438399999,
    });
  });
});
