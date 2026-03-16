import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { PackageVersion } from "../src/package-version.vo";
import { PackageVersionSchema } from "../src/package-version-schema.vo";

describe("PackageVersion", () => {
  test("fromVersionString", () => {
    const version = PackageVersion.fromVersionString("v1.2.3");

    expect(version.toJSON()).toEqual({ major: 1, minor: 2, patch: 3 });
  });

  test("fromVersionStringSafe", () => {
    const version = PackageVersion.fromVersionStringSafe(v.parse(PackageVersionSchema, "v1.2.3"));

    expect(version.toJSON()).toEqual({ major: 1, minor: 2, patch: 3 });
  });

  test("equals - true", () => {
    const left = PackageVersion.fromString("1.2.3");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.equals(right)).toEqual(true);
  });

  test("equals - false - major mismatch", () => {
    const left = PackageVersion.fromString("2.1.1");
    const right = PackageVersion.fromString("1.1.1");

    expect(left.equals(right)).toEqual(false);
  });

  test("equals - false - minor mismatch", () => {
    const left = PackageVersion.fromString("1.2.1");
    const right = PackageVersion.fromString("1.1.1");

    expect(left.equals(right)).toEqual(false);
  });

  test("equals - false - patch mismatch", () => {
    const left = PackageVersion.fromString("1.1.2");
    const right = PackageVersion.fromString("1.1.1");

    expect(left.equals(right)).toEqual(false);
  });

  test("greater - major", () => {
    const left = PackageVersion.fromString("2.0.0");
    const right = PackageVersion.fromString("1.9.9");

    expect(left.isGreaterThan(right)).toEqual(true);
    expect(right.isGreaterThan(left)).toEqual(false);
  });

  test("greater - minor", () => {
    const left = PackageVersion.fromString("1.2.0");
    const right = PackageVersion.fromString("1.1.9");

    expect(left.isGreaterThan(right)).toEqual(true);
    expect(right.isGreaterThan(left)).toEqual(false);
  });

  test("greater - patch", () => {
    const left = PackageVersion.fromString("1.1.2");
    const right = PackageVersion.fromString("1.1.1");

    expect(left.isGreaterThan(right)).toEqual(true);
    expect(right.isGreaterThan(left)).toEqual(false);
  });

  test("greater - false - equal", () => {
    const left = PackageVersion.fromString("1.2.3");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isGreaterThan(right)).toEqual(false);
  });

  test("greater - false - major smaller", () => {
    const left = PackageVersion.fromString("1.0.0");
    const right = PackageVersion.fromString("2.0.0");

    expect(left.isGreaterThan(right)).toEqual(false);
  });

  test("greater - false - minor smaller", () => {
    const left = PackageVersion.fromString("1.1.0");
    const right = PackageVersion.fromString("1.2.0");

    expect(left.isGreaterThan(right)).toEqual(false);
  });

  test("greaterOrEqual - equal", () => {
    const left = PackageVersion.fromString("1.2.3");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isGreaterThanOrEqual(right)).toEqual(true);
  });

  test("greaterOrEqual - greater", () => {
    const left = PackageVersion.fromString("1.2.4");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isGreaterThanOrEqual(right)).toEqual(true);
  });

  test("greaterOrEqual - false - smaller", () => {
    const left = PackageVersion.fromString("1.2.2");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isGreaterThanOrEqual(right)).toEqual(false);
  });

  test("smaller - major", () => {
    const left = PackageVersion.fromString("1.0.0");
    const right = PackageVersion.fromString("2.0.0");

    expect(left.isSmallerThan(right)).toEqual(true);
    expect(right.isSmallerThan(left)).toEqual(false);
  });

  test("smaller - minor", () => {
    const left = PackageVersion.fromString("1.1.0");
    const right = PackageVersion.fromString("1.2.0");

    expect(left.isSmallerThan(right)).toEqual(true);
    expect(right.isSmallerThan(left)).toEqual(false);
  });

  test("smaller - patch", () => {
    const left = PackageVersion.fromString("1.1.1");
    const right = PackageVersion.fromString("1.1.2");

    expect(left.isSmallerThan(right)).toEqual(true);
    expect(right.isSmallerThan(left)).toEqual(false);
  });

  test("smaller - false - equal", () => {
    const left = PackageVersion.fromString("1.2.3");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isSmallerThan(right)).toEqual(false);
  });

  test("smaller - false - major greater", () => {
    const left = PackageVersion.fromString("2.0.0");
    const right = PackageVersion.fromString("1.0.0");

    expect(left.isSmallerThan(right)).toEqual(false);
  });

  test("smaller - false - minor greater", () => {
    const left = PackageVersion.fromString("1.2.0");
    const right = PackageVersion.fromString("1.1.0");

    expect(left.isSmallerThan(right)).toEqual(false);
  });

  test("smallerOrEqual - equal", () => {
    const left = PackageVersion.fromString("1.2.3");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isSmallerThanOrEqual(right)).toEqual(true);
  });

  test("smallerOrEqual - smaller", () => {
    const left = PackageVersion.fromString("1.2.2");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isSmallerThanOrEqual(right)).toEqual(true);
  });

  test("smallerOrEqual - false - greater", () => {
    const left = PackageVersion.fromString("1.2.4");
    const right = PackageVersion.fromString("1.2.3");

    expect(left.isSmallerThanOrEqual(right)).toEqual(false);
  });

  test("toString", () => {
    const version = PackageVersion.fromString("3.4.5");

    expect(version.toString()).toEqual("3.4.5");
  });

  test("toJSON", () => {
    const version = PackageVersion.fromString("3.4.5");

    expect(version.toJSON()).toEqual({ major: 3, minor: 4, patch: 5 });
  });
});
