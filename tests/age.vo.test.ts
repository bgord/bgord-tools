import { describe, expect, test } from "bun:test";
import { Age, AgeValueError, InvalidBirthdateInFutureError } from "../src/age.vo";
import { Timestamp, type TimestampType } from "../src/timestamp.vo";

const toTimestamp = (ms: string) => Timestamp.parse(new Date(ms).getTime());

describe("Age VO", () => {
  describe("fromValue", () => {
    test("creates for minimum allowed age (1)", () => {
      expect(Age.fromValue(1).get()).toEqual(1);
    });

    test("creates for maximum allowed age (130)", () => {
      expect(Age.fromValue(130).get()).toEqual(130);
    });

    test("invalid values", () => {
      for (const invalid of [0, 131, -5, 18.5, Number.NaN]) {
        expect(() => Age.fromValue(invalid)).toThrow(AgeValueError.error);
      }
    });
  });

  describe("comparison & equality", () => {
    test("compares equal ages", () => {
      const first = Age.fromValue(18);
      const second = Age.fromValue(18);

      expect(first.equals(second)).toEqual(true);
      expect(first.compare(second)).toEqual(0);
    });

    test("detects older than", () => {
      const youngerAge = Age.fromValue(17);
      const olderAge = Age.fromValue(18);

      expect(olderAge.isOlderThan(youngerAge)).toEqual(true);
      expect(youngerAge.isOlderThan(olderAge)).toEqual(false);
      expect(olderAge.compare(youngerAge)).toEqual(1);
    });

    test("detects younger than", () => {
      const youngerAge = Age.fromValue(17);
      const olderAge = Age.fromValue(18);

      expect(youngerAge.isYoungerThan(olderAge)).toEqual(true);
      expect(olderAge.isYoungerThan(youngerAge)).toEqual(false);
      expect(youngerAge.compare(olderAge)).toEqual(-1);
    });
  });

  describe("isAdult", () => {
    test("treats exactly the same age as adult", () => {
      expect(Age.fromValue(18).isAdult(Age.fromValue(18))).toEqual(true);
    });

    test("treats older age as adult", () => {
      expect(Age.fromValue(21).isAdult(Age.fromValue(18))).toEqual(true);
    });

    test("treats younger age as not adult", () => {
      expect(Age.fromValue(17).isAdult(Age.fromValue(18))).toEqual(false);
    });
  });

  describe("fromBirthdateEpochMs", () => {
    test("computes age when birthday has already happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-09-01T00:00:00.000Z");

      expect(Age.fromBirthdateEpochMs({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toEqual(
        25,
      );
    });

    test("computes age when birthday has NOT yet happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-10-01T00:00:00.000Z");

      expect(Age.fromBirthdateEpochMs({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toEqual(
        24,
      );
    });

    test("computes age exactly on birthday", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-09-30T00:00:00.000Z");

      expect(Age.fromBirthdateEpochMs({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toEqual(
        25,
      );
    });

    test("rejects future birthdates", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const futureBirthdateTimestamp = toTimestamp("2025-10-01T00:00:00.000Z");

      expect(() =>
        Age.fromBirthdateEpochMs({ birthdate: futureBirthdateTimestamp, now: nowTimestamp }),
      ).toThrowError(InvalidBirthdateInFutureError);
    });

    test("rejects ages above MAX when derived from birthdate", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const veryOldBirthdateTimestamp = -5364662400000 as TimestampType; // "1800-01-01T00:00:00.000Z"

      expect(() =>
        Age.fromBirthdateEpochMs({ birthdate: veryOldBirthdateTimestamp, now: nowTimestamp }),
      ).toThrow(AgeValueError.error);
    });

    test("respects lower bound (MIN) when derived from birthdate", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const sameDayBirthdateTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");

      expect(() =>
        Age.fromBirthdateEpochMs({ birthdate: sameDayBirthdateTimestamp, now: nowTimestamp }),
      ).toThrow(AgeValueError.error);
    });
  });

  describe("fromBirthdate (string)", () => {
    test("computes age when birthday has already happened this year", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-09-01T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
    });

    test("computes age when birthday has NOT yet happened this year", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-10-01T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(24);
    });

    test("computes age exactly on birthday", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-09-30T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
    });

    test("rejects future birthdates", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2025-10-01T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrowError(InvalidBirthdateInFutureError);
    });

    test("rejects ages above MAX when derived from birthdate", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "1800-01-01T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeValueError.error);
    });

    test("respects lower bound (MIN) when derived from birthdate", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2025-09-30T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeValueError.error);
    });

    test("invalid date string throws (cannot be parsed)", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "not-a-date";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeValueError.error);
    });
  });

  test("serializes to primitive via toJSON and toString", () => {
    const age = Age.fromValue(42);

    expect(JSON.stringify({ age })).toEqual('{"age":42}');
    expect(String(age)).toEqual("42");
  });
});
