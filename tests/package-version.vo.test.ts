import { describe, expect, test } from "bun:test";
import { PackageVersion } from "../src/package-version.vo";

describe("PackageVersion", () => {
  describe("isGreaterThanOrEqual method", () => {
    test("major version is greater", () => {
      const first = new PackageVersion(2, 1, 0);
      const second = new PackageVersion(1, 9, 3);
      expect(first.isGreaterThanOrEqual(second)).toEqual(true);
    });

    test("major version is smaller", () => {
      const first = new PackageVersion(1, 9, 3);
      const second = new PackageVersion(2, 1, 0);
      expect(first.isGreaterThanOrEqual(second)).toEqual(false);
    });

    test("major version is the same, minor version is greater", () => {
      const first = new PackageVersion(1, 9, 0);
      const second = new PackageVersion(1, 8, 5);
      expect(first.isGreaterThanOrEqual(second)).toEqual(true);
    });

    test("major version is the same, minor version is smaller", () => {
      const first = new PackageVersion(1, 8, 5);
      const second = new PackageVersion(1, 9, 0);
      expect(first.isGreaterThanOrEqual(second)).toEqual(false);
    });

    test("major and minor versions are the same, patch version is greater", () => {
      const first = new PackageVersion(1, 9, 5);
      const second = new PackageVersion(1, 9, 4);
      expect(first.isGreaterThanOrEqual(second)).toEqual(true);
    });

    test("major and minor versions are the same, patch version is smaller", () => {
      const first = new PackageVersion(1, 9, 4);
      const second = new PackageVersion(1, 9, 5);
      expect(first.isGreaterThanOrEqual(second)).toEqual(false);
    });

    test("versions are the same", () => {
      const first = new PackageVersion(1, 9, 4);
      const second = new PackageVersion(1, 9, 4);
      expect(first.isGreaterThanOrEqual(second)).toEqual(true);
    });
  });

  describe("fromStringWithV method", () => {
    test("parses correct version", () => {
      const result = PackageVersion.fromStringWithV("v1.0.0");
      expect(result.major).toEqual(1);
      expect(result.minor).toEqual(0);
      expect(result.patch).toEqual(0);
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

    test("works for correct string", () => {
      expect(PackageVersion.fromStringWithV("v1.1.1").major).toEqual(1);
      expect(PackageVersion.fromStringWithV("v1.1.1").minor).toEqual(1);
      expect(PackageVersion.fromStringWithV("v1.1.1").patch).toEqual(1);
    });
  });

  test("toString", () => {
    const version = PackageVersion.fromString("5.0.1");
    expect(version.toString()).toEqual("5.0.1");
  });
});
