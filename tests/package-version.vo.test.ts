import { describe, expect, test } from "bun:test";
import { PackageVersion } from "../src/package-version.vo";
import { PackageVersionSchema } from "../src/package-version-schema.vo";

describe("PackageVersion", () => {
  describe("fromVersionString method", () => {
    // @ts-expect-error Inspect private attributes
    expect(PackageVersion.fromVersionString("v1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  });

  describe("fromVersionStringSafe method", () => {
    // @ts-expect-error Inspect private attributes
    expect(PackageVersion.fromVersionStringSafe(PackageVersionSchema.parse("v1.0.0"))).toEqual({
      major: 1,
      minor: 0,
      patch: 0,
    });
  });

  describe("fromStringWith method", () => {
    // @ts-expect-error Inspect private attributes
    expect(PackageVersion.fromString("1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  });

  test("equals - true", () => {
    expect(new PackageVersion(1, 9, 4).equals(new PackageVersion(1, 9, 4))).toEqual(true);
  });

  test("equals - false - different major", () => {
    expect(new PackageVersion(1, 9, 4).equals(new PackageVersion(2, 9, 4))).toEqual(false);
  });

  test("equals - false - different minor", () => {
    expect(new PackageVersion(1, 9, 4).equals(new PackageVersion(1, 8, 4))).toEqual(false);
  });

  test("equals - false - different patch", () => {
    expect(new PackageVersion(1, 9, 4).equals(new PackageVersion(1, 9, 7))).toEqual(false);
  });

  test("isGreaterThan - true - greater all", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(0, 0, 0))).toEqual(true);
  });

  test("isGreaterThan - true - greater major", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(0, 8, 4))).toEqual(true);
  });

  test("isGreaterThan - true - equal major, greater minor", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(1, 7, 4))).toEqual(true);
  });

  test("isGreaterThan - true - equal major and minor, smaller patch", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(1, 8, 3))).toEqual(true);
  });

  test("isGreaterThan - false - smaller major", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(2, 8, 4))).toEqual(false);
  });

  test("isGreaterThan - false - smaller minor", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(1, 9, 4))).toEqual(false);
  });

  test("isGreaterThan - false - smaller patch", () => {
    expect(new PackageVersion(1, 8, 4).isGreaterThan(new PackageVersion(1, 8, 5))).toEqual(false);
  });

  test("isGreaterThanOrEqual true - greater all", () => {
    expect(new PackageVersion(1, 9, 4).isGreaterThanOrEqual(new PackageVersion(0, 0, 0))).toEqual(true);
  });

  test("isGreaterThanOrEqual true - equal all", () => {
    expect(new PackageVersion(1, 9, 4).isGreaterThanOrEqual(new PackageVersion(1, 9, 4))).toEqual(true);
  });

  test("isGreaterThanOrEqual - true - equal major and minor, greater patch", () => {
    expect(new PackageVersion(1, 9, 5).isGreaterThanOrEqual(new PackageVersion(1, 9, 4))).toEqual(true);
  });

  test("isGreaterThanOrEqual - true - greater major", () => {
    expect(new PackageVersion(2, 1, 0).isGreaterThanOrEqual(new PackageVersion(1, 9, 3))).toEqual(true);
  });

  test("isGreaterThanOrEqual - true - equal major, greater minor", () => {
    expect(new PackageVersion(1, 9, 0).isGreaterThanOrEqual(new PackageVersion(1, 8, 5))).toEqual(true);
  });

  test("isGreaterThanOrEqual - false - smaller major", () => {
    expect(new PackageVersion(1, 9, 3).isGreaterThanOrEqual(new PackageVersion(2, 1, 0))).toEqual(false);
  });

  test("isGreaterThanOrEqual - false - equal major, smaller minor", () => {
    expect(new PackageVersion(1, 8, 5).isGreaterThanOrEqual(new PackageVersion(1, 9, 0))).toEqual(false);
  });

  test("isGreaterThanOrEqual - false - equal major and minor, smaller patch", () => {
    expect(new PackageVersion(1, 9, 4).isGreaterThanOrEqual(new PackageVersion(1, 9, 5))).toEqual(false);
  });

  test("toString", () => {
    expect(PackageVersion.fromString("5.0.1").toString()).toEqual("5.0.1");
  });

  test("toJSON", () => {
    expect(PackageVersion.fromString("5.0.1").toJSON()).toEqual({ major: 5, minor: 0, patch: 1 });
  });
});
