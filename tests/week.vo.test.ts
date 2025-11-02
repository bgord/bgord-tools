import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import { Duration } from "../src/duration.service";
import { TimestampVO } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";
import { WeekIsoId } from "../src/week-iso-id.vo";
import * as mocks from "./mocks";

describe("Week", () => {
  test("happy path", () => {
    const week = Week.fromTimestamp(mocks.TIME_ZERO);

    const expectedStart = TimestampVO.fromNumber(startOfISOWeek(mocks.TIME_ZERO.ms).getTime());
    const expectedEnd = TimestampVO.fromNumber(endOfISOWeek(mocks.TIME_ZERO.ms).getTime());

    expect(week.getStart()).toEqual(expectedStart);
    expect(week.getEnd()).toEqual(expectedEnd);
    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
    expect(week.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - ISO week spills into the next year", () => {
    const timestamp = mocks.toTimestamp("2025-12-31T23:59:59Z");
    const week = Week.fromTimestamp(timestamp);

    expect(week.toIsoId()).toEqual(WeekIsoId.parse("2026-W01"));
    expect(week.getStart()).toEqual(TimestampVO.fromNumber(startOfISOWeek(timestamp.ms).getTime()));
    expect(week.getEnd()).toEqual(TimestampVO.fromNumber(endOfISOWeek(timestamp.ms).getTime()));
  });

  test("fromNow", () => {
    expect(Week.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("fromTimestamp", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("fromTimestampValue", () => {
    expect(Week.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("fromIsoId", () => {
    expect(Week.fromIsoId(WeekIsoId.parse("2023-W46")).toIsoId()).toEqual(WeekIsoId.parse("2023-W46"));
  });

  test("next", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(WeekIsoId.parse("2023-W47"));
  });

  test("previous", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(WeekIsoId.parse("2023-W45"));
  });

  test("shift", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).shift(2).toIsoId()).toEqual(WeekIsoId.parse("2023-W48"));
    expect(Week.fromTimestamp(mocks.TIME_ZERO).shift(-2).toIsoId()).toEqual(WeekIsoId.parse("2023-W44"));
  });

  test("round-trips", () => {
    expect(Week.fromIsoId(WeekIsoId.parse("2026-W01")).toIsoId()).toEqual(WeekIsoId.parse("2026-W01"));
  });

  test("contains", () => {
    const week = Week.fromTimestamp(mocks.TIME_ZERO);

    expect(week.contains(week.getStart().subtract(Duration.Ms(1)))).toEqual(false);
    expect(week.contains(week.getEnd().add(Duration.Ms(1)))).toEqual(false);
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
