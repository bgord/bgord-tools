import { describe, expect, test } from "bun:test";
import { Age, AgeError } from "../src/age.vo";
import { AgeYears, AgeYearsError } from "../src/age-years.vo";
import { Timestamp } from "../src/timestamp.vo";

const toTimestamp = (date: string) => Timestamp.parse(new Date(date).getTime());

describe("Age", () => {
  test("fromValue", () => {
    expect(Age.fromValue(1).get()).toEqual(1);
    expect(Age.fromValue(130).get()).toEqual(130);
  });

  test("fromBirthdateEpochMs - birthday has already happened this year", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = toTimestamp("2000-09-01T00:00:00.000Z");

    expect(Age.fromBirthdateEpochMs({ birthdate, now }).get()).toEqual(25);
  });

  test("fromBirthdateEpochMs - birthday has NOT yet happened this year", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = toTimestamp("2000-10-01T00:00:00.000Z");

    expect(Age.fromBirthdateEpochMs({ birthdate, now }).get()).toEqual(24);
  });

  test("fromBirthdateEpochMs - exactly on birthday", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = toTimestamp("2000-09-30T00:00:00.000Z");

    expect(Age.fromBirthdateEpochMs({ birthdate, now }).get()).toEqual(25);
  });

  test("fromBirthdateEpochMs - rejects future birthdates", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = toTimestamp("2025-10-01T00:00:00.000Z");

    expect(() => Age.fromBirthdateEpochMs({ birthdate, now })).toThrowError(AgeError.FutureBirthdate);
  });

  test("fromBirthdateEpochMs - rejects above upper bound", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = -5364662400000;

    // @ts-expect-error
    expect(() => Age.fromBirthdateEpochMs({ birthdate, now })).toThrow(AgeYearsError.Invalid);
  });

  test("fromBirthdateEpochMs - respects lower bound", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = toTimestamp("2025-09-30T00:00:00.000Z");

    expect(() => Age.fromBirthdateEpochMs({ birthdate, now })).toThrow(AgeYearsError.Invalid);
  });

  test("fromBirthdate - birthday has already happened this year", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "2000-09-01T00:00:00.000Z";

    expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
  });

  test("fromBirthdate - birthday has NOT yet happened this year", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "2000-10-01T00:00:00.000Z";

    expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(24);
  });

  test("fromBirthdate - exactly on birthday", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "2000-09-30T00:00:00.000Z";

    expect(Age.fromBirthdate({ birthdate, now }).get()).toEqual(25);
  });

  test("fromBirthdate - rejects future birthdates", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "2025-10-01T00:00:00.000Z";

    expect(() => Age.fromBirthdate({ birthdate, now })).toThrowError(AgeError.FutureBirthdate);
  });

  test("fromBirthdate - rejects above upper bound", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "1800-01-01T00:00:00.000Z";

    expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Invalid);
  });

  test("fromBirthdate - respects lower bound", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "2025-09-30T00:00:00.000Z";

    expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Invalid);
  });

  test("fromBirthdate - invalid date string throws", () => {
    const now = toTimestamp("2025-09-30T00:00:00.000Z");
    const birthdate = "not-a-date";

    expect(() => Age.fromBirthdate({ birthdate, now })).toThrow(AgeYearsError.Type);
  });

  test("MIN", () => {
    expect(Age.MIN).toEqual(1);
  });

  test("MAX", () => {
    expect(Age.MAX).toEqual(130);
  });

  test("get", () => {
    expect(Age.fromValue(12).get()).toEqual(12);
  });

  test("compares", () => {
    const first = Age.fromValue(18);
    const second = Age.fromValue(18);

    expect(first.equals(second)).toEqual(true);
  });

  test("isOlderThan", () => {
    const youngerAge = Age.fromValue(17);
    const olderAge = Age.fromValue(18);

    expect(olderAge.isOlderThan(youngerAge)).toEqual(true);
    expect(youngerAge.isOlderThan(olderAge)).toEqual(false);
  });

  test("isOlderThan", () => {
    const youngerAge = Age.fromValue(17);
    const olderAge = Age.fromValue(18);

    expect(youngerAge.isYoungerThan(olderAge)).toEqual(true);
    expect(olderAge.isYoungerThan(youngerAge)).toEqual(false);
  });

  test("isAdult - treats exactly the same age as adult", () => {
    expect(Age.fromValue(18).isAdult(Age.fromValue(18))).toEqual(true);
  });

  test("isAdult - treats older age as adult", () => {
    expect(Age.fromValue(21).isAdult(Age.fromValue(18))).toEqual(true);
  });

  test("isAdult - treats younger age as not adult", () => {
    expect(Age.fromValue(17).isAdult(Age.fromValue(18))).toEqual(false);
  });

  test("toString", () => {
    expect(Age.fromValue(42).toString()).toEqual("42");
  });

  test("toJSON", () => {
    expect(Age.fromValue(42).toJSON()).toEqual(42);
  });
});
