import { describe, expect, test } from "bun:test";
import { Age } from "../src/age.vo";
import { Timestamp, type TimestampType } from "../src/timestamp.vo";

const toTimestamp = (ms: string) => Timestamp.parse(new Date(ms).getTime());

describe("Age VO", () => {
  describe("fromValue", () => {
    test("creates for minimum allowed age (1)", () => {
      expect(Age.fromValue(1).get()).toBe(1);
    });

    test("creates for maximum allowed age (130)", () => {
      expect(Age.fromValue(130).get()).toBe(130);
    });

    test("invalid values", () => {
      expect(() => Age.fromValue(0)).toThrow();
      expect(() => Age.fromValue(131)).toThrow();
      expect(() => Age.fromValue(-5)).toThrow();
      expect(() => Age.fromValue(18.5)).toThrow();
      expect(() => Age.fromValue(Number.NaN)).toThrow();
    });
  });

  describe("comparison & equality", () => {
    test("compares equal ages", () => {
      const first = Age.fromValue(18);
      const second = Age.fromValue(18);

      expect(first.equals(second)).toBe(true);
      expect(first.compare(second)).toBe(0);
    });

    test("detects older than", () => {
      const youngerAge = Age.fromValue(17);
      const olderAge = Age.fromValue(18);

      expect(olderAge.isOlderThan(youngerAge)).toBe(true);
      expect(youngerAge.isOlderThan(olderAge)).toBe(false);
      expect(olderAge.compare(youngerAge)).toBe(1);
    });

    test("detects younger than", () => {
      const youngerAge = Age.fromValue(17);
      const olderAge = Age.fromValue(18);

      expect(youngerAge.isYoungerThan(olderAge)).toBe(true);
      expect(olderAge.isYoungerThan(youngerAge)).toBe(false);
      expect(youngerAge.compare(olderAge)).toBe(-1);
    });
  });

  describe("isAdult ", () => {
    test("treats exactly the same age as adult", () => {
      const personAge = Age.fromValue(18);
      expect(personAge.isAdult(Age.fromValue(18))).toBe(true);
    });

    test("treats older age as adult", () => {
      const personAge = Age.fromValue(21);
      expect(personAge.isAdult(Age.fromValue(18))).toBe(true);
    });

    test("treats younger age as not adult", () => {
      const personAge = Age.fromValue(17);
      expect(personAge.isAdult(Age.fromValue(18))).toBe(false);
    });
  });

  describe("fromBirthdate", () => {
    test("computes age when birthday has already happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-09-01T00:00:00.000Z");

      expect(Age.fromBirthdate({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toBe(25);
    });

    test("computes age when birthday has NOT yet happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-10-01T00:00:00.000Z");

      expect(Age.fromBirthdate({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toBe(24);
    });

    test("computes age exactly on birthday", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-09-30T00:00:00.000Z");

      expect(Age.fromBirthdate({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toBe(25);
    });

    test("rejects future birthdates", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const futureBirthdateTimestamp = toTimestamp("2025-10-01T00:00:00.000Z");

      expect(() =>
        Age.fromBirthdate({ birthdate: futureBirthdateTimestamp, now: nowTimestamp }),
      ).toThrowError("invalid.birthdate_in_future");
    });

    test("rejects ages above MAX when derived from birthdate", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const veryOldBirthdateTimestamp = -5364662400000 as TimestampType; // "1800-01-01T00:00:00.000Z"

      expect(() => Age.fromBirthdate({ birthdate: veryOldBirthdateTimestamp, now: nowTimestamp })).toThrow();
    });

    test("respects lower bound (MIN) when derived from birthdate", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const sameDayBirthdateTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");

      expect(() => Age.fromBirthdate({ birthdate: sameDayBirthdateTimestamp, now: nowTimestamp })).toThrow();
    });
  });
});
