import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteError, DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";

describe("DirectoryPathAbsoluteSchema", () => {
  test("happy path", () => {
    const valid = ["/tmp/app/users", "/", "/ok.png"];

    for (const value of valid) {
      // @ts-expect-error Comparison
      expect(DirectoryPathAbsoluteSchema.safeParse(value)).toEqual({ success: true, data: value });
    }
  });

  test("rejects non-string - null", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(null)).toThrow(DirectoryPathAbsoluteError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(42)).toThrow(DirectoryPathAbsoluteError.Type);
  });

  test("rejects too-long", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(`/${"a".repeat(512)}`)).toThrow(
      DirectoryPathAbsoluteError.TooLong,
    );
  });

  test("rejects empty", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("")).toThrow(DirectoryPathAbsoluteError.Empty);
  });

  test("rejects empty segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp//app///users/")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });

  test("rejects trailing slash", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("tmp/app/")).toThrow(
      DirectoryPathAbsoluteError.TrailingSlash,
    );
  });

  test("rejects relative path", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("tmp/app")).toThrow(
      DirectoryPathAbsoluteError.LeadingSlash,
    );
  });

  test("rejects backslash", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\\app")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });

  test("rejects control chars", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\napp")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/../etc")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });

  test("rejects double-dot segment ", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/./users")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });

  test("rejects invalid segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/app/invalid segment")).toThrow(
      DirectoryPathAbsoluteError.BadSegments,
    );
  });
});
