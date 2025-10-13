import { describe, expect, test } from "bun:test";
import { endOfQuarter, startOfQuarter } from "date-fns";
import { Quarter } from "../src/quarter.vo";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

describe("Quarter", () => {
  test("happy path", () => {
    const quarter = Quarter.fromTimestamp(mocks.TIME_ZERO);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(mocks.TIME_ZERO).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(mocks.TIME_ZERO).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
    expect(quarter.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = mocks.toTimestamp("2025-12-31T23:59:59Z");
    const quarter = Quarter.fromTimestamp(timestamp);

    expect(quarter.getStart()).toEqual(Timestamp.parse(startOfQuarter(timestamp).getTime()));
    expect(quarter.getEnd()).toEqual(Timestamp.parse(endOfQuarter(timestamp).getTime()));
    expect(quarter.toIsoId()).toEqual(QuarterIsoId.parse("2025-Q4"));
  });

  test("fromNow", () => {
    expect(Quarter.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
  });

  test("fromTimestamp", () => {
    expect(Quarter.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(QuarterIsoId.parse("2023-Q4"));
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
    const quarter = Quarter.fromTimestamp(mocks.TIME_ZERO);
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
