import { describe, expect, test } from "bun:test";
import { DateRange } from "../src/date-range.vo";
import { Duration } from "../src/duration.service";
import * as mocks from "./mocks";

const START = mocks.TIME_ZERO;
const END = START.add(Duration.Seconds(1));

const range = new DateRange(START, END);

describe("DateRange", () => {
  test("throws when start > end", () => {
    expect(() => new DateRange(END, START)).toThrow("date.range.invalid");
  });

  test("getStart", () => {
    expect(range.getStart()).toEqual(START);
  });

  test("getEnd", () => {
    expect(range.getEnd()).toEqual(END);
  });

  test("toRange", () => {
    expect(range.toRange()).toEqual([START, END]);
  });

  test("contains - true", () => {
    expect(range.contains(START)).toEqual(true);
    expect(range.contains(START.add(Duration.Ms(500)))).toEqual(true);
    expect(range.contains(END)).toEqual(true);
  });

  test("contains - false", () => {
    expect(range.contains(START.subtract(Duration.Ms(1)))).toEqual(false);
    expect(range.contains(END.add(Duration.Ms(1)))).toEqual(false);
  });

  test("equals - true", () => {
    expect(new DateRange(START, END).equals(new DateRange(START, END))).toEqual(true);
  });

  test("equals - false", () => {
    const different = new DateRange(START, END.add(Duration.Seconds(1)));

    expect(range.equals(different)).toEqual(false);
  });
});
