import { describe, expect, test } from "bun:test";
import { Age, AgeError } from "../src/age.vo";
import { AgeYearsError } from "../src/age-years.vo";
import { Timestamp, type TimestampType } from "../src/timestamp.vo";

const toTimestamp = (ms: string) => Timestamp.parse(new Date(ms).getTime());

describe("Age", () => {
  describe("fromValue", () => {
    expect(Age.fromValue(1).get()).toEqual(1);
    expect(Age.fromValue(130).get()).toEqual(130);
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
    test("birthday has already happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-09-01T00:00:00.000Z");

      expect(Age.fromBirthdateEpochMs({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toEqual(
        25,
      );
    });

    test("birthday has NOT yet happened this year", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdateTimestamp = toTimestamp("2000-10-01T00:00:00.000Z");

      expect(Age.fromBirthdateEpochMs({ birthdate: birthdateTimestamp, now: nowTimestamp }).get()).toEqual(
        24,
      );
    });

    test("exactly on birthday", () => {
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
      ).toThrowError(AgeError.FutureBirthdate);
    });

    test("rejects above upper bound", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const veryOldBirthdateTimestamp = -5364662400000 as TimestampType;

      expect(() =>
        Age.fromBirthdateEpochMs({ birthdate: veryOldBirthdateTimestamp, now: nowTimestamp }),
      ).toThrow(AgeYearsError.Invalid);
    });

    test("respects lower bound", () => {
      const nowTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");
      const sameDayBirthdateTimestamp = toTimestamp("2025-09-30T00:00:00.000Z");

      expect(() =>
        Age.fromBirthdateEpochMs({ birthdate: sameDayBirthdateTimestamp, now: nowTimestamp }),
      ).toThrow(AgeYearsError.Invalid);
    });
  });

  describe("fromBirthdate", () => {
    test("birthday has already happened this year", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-09-01T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
    });

    test("birthday has NOT yet happened this year", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-10-01T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(24);
    });

    test("exactly on birthday", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2000-09-30T00:00:00.000Z";

      expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
    });

    test("rejects future birthdates", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2025-10-01T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrowError(AgeError.FutureBirthdate);
    });

    test("rejects above upper bound", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "1800-01-01T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Invalid);
    });

    test("respects lower bound", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "2025-09-30T00:00:00.000Z";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Invalid);
    });

    test("invalid date string throws", () => {
      const now = toTimestamp("2025-09-30T00:00:00.000Z");
      const birthdate = "not-a-date";

      expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Type);
    });
  });

  test("serializes to primitive via toJSON and toString", () => {
    const age = Age.fromValue(42);

    expect(JSON.stringify({ age })).toEqual('{"age":42}');
    expect(String(age)).toEqual("42");
  });
});
