import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Day } from "../src/day.vo";
import { DayIsoId } from "../src/day-iso-id.vo";
import { Duration } from "../src/duration.service";
import { Int } from "../src/int.vo";
import { Temporal } from "../src/temporal";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

const start = 1699920000000;
const end = 1700006399999;

const dayIsoId = v.parse(DayIsoId, mocks.TIME_ZERO_PLAIN_DATE);

describe("Day", () => {
  test("happy path", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    expect(day.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(day.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(day.toIsoId()).toEqual(dayIsoId);
    expect(day.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("fromTimestamp", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(dayIsoId);
  });

  test("fromTimestampValue", () => {
    expect(Day.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(dayIsoId);
  });

  test("fromNow", () => {
    expect(Day.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(dayIsoId);
  });

  test("fromIsoId", () => {
    expect(Day.fromIsoId(dayIsoId).toIsoId()).toEqual(dayIsoId);
  });

  test("leap-day", () => {
    const timestamp = Timestamp.fromString("2024-02-29T00:00:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toEqual(v.parse(DayIsoId, "2024-02-29"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("equals", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);
    const now = Day.fromNow(Timestamp.fromInstant(Temporal.Now.instant()));

    expect(day.equals(now)).toEqual(false);
    expect(day.equals(day)).toEqual(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(v.parse(DayIsoId, "2023-11-15"));
  });

  test("previous", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(v.parse(DayIsoId, "2023-11-13"));
  });

  test("shift", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(2)).toIsoId()).toEqual(
      v.parse(DayIsoId, "2023-11-16"),
    );
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(-2)).toIsoId()).toEqual(
      v.parse(DayIsoId, "2023-11-12"),
    );
  });

  test("round-trips", () => {
    expect(Day.fromIsoId(dayIsoId).toIsoId()).toEqual(dayIsoId);
  });

  test("contains", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    expect(day.contains(day.getStart().subtract(Duration.MIN))).toEqual(false);
    expect(day.contains(day.getEnd().add(Duration.MIN))).toEqual(false);
  });

  test("toString", () => {
    expect(Day.fromIsoId(dayIsoId).toString()).toEqual(mocks.TIME_ZERO_PLAIN_DATE);
  });

  test("toJSON", () => {
    expect(Day.fromIsoId(dayIsoId).toJSON()).toEqual({ start, end });
  });
});
