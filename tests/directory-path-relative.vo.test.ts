import { describe, expect, test } from "bun:test";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";

describe("DirectoryPathRelativeSchema", () => {
  test("happy path", () => {
    const valid = ["users/avatars", "users"];

    for (const value of valid) {
      // @ts-expect-error
      expect(DirectoryPathRelativeSchema.parse(value)).toEqual(value);
    }
  });

  test("rejects non-string - null", () => {
    expect(() => DirectoryPathRelativeSchema.parse(null)).toThrow("directory.path.relative.type");
  });

  test("rejects non-string - number", () => {
    expect(() => DirectoryPathRelativeSchema.parse(123)).toThrow("directory.path.relative.type");
  });

  test("rejects empty", () => {
    expect(() => DirectoryPathRelativeSchema.parse("")).toThrow("directory.path.relative.empty");
  });

  test("rejects too long", () => {
    expect(() => DirectoryPathRelativeSchema.parse(`/${"a".repeat(512)}`)).toThrow(
      "directory.path.absolue.too.long",
    );
  });

  test("rejects empty segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("tmp//app///users/")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects leading slash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("/users/avatars")).toThrow(
      "directory.path.relative.leading.slash",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("tmp/app/")).toThrow(
      "directory.path.absolue.trailing.slash",
    );
  });

  test("rejects backslash", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\\avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects control chars", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\navatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/./avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/../avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });
});
