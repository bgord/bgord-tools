import { describe, expect, test } from "bun:test";
import { Age } from "../src/age.vo";
import { AgeYears } from "../src/age-years.vo";
import * as mocks from "./mocks";

describe("Age", () => {
  test("fromValue", () => {
    expect(Age.fromValue(0).get()).toEqual(AgeYears.parse(0));
    expect(Age.fromValue(130).get()).toEqual(AgeYears.parse(130));
  });

  test("fromValueSafe", () => {
    expect(Age.fromValueSafe(AgeYears.parse(0)).get()).toEqual(AgeYears.parse(0));
    expect(Age.fromValueSafe(AgeYears.parse(130)).get()).toEqual(AgeYears.parse(130));
  });

  test("fromBirthdateTimestamp - birthday has already happened", () => {
    expect(
      Age.fromBirthdateTimestamp({ birthdate: mocks.toTimestamp("2000-11-13"), now: mocks.TIME_ZERO }).get(),
    ).toEqual(AgeYears.parse(23));
  });

  test("fromBirthdateTimestamp - birthday has NOT yet happened", () => {
    expect(
      Age.fromBirthdateTimestamp({ birthdate: mocks.toTimestamp("2000-11-15"), now: mocks.TIME_ZERO }).get(),
    ).toEqual(AgeYears.parse(22));
  });

  test("fromBirthdateTimestamp - exactly on birthday", () => {
    expect(
      Age.fromBirthdateTimestamp({ birthdate: mocks.toTimestamp("2000-11-14"), now: mocks.TIME_ZERO }).get(),
    ).toEqual(AgeYears.parse(23));
  });

  test("fromBirthdateTimestamp - rejects future birthdates", () => {
    expect(() =>
      Age.fromBirthdateTimestamp({ birthdate: mocks.toTimestamp("2125-10-01"), now: mocks.TIME_ZERO }),
    ).toThrowError("age.future.birthdate");
  });

  test("fromBirthdate - birthday has already happened", () => {
    expect(Age.fromBirthdate({ birthdate: "2000-11-13", now: mocks.TIME_ZERO }).get()).toEqual(
      AgeYears.parse(23),
    );
  });

  test("fromBirthdate - birthday has NOT yet happened", () => {
    expect(Age.fromBirthdate({ birthdate: "2000-11-15", now: mocks.TIME_ZERO }).get()).toEqual(
      AgeYears.parse(22),
    );
  });

  test("fromBirthdate - exactly on birthday", () => {
    expect(Age.fromBirthdate({ birthdate: "2000-11-14", now: mocks.TIME_ZERO }).get()).toEqual(
      AgeYears.parse(23),
    );
  });

  test("fromBirthdate - rejects future birthdates", () => {
    expect(() => Age.fromBirthdate({ birthdate: "2125-10-01", now: mocks.TIME_ZERO })).toThrowError(
      "age.future.birthdate",
    );
  });

  test("fromBirthdate - rejects above upper bound", () => {
    expect(() => Age.fromBirthdate({ birthdate: "1800-01-01", now: mocks.TIME_ZERO })).toThrow(
      "timestamp.invalid",
    );
  });

  test("fromBirthdate - invalid date string throws", () => {
    expect(() => Age.fromBirthdate({ birthdate: "not-a-date", now: mocks.TIME_ZERO })).toThrow(
      "timestamp.invalid",
    );
  });

  test("MIN", () => {
    expect(Age.MIN).toEqual(0);
  });

  test("MAX", () => {
    expect(Age.MAX).toEqual(130);
  });

  test("get", () => {
    expect(Age.fromValue(12).get()).toEqual(AgeYears.parse(12));
  });

  test("equals - true", () => {
    const first = Age.fromValue(18);
    const second = Age.fromValue(18);

    expect(first.equals(second)).toEqual(true);
  });

  test("equals - false", () => {
    const first = Age.fromValue(18);
    const second = Age.fromValue(19);

    expect(first.equals(second)).toEqual(false);
  });

  test("isOlderThan", () => {
    const youngerAge = Age.fromValue(17);
    const olderAge = Age.fromValue(18);

    expect(olderAge.isOlderThan(youngerAge)).toEqual(true);
    expect(youngerAge.isOlderThan(olderAge)).toEqual(false);
    expect(youngerAge.isOlderThan(youngerAge)).toEqual(false);
  });

  test("isYoungerThan", () => {
    const youngerAge = Age.fromValue(17);
    const olderAge = Age.fromValue(18);

    expect(youngerAge.isYoungerThan(olderAge)).toEqual(true);
    expect(olderAge.isYoungerThan(youngerAge)).toEqual(false);
    expect(youngerAge.isYoungerThan(youngerAge)).toEqual(false);
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
