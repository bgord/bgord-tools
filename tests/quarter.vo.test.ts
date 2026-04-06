import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Duration } from "../src/duration.service";
import { Quarter } from "../src/quarter.vo";
import { QuarterIsoId } from "../src/quarter-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

const q4 = v.parse(QuarterIsoId, "2023-Q4");
const start = 1696118400000;
const end = 1704067199999;

describe("Quarter", () => {
  test("happy path", () => {
    const quarter = Quarter.fromTimestamp(mocks.TIME_ZERO);

    expect(quarter.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(quarter.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(quarter.toIsoId()).toEqual(q4);
    expect(quarter.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = Timestamp.fromString("2025-12-31T23:59:59Z");
    const quarter = Quarter.fromTimestamp(timestamp);
    const start = 1759276800000;
    const end = 1767225599999;

    expect(quarter.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(quarter.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(quarter.toIsoId()).toEqual(v.parse(QuarterIsoId, "2025-Q4"));
  });

  test("fromNow", () => {
    expect(Quarter.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(q4);
  });

  test("fromTimestamp", () => {
    expect(Quarter.fromTimestamp(mocks.TIME_ZERO).toIsoId()).toEqual(q4);
  });

  test("fromTimestampValue", () => {
    expect(Quarter.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(q4);
  });

  test("fromIsoId", () => {
    expect(Quarter.fromIsoId(q4).toIsoId()).toEqual(q4);
  });

  test("round-trips", () => {
    const ids = ["1970-Q1", "1999-Q4", "2024-Q2", "2025-Q3", "2026-Q1"] as const;

    for (const id of ids) {
      expect(Quarter.fromIsoId(v.parse(QuarterIsoId, id)).toIsoId()).toEqual(v.parse(QuarterIsoId, id));
    }
  });

  test("contains", () => {
    const quarter = Quarter.fromTimestamp(mocks.TIME_ZERO);

    expect(quarter.contains(quarter.getStart().subtract(Duration.Ms(1)))).toEqual(false);
    expect(quarter.contains(quarter.getEnd().add(Duration.Ms(1)))).toEqual(false);
  });

  test("toString", () => {
    expect(Quarter.fromIsoId(q4).toString()).toEqual("2023-Q4");
  });

  test("toJSON", () => {
    expect(Quarter.fromIsoId(q4).toJSON()).toEqual({ start, end });
  });
});
