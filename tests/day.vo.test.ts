import { describe, expect, test } from "bun:test";
import { Day } from "../src/day.vo";
import { DayIsoId } from "../src/day-iso-id.vo";
import { Duration } from "../src/duration.service";
import { Integer } from "../src/integer.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

const start = Timestamp.fromNumber(
  Date.UTC(
    mocks.TIME_ZERO_DATE.getUTCFullYear(),
    mocks.TIME_ZERO_DATE.getUTCMonth(),
    mocks.TIME_ZERO_DATE.getUTCDate(),
  ),
);
const end = start.add(Duration.Days(1)).subtract(mocks.epsilon);

describe("Day", () => {
  test("happy path", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    expect(day.getStart()).toEqual(start);
    expect(day.getEnd()).toEqual(end);
    expect(day.toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE));
    expect(day.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("fromTimestamp", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE));
  });

  test("fromTimestampValue", () => {
    expect(Day.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(
      DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE),
    );
  });

  test("fromNow", () => {
    expect(Day.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE));
  });

  test("fromIsoId", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE)).toIsoId()).toEqual(
      DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE),
    );
  });

  test("leap-day", () => {
    const timestamp = Timestamp.fromDateLike("2024-02-29");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toEqual(DayIsoId.parse("2024-02-29"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("equals", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);
    const now = Day.fromNow(Timestamp.fromNumber(Date.now()));

    expect(day.equals(now)).toEqual(false);
    expect(day.equals(day)).toEqual(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(DayIsoId.parse("2023-11-15"));
  });

  test("previous", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(DayIsoId.parse("2023-11-13"));
  });

  test("shift", () => {
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(2)).toIsoId()).toEqual(
      DayIsoId.parse("2023-11-16"),
    );
    expect(Day.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(-2)).toIsoId()).toEqual(
      DayIsoId.parse("2023-11-12"),
    );
  });

  test("round-trips", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2025-12-31")).toIsoId()).toEqual(DayIsoId.parse("2025-12-31"));
  });

  test("contains", () => {
    const day = Day.fromTimestamp(mocks.TIME_ZERO);

    expect(day.contains(day.getStart().subtract(mocks.epsilon))).toEqual(false);
    expect(day.contains(day.getEnd().add(mocks.epsilon))).toEqual(false);
  });

  test("toString", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE)).toString()).toEqual(
      mocks.TIME_ZERO_DATE_LIKE,
    );
  });

  test("toJSON", () => {
    expect(Day.fromIsoId(DayIsoId.parse(mocks.TIME_ZERO_DATE_LIKE)).toJSON()).toEqual({
      start: 1699920000000,
      end: 1700006399999,
    });
  });
});
