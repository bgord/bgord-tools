import { describe, expect, test } from "bun:test";
import { endOfYear, startOfYear } from "date-fns";
import { Timestamp } from "../src/timestamp.vo";
import { Year } from "../src/year.vo";
import { YearIsoId } from "../src/year-iso-id.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → ms (UTC)
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Year VO", () => {
  test("creates the correct range & ISO id from a mid-year timestamp", () => {
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toBe(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toBe(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toBe("2025");
    expect(year.contains(timestamp)).toBe(true);
  });

  test("handles a timestamp near year boundary in UTC", () => {
    const timestamp = toMs("2025-12-31T23:59:59Z"); // still 2025 in UTC
    const year = Year.fromTimestamp(timestamp);

    expect(year.getStart()).toBe(Timestamp.parse(startOfYear(timestamp).getTime()));
    expect(year.getEnd()).toBe(Timestamp.parse(endOfYear(timestamp).getTime()));
    expect(year.toIsoId()).toBe("2025");
  });

  test("next", () => {
    expect(Year.fromTimestamp(timestamp).next().toIsoId()).toBe("2026");
  });

  test("previous", () => {
    expect(Year.fromTimestamp(timestamp).previous().toIsoId()).toBe("2024");
  });

  test("shift", () => {
    expect(Year.fromTimestamp(timestamp).shift(2).toIsoId()).toBe("2027");
    expect(Year.fromTimestamp(timestamp).shift(-2).toIsoId()).toBe("2023");
  });

  test("round-trips via ISO id", () => {
    const ids = ["1970", "1999", "2024", "2025", "2026"];
    for (const id of ids) {
      const parsed = YearIsoId.parse(id);
      const year = Year.fromIsoId(parsed);
      expect(year.toIsoId()).toBe(id);
    }
  });

  test("fromNumber builds the same range & id as fromIsoId", () => {
    const samples = [1970, 1999, 2024, 2025, 2026];
    for (const value of samples) {
      const a = Year.fromNumber(value);
      const b = Year.fromIsoId(String(value));

      expect(a.toIsoId()).toBe(String(value));
      expect(b.toIsoId()).toBe(String(value));
      expect(a.getStart()).toBe(b.getStart());
      expect(a.getEnd()).toBe(b.getEnd());
      expect(a.equals(b)).toBe(true);
    }
  });

  test("fromNow equals fromTimestamp(now)", () => {
    const now = Timestamp.parse(Date.now());
    const a = Year.fromTimestamp(now);
    const b = Year.fromNow(now);
    expect(b.equals(a)).toBe(true);
  });

  test("contains() returns false for timestamps outside the year", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const year = Year.fromTimestamp(timestamp);
    expect(year.contains(Timestamp.parse(year.getStart() - 1))).toBe(false);
    expect(year.contains(Timestamp.parse(year.getEnd() + 1))).toBe(false);
  });

  test("fromNumber rejects invalid inputs", () => {
    expect(() => Year.fromNumber(-1)).toThrow("year.out_of_range");
    expect(() => Year.fromNumber(10000)).toThrow("year.out_of_range");
    expect(() => Year.fromNumber(2025.5)).toThrow("year.invalid_integer");
    expect(() => Year.fromNumber(Number.NaN)).toThrow("year.invalid_integer");
  });

  test("leap year check for 2000", () => expect(Year.fromNumber(2000).isLeapYear()).toBe(true));
  test("leap year check for 2010", () => expect(Year.fromNumber(2010).isLeapYear()).toBe(false));
  test("leap year check for 2024", () => expect(Year.fromNumber(2024).isLeapYear()).toBe(true));
  test("leap year check for 2400", () => expect(Year.fromNumber(2400).isLeapYear()).toBe(true));
});
