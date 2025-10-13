import { describe, expect, test } from "bun:test";
import { endOfQuarter, startOfQuarter } from "date-fns";
import { Quarter } from "../src/quarter.vo";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Quarter", () => {
  test("happy path", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-08-15T12:00:00Z")); // Q3 2025
    const quarter = Quarter.fromTimestamp(timestamp);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(timestamp).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(timestamp).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2025-Q3"));
    expect(quarter.contains(timestamp)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-12-31T23:59:59Z")); // Q4 2025
    const quarter = Quarter.fromTimestamp(timestamp);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(timestamp).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(timestamp).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2025-Q4"));
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);

    expect(Quarter.fromNow(timestamp).toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
  });

  test("fromTimestamp", () => {
    const timestamp = Timestamp.parse(1700000000000);

    expect(Quarter.fromTimestamp(timestamp).toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
  });

  test("fromIsoId", () => {
    expect(Quarter.fromIsoId(QuarterIsoId.parse("2023-Q4")).toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
  });

  test("round-trips", () => {
    const ids = ["1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "2026-Q1"] as const;

    for (const id of ids) {
      expect(Quarter.fromIsoId(QuarterIsoId.parse(id)).toIsoId()).toEqual(QuarterIsoId.parse(id));
    }
  });

  test("contains", () => {
    const timestamp = Timestamp.parse(Date.parse("2025-08-15T12:00:00Z")); // Q3 2025
    const quarter = Quarter.fromTimestamp(timestamp);
    expect(quarter.contains(Timestamp.parse(quarter.getStart() - 1))).toEqual(false);
    expect(quarter.contains(Timestamp.parse(quarter.getEnd() + 1))).toEqual(false);
  });

  test("toString", () => {
    expect(Quarter.fromIsoId(QuarterIsoId.parse("2023-Q4")).toString()).toEqual("2023-Q4");
  });

  test("toJSON", () => {
    expect(Quarter.fromIsoId(QuarterIsoId.parse("2023-Q4")).toJSON()).toEqual({
      start: 1696118400000,
      end: 1704067199999,
    });
  });
});
