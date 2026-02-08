import { describe, expect, test } from "bun:test";
import { DateRange } from "../src/date-range.vo";
import { Duration } from "../src/duration.service";
import * as mocks from "./mocks";

const START = mocks.TIME_ZERO;
const END = START.add(Duration.Seconds(1));

const range = new DateRange(START, END);

describe("DateRange", () => {
  test("constructor - start after end", () => {
    expect(() => new DateRange(END, START)).toThrow("date.range.invalid");
  });

  test("constructor - start equals end", () => {
    expect(() => new DateRange(START, START)).toThrow("date.range.invalid");
  });

  test("getStart", () => {
    expect(range.getStart()).toEqual(START);
  });

  test("getEnd", () => {
    expect(range.getEnd()).toEqual(END);
  });

  test("get", () => {
    expect(range.get()).toEqual([START, END]);
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
    expect(range.equals(range)).toEqual(true);
  });

  test("equals - false", () => {
    expect(range.equals(new DateRange(START, END.add(Duration.Seconds(1))))).toEqual(false);
  });

  test("toString", () => {
    expect(range.toString()).toEqual(`${START.toString()} - ${END.toString()}`);
  });

  test("toJSON", () => {
    expect(range.toJSON()).toEqual({ start: START.ms, end: END.ms });
  });
});
