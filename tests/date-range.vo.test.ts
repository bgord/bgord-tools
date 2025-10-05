import { describe, expect, test } from "bun:test";
import { DateRange, DateRangeInvalidError } from "../src/date-range.vo";
import { Duration } from "../src/duration.service";
import { Timestamp } from "../src/timestamp.vo";

const START = Timestamp.parse(1_700_000_000_000); // ≈ 2023-11-14T06:40:00Z
const END = Timestamp.parse(START + Duration.Seconds(1).ms);

const range = new DateRange(START, END);

describe("DateRange", () => {
  test("throws when start > end", () => {
    expect(() => new DateRange(END, START)).toThrow(DateRangeInvalidError);
  });

  test("returns the exact start timestamp", () => {
    expect(range.getStart()).toEqual(START);
  });

  test("returns the exact end timestamp", () => {
    expect(range.getEnd()).toEqual(END);
  });

  test("returns a tuple [start, end] via toRange()", () => {
    expect(range.toRange()).toEqual([START, END]);
  });

  test("contains the start, an inner point and the end", () => {
    expect(range.contains(START)).toEqual(true);
    expect(range.contains(Timestamp.parse(START + 500))).toEqual(true);
    expect(range.contains(END)).toEqual(true);
  });

  test("does NOT contain values outside the range", () => {
    expect(range.contains(Timestamp.parse(START - 1))).toEqual(false);
    expect(range.contains(Timestamp.parse(END + 1))).toEqual(false);
  });

  test("equals another DateRange with identical boundaries", () => {
    const same = new DateRange(START, END);
    expect(range.equals(same)).toEqual(true);
  });

  test("does NOT equal a DateRange with different boundaries", () => {
    const different = new DateRange(START, Timestamp.parse(END + 1_000));
    expect(range.equals(different)).toEqual(false);
  });
});
