import { describe, expect, test } from "bun:test";
import { endOfYear, startOfYear } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId, YearIsoIdError } from "../src/year-iso-id.vo";

const toMs = (date: string) => Timestamp.parse(Date.parse(date));
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Year", () => {
  test("happy path", () => {
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toEqual(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2025"));
    expect(year.contains(timestamp)).toEqual(true);
  });

  test("happy path - near year boundary", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z"); // still 2025 in UTC
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toEqual(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2025"));
  });

  test("fromNumber rejects invalid inputs", () => {
    expect(() => Year.fromNumber(-1)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(10000)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(2025.5)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(Number.NaN)).toThrow(YearIsoIdError.BadChars);
  });

  test("fromNumber", () => {
    const valid = [1970, 1999, 2024, 2025, 2026];

    for (const value of valid) {
      expect(Year.fromNumber(value).toIsoId()).toEqual(YearIsoId.parse(value.toString()));
    }
  });

  test("fromNow", () => {
    const timestamp = Timestamp.parse(1700000000000);

    expect(Year.fromNow(timestamp).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("fromIsoId", () => {
    expect(Year.fromIsoId(YearIsoId.parse("2023")).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("next", () => {
    expect(Year.fromTimestamp(timestamp).next().toIsoId()).toEqual(YearIsoId.parse("2026"));
  });

  test("previous", () => {
    expect(Year.fromTimestamp(timestamp).previous().toIsoId()).toEqual(YearIsoId.parse("2024"));
  });

  test("shift", () => {
    expect(Year.fromTimestamp(timestamp).shift(2).toIsoId()).toEqual(YearIsoId.parse("2027"));
    expect(Year.fromTimestamp(timestamp).shift(-2).toIsoId()).toEqual(YearIsoId.parse("2023"));
  });

  test("round-trips", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"].map((value) => YearIsoId.parse(value));

    for (const id of ids) {
      expect(Year.fromIsoId(id).toIsoId()).toEqual(id);
    }
  });

  test("contains", () => {
    const year = Year.fromTimestamp(toMs("2025-07-22T12:00:00Z"));

    expect(year.contains(Timestamp.parse(year.getStart() - 1))).toEqual(false);
    expect(year.contains(Timestamp.parse(year.getEnd() + 1))).toEqual(false);
  });

  test("leap year check for 2000", () => expect(Year.fromNumber(2000).isLeapYear()).toEqual(true));

  test("leap year check for 2010", () => expect(Year.fromNumber(2010).isLeapYear()).toEqual(false));

  test("leap year check for 2024", () => expect(Year.fromNumber(2024).isLeapYear()).toEqual(true));

  test("leap year check for 2400", () => expect(Year.fromNumber(2400).isLeapYear()).toEqual(true));

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
