import { describe, expect, test } from "bun:test";
import { endOfMonth, startOfMonth } from "date-fns";
import { Duration } from "../src/duration.service";
import { Integer } from "../src/integer.vo";
import { Month } from "../src/month.vo";
import { MonthIsoId } from "../src/month-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

describe("Month", () => {
  test("happy path", () => {
    const month = Month.fromTimestamp(mocks.TIME_ZERO);

    expect(month.getStart()).toEqual(Timestamp.fromNumber(startOfMonth(mocks.TIME_ZERO.ms).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.fromNumber(endOfMonth(mocks.TIME_ZERO.ms).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
    expect(month.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = mocks.toTimestamp("2025-12-31");
    const month = Month.fromTimestamp(timestamp);

    expect(month.getStart()).toEqual(Timestamp.fromNumber(startOfMonth(timestamp.ms).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.fromNumber(endOfMonth(timestamp.ms).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2025-12"));
  });

  test("fromNow", () => {
    expect(Month.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("fromTimestamp", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("fromTimestampValue", () => {
    expect(Month.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("fromIsoId", () => {
    expect(Month.fromIsoId(MonthIsoId.parse("2023-11")).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("next", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(MonthIsoId.parse("2023-12"));
  });

  test("previous", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(MonthIsoId.parse("2023-10"));
  });

  test("shift", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(2)).toIsoId()).toEqual(
      MonthIsoId.parse("2024-01"),
    );
    expect(Month.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(-2)).toIsoId()).toEqual(
      MonthIsoId.parse("2023-09"),
    );
  });

  test("round-trips", () => {
    const months = ["1970-01", "1999-12", "2024-02", "2025-12", "2026-01"].map((value) =>
      MonthIsoId.parse(value),
    );

    for (const value of months) {
      expect(Month.fromIsoId(MonthIsoId.parse(value)).toIsoId()).toEqual(value);
    }
  });

  test("contains", () => {
    const month = Month.fromTimestamp(mocks.TIME_ZERO);

    expect(month.contains(month.getStart().subtract(Duration.Ms(1)))).toEqual(false);
    expect(month.contains(month.getEnd().add(Duration.Ms(1)))).toEqual(false);
  });

  test("toString", () => {
    expect(Month.fromIsoId(MonthIsoId.parse("2023-11")).toString()).toEqual("2023-11");
  });

  test("toJSON", () => {
    expect(Month.fromIsoId(MonthIsoId.parse("2023-11")).toJSON()).toEqual({
      start: 1698796800000,
      end: 1701388799999,
    });
  });
});
