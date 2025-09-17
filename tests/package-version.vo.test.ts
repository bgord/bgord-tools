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
    test("parses correct version", () => {
      expect(PackageVersion.fromStringWithV("v1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 } as any);
    });

    test("throws when no v included", () => {
      expect(() => PackageVersion.fromStringWithV("1.0.0")).toThrow();
    });

    test("throws when no major is not a number", () => {
      expect(() => PackageVersion.fromStringWithV("vx.0.0")).toThrow();
    });

    test("throws when no dot after major is not a number", () => {
      expect(() => PackageVersion.fromStringWithV("vx0.0")).toThrow();
    });

    test("throws when no minor is not a number", () => {
      expect(() => PackageVersion.fromStringWithV("v1.x.0")).toThrow();
    });

    test("throws when no minor is not a number", () => {
      expect(() => PackageVersion.fromStringWithV("v1.x0")).toThrow();
    });

    test("throws when no patch is not a number", () => {
      expect(() => PackageVersion.fromStringWithV("v1.1.x")).toThrow();
    });

    test("throws when no dots at all", () => {
      expect(() => PackageVersion.fromStringWithV("v111")).toThrow();
    });
  });

  test("toString", () => {
    expect(PackageVersion.fromString("5.0.1").toString()).toEqual("5.0.1");
  });
});
