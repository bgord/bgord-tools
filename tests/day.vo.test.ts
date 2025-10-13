import { describe, expect, test } from "bun:test";
import { Day } from "../src/day.vo";
import { DayIsoId } from "../src/day-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

describe("Day", () => {
  test("happy path", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    const date = new Date(mocks.TIME_ZERO);
    const expectedStart = Timestamp.parse(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const expectedEnd = Timestamp.parse(expectedStart + 86_400_000 - 1);

    expect(day.getStart()).toEqual(expectedStart);
    expect(day.getEnd()).toEqual(expectedEnd);
    expect(day.toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE));
    expect(day.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("leap-day", () => {
    const timestamp = mocks.toTimestamp("2024-02-29");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toEqual(DayIsoId.parse("2024-02-29"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("fromNow", () => {
    expect(Day.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE));
  });

  test("fromNow", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE));
  });

  test("fromIsoId", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE)).toIsoId()).toEqual(
      DayIsoId.parse(mocks.TIME_ZERO_DATE),
    );
  });

  test("equals", () => {
    const now = Timestamp.parse(Date.now());
    const dayA = Day.fromTimestamp(now);
    const dayB = Day.fromNow(now);

    expect(dayB.equals(dayA)).toEqual(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(DayIsoId.parse("2023-11-15"));
  });

  test("previous", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(DayIsoId.parse("2023-11-13"));
  });

  test("shift", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(2).toIsoId()).toEqual(DayIsoId.parse("2023-11-16"));
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(-2).toIsoId()).toEqual(DayIsoId.parse("2023-11-12"));
  });

  test("round-trips", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2025-12-31")).toIsoId()).toEqual(DayIsoId.parse("2025-12-31"));
  });

  test("contains", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    expect(day.contains(Timestamp.parse(day.getStart() - 1))).toEqual(false);
    expect(day.contains(Timestamp.parse(day.getEnd() + 1))).toEqual(false);
  });

  test("toString", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE)).toString()).toEqual(mocks.TIME_ZERO_DATE);
  });

  test("toJSON", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE)).toJSON()).toEqual({
      start: 1699920000000,
      end: 1700006399999,
    });
  });
});
