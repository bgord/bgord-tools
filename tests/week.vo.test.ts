import { describe, expect, test } from "bun:test";
import { endOfISOWeek, startOfISOWeek } from "date-fns";
import * as v from "valibot";
import { Duration } from "../src/duration.service";
import { Int } from "../src/int.vo";
import { Timestamp } from "../src/timestamp.vo";
import { Week } from "../src/week.vo";
import { WeekIsoId } from "../src/week-iso-id.vo";
import * as mocks from "./mocks";

const w46 = v.parse(WeekIsoId, "2023-W46");

describe("Week", () => {
  test("happy path", () => {
    const week = Week.fromTimestamp(mocks.TIME_ZERO);
    const expectedStart = Timestamp.fromNumber(startOfISOWeek(mocks.TIME_ZERO.ms).getTime());
    const expectedEnd = Timestamp.fromNumber(endOfISOWeek(mocks.TIME_ZERO.ms).getTime());

    expect(week.getStart()).toEqual(expectedStart);
    expect(week.getEnd()).toEqual(expectedEnd);
    expect(week.toIsoId()).toEqual(w46);
    expect(week.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - ISO week spills into the next year", () => {
    const timestamp = Timestamp.fromDateLike("2025-12-31T23:59:59Z");
    const week = Week.fromTimestamp(timestamp);

    expect(week.toIsoId()).toEqual(v.parse(WeekIsoId, "2026-W01"));
    expect(week.getStart()).toEqual(Timestamp.fromNumber(startOfISOWeek(timestamp.ms).getTime()));
    expect(week.getEnd()).toEqual(Timestamp.fromNumber(endOfISOWeek(timestamp.ms).getTime()));
  });

  test("fromNow", () => {
    expect(Week.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(w46);
  });

  test("fromTimestamp", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(w46);
  });

  test("fromTimestampValue", () => {
    expect(Week.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(w46);
  });

  test("fromIsoId", () => {
    expect(Week.fromIsoId(w46).toIsoId()).toEqual(w46);
  });

  test("next", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(v.parse(WeekIsoId, "2023-W47"));
  });

  test("previous", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(v.parse(WeekIsoId, "2023-W45"));
  });

  test("shift", () => {
    expect(Week.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(2)).toIsoId()).toEqual(
      v.parse(WeekIsoId, "2023-W48"),
    );
    expect(Week.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(-2)).toIsoId()).toEqual(
      v.parse(WeekIsoId, "2023-W44"),
    );
  });

  test("round-trips", () => {
    expect(Week.fromIsoId(w46).toIsoId()).toEqual(w46);
  });

  test("contains", () => {
    const week = Week.fromTimestamp(mocks.TIME_ZERO);

    expect(week.contains(week.getStart().subtract(Duration.Ms(1)))).toEqual(false);
    expect(week.contains(week.getEnd().add(Duration.Ms(1)))).toEqual(false);
  });

  test("toString", () => {
    expect(Week.fromIsoId(w46).toString()).toEqual(w46);
  });

  test("toJSON", () => {
    expect(Week.fromIsoId(w46).toJSON()).toEqual({ start: 1699833600000, end: 1700438399999 });
  });
});
