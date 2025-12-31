import { describe, expect, test } from "bun:test";
import { endOfYear, startOfYear } from "date-fns";
import { Duration } from "../src/duration.service";
import { Integer } from "../src/integer.vo";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId } from "../src/year-iso-id.vo";
import * as mocks from "./mocks";

describe("Year", () => {
  test("happy path", () => {
    const year = Year.fromTimestamp(mocks.TIME_ZERO);

    expect(year.getStart()).toEqual(Timestamp.fromNumber(startOfYear(mocks.TIME_ZERO.ms).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.fromNumber(endOfYear(mocks.TIME_ZERO.ms).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2023"));
    expect(year.contains(mocks.TIME_ZERO)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = mocks.toTimestamp("2025-12-31T23:59:59Z");
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toEqual(Timestamp.fromNumber(startOfYear(timestamp.ms).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.fromNumber(endOfYear(timestamp.ms).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2025"));
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
      expect(Year.fromNumber(value).toIsoId()).toEqual(YearIsoId.parse(value.toString()));
    }
  });

  test("fromNow", () => {
    expect(Year.fromNow(mocks.TIME_ZERO).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("fromTimestampValue", () => {
    expect(Year.fromTimestampValue(mocks.TIME_ZERO.ms).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("fromIsoId", () => {
    expect(Year.fromIsoId(YearIsoId.parse("2023")).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("next", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).next().toIsoId()).toEqual(YearIsoId.parse("2024"));
  });

  test("previous", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).previous().toIsoId()).toEqual(YearIsoId.parse("2022"));
  });

  test("shift", () => {
    expect(Year.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(2)).toIsoId()).toEqual(
      YearIsoId.parse("2025"),
    );
    expect(Year.fromTimestamp(mocks.TIME_ZERO).shift(Integer.parse(-2)).toIsoId()).toEqual(
      YearIsoId.parse("2021"),
    );
  });

  test("round-trips", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"].map((value) => YearIsoId.parse(value));

    for (const id of ids) {
      expect(Year.fromIsoId(id).toIsoId()).toEqual(id);
    }
  });

  test("contains", () => {
    const year = Year.fromTimestamp(mocks.TIME_ZERO);

    expect(year.contains(year.getStart().subtract(Duration.Ms(1)))).toEqual(false);
    expect(year.contains(year.getEnd().add(Duration.Ms(1)))).toEqual(false);
  });

  test("leap year check for 2000", () => expect(Year.fromNumber(2000).isLeapYear()).toEqual(true));

  test("leap year check for 2010", () => expect(Year.fromNumber(2010).isLeapYear()).toEqual(false));

  test("leap year check for 2024", () => expect(Year.fromNumber(2024).isLeapYear()).toEqual(true));

  test("leap year check for 2400", () => expect(Year.fromNumber(2400).isLeapYear()).toEqual(true));

  test("leap year check for 2100", () => expect(Year.fromNumber(2100).isLeapYear()).toEqual(false));

  test("toString", () => {
    expect(Year.fromIsoId(YearIsoId.parse("2023")).toString()).toEqual("2023");
  });

  test("toJSON", () => {
    expect(Year.fromIsoId(YearIsoId.parse("2023")).toJSON()).toEqual({
      start: 1672531200000,
      end: 1704067199999,
    });
  });
});
