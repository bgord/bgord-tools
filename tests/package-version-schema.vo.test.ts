import { describe, expect, test } from "bun:test";
import { PackageVersionSchema } from "../src/package-version-schema.vo";

describe("PackageVersionSchema", () => {
  test("happy path", () => {
    const valid = ["v0.0.0", "v1.10.0", "v9999.9999.9999"];

    for (const value of valid) {
      expect(PackageVersionSchema.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects prefix", () => {
    expect(() => PackageVersionSchema.parse(" v1.0.0")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => PackageVersionSchema.parse("v1.0.0 ")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects empty value", () => {
    expect(() => PackageVersionSchema.parse("")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => PackageVersionSchema.parse(null)).toThrow("package.version.schema.error");
  });

  test("rejects non-string - number", () => {
    expect(() => PackageVersionSchema.parse(123)).toThrow("package.version.schema.error");
  });

  test("rejects invalid values", () => {
    const invalid = ["v", "v1", "v1.0", "0.0.0", "vx.0.0", "v1.x.0", "v1.1.x"];

    for (const value of invalid) {
      expect(() => PackageVersionSchema.parse(value)).toThrow("package.version.schema.bad.chars");
    }
  });
});
