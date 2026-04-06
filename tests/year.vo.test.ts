import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Duration } from "../src/duration.service";
import { Int } from "../src/int.vo";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId } from "../src/year-iso-id.vo";
import * as mocks from "./mocks";

const twentyTwentyThree = v.parse(YearIsoId, "2023");
const start = 1672531200000;
const end = 1704067199999;

describe("Year", () => {
  test("happy path", () => {
    const year = Year.fromTimestamp(mocks.TIME_ZERO);

    expect(year.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(year.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(year.toIsoId()).toEqual(twentyTwentyThree);
    expect(year.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const start = 1735689600000;
    const end = 1767225599999;
    const timestamp = Timestamp.fromString("2025-12-31T23:59:59Z");
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toEqual(Timestamp.fromNumber(start));
    expect(year.getEnd()).toEqual(Timestamp.fromNumber(end));
    expect(year.toIsoId()).toEqual(v.parse(YearIsoId, "2025"));
  });

  test("fromNumber rejects invalid inputs", () => {
    expect(() => Year.fromNumber(-1)).toThrow("year.iso.id.bad.chars");
    expect(() => Year.fromNumber(10000)).toThrow("year.iso.id.bad.chars");
    expect(() => Year.fromNumber(2025.5)).toThrow("year.iso.id.bad.chars");
    expect(() => Year.fromNumber(Number.NaN)).toThrow("year.iso.id.bad.chars");
  });

  test("fromNumber", () => {
    const valid = [1970, 1999, 2024, 2025, 2026];

    for (const value of valid) {
      expect(Year.fromNumber(value).toIsoId()).toEqual(v.parse(YearIsoId, value.toString()));
    }
  });

  test("fromNow", () => {
    expect(Year.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(twentyTwentyThree);
  });

  test("fromTimestampValue", () => {
    expect(Year.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(twentyTwentyThree);
  });

  test("fromIsoId", () => {
    expect(Year.fromIsoId(twentyTwentyThree).toIsoId()).toEqual(twentyTwentyThree);
  });

  test("next", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(v.parse(YearIsoId, "2024"));
  });

  test("previous", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(v.parse(YearIsoId, "2022"));
  });

  test("shift", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(2)).toIsoId()).toEqual(
      v.parse(YearIsoId, "2025"),
    );
    expect(Year.fromTimestamp(mocks.TIME_ZERO).shift(Int.of(-2)).toIsoId()).toEqual(
      v.parse(YearIsoId, "2021"),
    );
  });

  test("round-trips", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"].map((value) => v.parse(YearIsoId, value));

    for (const id of ids) {
      expect(Year.fromIsoId(id).toIsoId()).toEqual(id);
    }
  });

  test("contains", () => {
    const year = Year.fromTimestamp(mocks.TIME_ZERO);

    expect(year.contains(year.getStart().subtract(Duration.MIN))).toEqual(false);
    expect(year.contains(year.getEnd().add(Duration.MIN))).toEqual(false);
  });

  test("leap year", () => {
    expect(Year.fromNumber(2000).isLeapYear()).toEqual(true);
    expect(Year.fromNumber(2010).isLeapYear()).toEqual(false);
    expect(Year.fromNumber(2024).isLeapYear()).toEqual(true);
    expect(Year.fromNumber(2400).isLeapYear()).toEqual(true);
    expect(Year.fromNumber(2100).isLeapYear()).toEqual(false);
  });

  test("toString", () => {
    expect(Year.fromIsoId(twentyTwentyThree).toString()).toEqual("2023");
  });

  test("toJSON", () => {
    expect(Year.fromIsoId(twentyTwentyThree).toJSON()).toEqual({ start, end });
  });
});
