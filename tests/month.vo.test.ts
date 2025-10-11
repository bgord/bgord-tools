import { describe, expect, test } from "bun:test";
import { endOfMonth, startOfMonth } from "date-fns";
import { Month } from "../src/month.vo";
import { MonthIsoId } from "../src/month-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s));

const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Month", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const month = Month.fromTimestamp(timestamp);

    expect(month.getStart()).toEqual(Timestamp.parse(startOfMonth(timestamp).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.parse(endOfMonth(timestamp).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2025-07"));
    expect(month.contains(timestamp)).toEqual(true);
  });

  test("handles a timestamp near year boundary in UTC", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z");
    const month = Month.fromTimestamp(timestamp);

    expect(month.getStart()).toEqual(Timestamp.parse(startOfMonth(timestamp).getTime()));
    expect(month.getEnd()).toEqual(Timestamp.parse(endOfMonth(timestamp).getTime()));
    expect(month.toIsoId()).toEqual(MonthIsoId.parse("2025-12"));
  });

  test("next", () => {
    expect(Month.fromTimestamp(timestamp).next().toIsoId()).toEqual(MonthIsoId.parse("2025-08"));
  });

  test("previous", () => {
    expect(Month.fromTimestamp(timestamp).previous().toIsoId()).toEqual(MonthIsoId.parse("2025-06"));
  });

  test("shift", () => {
    expect(Month.fromTimestamp(timestamp).shift(2).toIsoId()).toEqual(MonthIsoId.parse("2025-09"));
    expect(Month.fromTimestamp(timestamp).shift(-2).toIsoId()).toEqual(MonthIsoId.parse("2025-05"));
  });

  test("round-trips via ISO id", () => {
    const ids = ["1970-01", "1999-12", "2024-02", "2025-12", "2026-01"].map((value) =>
      MonthIsoId.parse(value),
    );
    for (const id of ids) {
      const parsed = MonthIsoId.parse(id);
      const month = Month.fromIsoId(parsed);
      expect(month.toIsoId()).toEqual(id);
    }
  });

  test("fromNow equals fromTimestamp(now)", () => {
    const now = Timestamp.parse(Date.now());
    const a = Month.fromTimestamp(now);
    const b = Month.fromNow(now);
    expect(b.equals(a)).toEqual(true);
  });

  test("contains() returns false for timestamps outside the month", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const month = Month.fromTimestamp(timestamp);
    expect(month.contains(Timestamp.parse(month.getStart() - 1))).toEqual(false);
    expect(month.contains(Timestamp.parse(month.getEnd() + 1))).toEqual(false);
  });
});
