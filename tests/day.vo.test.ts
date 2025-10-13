import { describe, expect, test } from "bun:test";
import { Day } from "../src/day.vo";
import { DayIsoId } from "../src/day-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Day", () => {
  test("happy path", () => {
    const day = Day.fromTimestamp(timestamp);

    const date = new Date(timestamp);
    const expectedStart = Timestamp.parse(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const expectedEnd = Timestamp.parse(expectedStart + 86_400_000 - 1);

    expect(day.getStart()).toEqual(expectedStart);
    expect(day.getEnd()).toEqual(expectedEnd);
    expect(day.toIsoId()).toEqual(DayIsoId.parse("2025-07-22"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("leap-day", () => {
    const timestamp = toMs("2024-02-29T15:30:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toEqual(DayIsoId.parse("2024-02-29"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);
    expect(Day.fromNow(timestamp).toIsoId()).toEqual(DayIsoId.parse("2023-11-14"));
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);
    expect(Day.fromTimestamp(timestamp).toIsoId()).toEqual(DayIsoId.parse("2023-11-14"));
  });

  test("fromIsoId", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2023-11-14")).toIsoId()).toEqual(DayIsoId.parse("2023-11-14"));
  });

  test("equals", () => {
    const now = Timestamp.parse(Date.now());
    const dayA = Day.fromTimestamp(now);
    const dayB = Day.fromNow(now);

    expect(dayB.equals(dayA)).toEqual(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(timestamp).next().toIsoId()).toEqual(DayIsoId.parse("2025-07-23"));
  });

  test("previous", () => {
    expect(Day.fromTimestamp(timestamp).previous().toIsoId()).toEqual(DayIsoId.parse("2025-07-21"));
  });

  test("shift", () => {
    expect(Day.fromTimestamp(timestamp).shift(2).toIsoId()).toEqual(DayIsoId.parse("2025-07-24"));
    expect(Day.fromTimestamp(timestamp).shift(-2).toIsoId()).toEqual(DayIsoId.parse("2025-07-20"));
  });

  test("round-trips", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2025-12-31")).toIsoId()).toEqual(DayIsoId.parse("2025-12-31"));
  });

  test("contains", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.contains(Timestamp.parse(day.getStart() - 1))).toEqual(false);
    expect(day.contains(Timestamp.parse(day.getEnd() + 1))).toEqual(false);
  });

  test("toString", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2023-11-14")).toString()).toEqual("2023-11-14");
  });

  test("toJSON", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2023-11-14")).toJSON()).toEqual({
      start: 1699920000000,
      end: 1700006399999,
    });
  });
});
