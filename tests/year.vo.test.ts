import { describe, expect, test } from "bun:test";
import { endOfYear, startOfYear } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId, YearIsoIdError } from "../src/year-iso-id.vo";

const toMs = (value: string) => Timestamp.parse(Date.parse(value));
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Year", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toEqual(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2025"));
    expect(year.contains(timestamp)).toEqual(true);
  });

  test("handles a timestamp near year boundary in UTC", () => {
    const ts = toMs("2025-12-31T23:59:59Z"); // still 2025 in UTC
    const year = Year.fromTimestamp(ts);

    expect(year.getStart()).toEqual(Timestamp.parse(startOfYear(ts).getTime()));
    expect(year.getEnd()).toEqual(Timestamp.parse(endOfYear(ts).getTime()));
    expect(year.toIsoId()).toEqual(YearIsoId.parse("2025"));
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

  test("round-trips via ISO id", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"].map((value) => YearIsoId.parse(value));

    for (const id of ids) {
      expect(Year.fromIsoId(id).toIsoId()).toEqual(id);
    }
  });

  test("fromNumber builds the same range & id as fromIsoId", () => {
    const values = [1970, 1999, 2024, 2025, 2026];

    for (const value of values) {
      const a = Year.fromNumber(value);
      const b = Year.fromIsoId(YearIsoId.parse(String(value)));

      expect(a.toIsoId()).toEqual(YearIsoId.parse(String(value)));
      expect(b.toIsoId()).toEqual(YearIsoId.parse(String(value)));
      expect(a.getStart()).toEqual(b.getStart());
      expect(a.getEnd()).toEqual(b.getEnd());
      expect(a.equals(b)).toEqual(true);
    }
  });

  test("fromNow equals fromTimestamp(now)", () => {
    const now = Timestamp.parse(Date.now());

    const a = Year.fromTimestamp(now);
    const b = Year.fromNow(now);

    expect(b.equals(a)).toEqual(true);
  });

  test("contains returns false for timestamps outside the year", () => {
    const year = Year.fromTimestamp(toMs("2025-07-22T12:00:00Z"));

    expect(year.contains(Timestamp.parse(year.getStart() - 1))).toEqual(false);
    expect(year.contains(Timestamp.parse(year.getEnd() + 1))).toEqual(false);
  });

  test("fromNumber rejects invalid inputs", () => {
    expect(() => Year.fromNumber(-1)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(10000)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(2025.5)).toThrow(YearIsoIdError.BadChars);
    expect(() => Year.fromNumber(Number.NaN)).toThrow(YearIsoIdError.BadChars);
  });

  test("leap year check for 2000", () => expect(Year.fromNumber(2000).isLeapYear()).toEqual(true));
  test("leap year check for 2010", () => expect(Year.fromNumber(2010).isLeapYear()).toEqual(false));
  test("leap year check for 2024", () => expect(Year.fromNumber(2024).isLeapYear()).toEqual(true));
  test("leap year check for 2400", () => expect(Year.fromNumber(2400).isLeapYear()).toEqual(true));
});
