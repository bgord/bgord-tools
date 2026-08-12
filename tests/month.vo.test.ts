import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Duration } from "../src/duration.service";
import { Int } from "../src/int.vo";
import { Month } from "../src/month.vo";
import { MonthIsoId } from "../src/month-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

const november = v.parse(MonthIsoId, "2023-11");
const start = 1698796800000;
const end = 1701388799999;

describe("Month", () => {
  test("happy path", () => {
    const month = Month.fromTimestamp(mocks.TIME_ZERO);

    expect(month.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(month.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(month.toIsoId()).toEqual(november);
    expect(month.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const start = 1764547200000;
    const end = 1767225599999;
    const month = Month.fromTimestamp(Timestamp.fromString("2025-12-31T00:00:00Z"));

    expect(month.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(month.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(month.toIsoId()).toEqual(v.parse(MonthIsoId, "2025-12"));
  });

  test("fromTimestamp", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(november);
  });

  test("fromTimestampValue", () => {
    expect(Month.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(november);
  });

  test("fromIsoId", () => {
    expect(Month.fromIsoId(november).toIsoId()).toEqual(november);
  });

  test("next", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(v.parse(MonthIsoId, "2023-12"));
  });

  test("previous", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(v.parse(MonthIsoId, "2023-10"));
  });

  test("shift", () => {
    expect(Month.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(2)).toIsoId()).toEqual(
      v.parse(MonthIsoId, "2024-01"),
    );
    expect(Month.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(-2)).toIsoId()).toEqual(
      v.parse(MonthIsoId, "2023-09"),
    );
  });

  test("round-trips", () => {
    const months = ["1970-01", "1999-12", "2024-02", "2025-12", "2026-01"].map((value) =>
      v.parse(MonthIsoId, value),
    );

    for (const value of months) {
      expect(Month.fromIsoId(v.parse(MonthIsoId, value)).toIsoId()).toEqual(value);
    }
  });

  test("contains", () => {
    const month = Month.fromTimestamp(mocks.TIME_ZERO);

    expect(month.contains(month.getStart().subtract(Duration.MIN))).toEqual(false);
    expect(month.contains(month.getEnd().add(Duration.MIN))).toEqual(false);
  });

  test("toString", () => {
    expect(Month.fromIsoId(november).toString()).toEqual(november);
  });

  test("toJSON", () => {
    expect(Month.fromIsoId(november).toJSON()).toEqual({ start, end });
  });
});
