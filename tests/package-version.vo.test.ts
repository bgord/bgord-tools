import { describe, expect, test } from "bun:test";
import { PackageVersion } from "../src/package-version.vo";

describe("PackageVersion", () => {
  describe("isGreaterThanOrEqual method", () => {
    test("major version is greater", () => {
      expect(new PackageVersion(2, 1, 0).isGreaterThanOrEqual(new PackageVersion(1, 9, 3))).toEqual(true);
    });

    test("major version is smaller", () => {
      expect(new PackageVersion(1, 9, 3).isGreaterThanOrEqual(new PackageVersion(2, 1, 0))).toEqual(false);
    });

    test("major version is the same, minor version is greater", () => {
      expect(new PackageVersion(1, 9, 0).isGreaterThanOrEqual(new PackageVersion(1, 8, 5))).toEqual(true);
    });

    test("major version is the same, minor version is smaller", () => {
      expect(new PackageVersion(1, 8, 5).isGreaterThanOrEqual(new PackageVersion(1, 9, 0))).toEqual(false);
    });

    test("major and minor versions are the same, patch version is greater", () => {
      expect(new PackageVersion(1, 9, 5).isGreaterThanOrEqual(new PackageVersion(1, 9, 4))).toEqual(true);
    });

    test("major and minor versions are the same, patch version is smaller", () => {
      expect(new PackageVersion(1, 9, 4).isGreaterThanOrEqual(new PackageVersion(1, 9, 5))).toEqual(false);
    });

    test("versions are the same", () => {
      expect(new PackageVersion(1, 9, 4).isGreaterThanOrEqual(new PackageVersion(1, 9, 4))).toEqual(true);
    });
  });

  describe("fromStringWithV method", () => {
    // @ts-expect-error Inspect private attributes
    expect(PackageVersion.fromStringWithV("v1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  });

  describe("fromStringWith method", () => {
    // @ts-expect-error Inspect private attributes
    expect(PackageVersion.fromString("1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  });

  test("toString", () => {
    expect(PackageVersion.fromString("5.0.1").toString()).toEqual("5.0.1");
  });
});
