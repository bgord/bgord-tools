import { describe, expect, test } from "bun:test";
import { DirectoryPathRelativeError, DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";

describe("DirectoryPathRelativeSchema", () => {
  test("happy path", () => {
    const valid = ["users/avatars", "users"];

    for (const value of valid) {
      // @ts-expect-error
      expect(DirectoryPathRelativeSchema.parse(value)).toEqual(value);
    }
  });

  test("rejects non-string - null", () => {
    expect(() => DirectoryPathRelativeSchema.parse(null)).toThrow(DirectoryPathRelativeError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => DirectoryPathRelativeSchema.parse(123)).toThrow(DirectoryPathRelativeError.Type);
  });

  test("rejects empty", () => {
    expect(() => DirectoryPathRelativeSchema.parse("")).toThrow(DirectoryPathRelativeError.Empty);
  });

  test("rejects too long", () => {
    expect(() => DirectoryPathRelativeSchema.parse(`/${"a".repeat(512)}`)).toThrow(
      DirectoryPathRelativeError.TooLong,
    );
  });

  test("rejects empty segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("tmp//app///users/")).toThrow(
      DirectoryPathRelativeError.BadSegments,
    );
  });

  test("rejects leading slash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("/users/avatars")).toThrow(
      DirectoryPathRelativeError.LeadingSlash,
    );
  });

  test("rejects trailing slash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("tmp/app/")).toThrow(
      DirectoryPathRelativeError.TrailingSlash,
    );
  });

  test("rejects backslash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\\avatars")).toThrow(
      DirectoryPathRelativeError.BadSegments,
    );
  });

  test("rejects control chars", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\navatars")).toThrow(
      DirectoryPathRelativeError.BadSegments,
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/./avatars")).toThrow(
      DirectoryPathRelativeError.BadSegments,
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/../avatars")).toThrow(
      DirectoryPathRelativeError.BadSegments,
    );
  });
});
