import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { PackageVersionSchema } from "../src/package-version-schema.vo";

describe("PackageVersionSchema", () => {
  test("happy path", () => {
    const valid = ["v0.0.0", "v1.10.0", "v9999.9999.9999"];
    for (const value of valid) {
      expect(v.safeParse(PackageVersionSchema, value).success).toEqual(true);
    }
  });

  test("the v prefix is optional", () => {
    const valid = ["0.0.0", "1.10.0", "9999.9999.9999"];
    for (const value of valid) {
      expect(v.safeParse(PackageVersionSchema, value).success).toEqual(true);
    }
  });

  test("rejects prefix", () => {
    expect(() => v.parse(PackageVersionSchema, " v1.0.0")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(PackageVersionSchema, "v1.0.0 ")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects empty value", () => {
    expect(() => v.parse(PackageVersionSchema, "")).toThrow("package.version.schema.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(PackageVersionSchema, null)).toThrow("package.version.schema.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(PackageVersionSchema, 123)).toThrow("package.version.schema.type");
  });

  test("rejects invalid values", () => {
    const invalid = ["v", "v1", "v1.0", "1.0", "vx.0.0", "v1.x.0", "v1.1.x", "vv1.0.0"];
    for (const value of invalid) {
      expect(() => v.parse(PackageVersionSchema, value)).toThrow("package.version.schema.bad.chars");
    }
  });
});
