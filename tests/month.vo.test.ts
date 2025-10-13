import { describe, expect, test } from "bun:test";
import { endOfMonth, startOfMonth } from "date-fns";
import { Month } from "../src/month.vo";
import { MonthIsoId } from "../src/month-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (date: string) => Timestamp.parse(Date.parse(date));

const reference = toMs("2025-07-22T12:00:00Z");

describe("Month", () => {
  test("happy path", () => {
    const month = Month.fromTimestamp(reference);

    expect(month.getStart()).toEqual(Timestamp.parse(startOfMonth(reference).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.parse(endOfMonth(reference).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2025-07"));
    expect(month.contains(reference)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z");
    const month = Month.fromTimestamp(timestamp);

    expect(month.getStart()).toEqual(Timestamp.parse(startOfMonth(timestamp).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.parse(endOfMonth(timestamp).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2025-12"));
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);

    expect(Month.fromNow(timestamp).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("fromTimestamp", () => {
    const timestamp = Timestamp.parse(1700000000000);

    expect(Month.fromTimestamp(timestamp).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("fromIsoId", () => {
    expect(Month.fromIsoId(MonthIsoId.parse("2023-11")).toIsoId()).toEqual(MonthIsoId.parse("2023-11"));
  });

  test("next", () => {
    expect(Month.fromTimestamp(reference).next().toIsoId()).toEqual(MonthIsoId.parse("2025-08"));
  });

  test("previous", () => {
    expect(Month.fromTimestamp(reference).previous().toIsoId()).toEqual(MonthIsoId.parse("2025-06"));
  });

  test("shift", () => {
    expect(Month.fromTimestamp(reference).shift(2).toIsoId()).toEqual(MonthIsoId.parse("2025-09"));
    expect(Month.fromTimestamp(reference).shift(-2).toIsoId()).toEqual(MonthIsoId.parse("2025-05"));
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
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const month = Month.fromTimestamp(timestamp);

    expect(month.contains(Timestamp.parse(month.getStart() - 1))).toEqual(false);
    expect(month.contains(Timestamp.parse(month.getEnd() + 1))).toEqual(false);
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
