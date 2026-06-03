import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";

describe("DirectoryPathRelativeSchema", () => {
  test("happy path", () => {
    const valid = ["USERS", "users/avatars", "node_modules/@bgord"];
    for (const value of valid) {
      expect(v.safeParse(DirectoryPathRelativeSchema, value)).toMatchObject({ success: true, output: value });
    }
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, null)).toThrow("directory.path.relative.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, 123)).toThrow("directory.path.relative.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "")).toThrow("directory.path.relative.empty");
  });

  test("rejects too long", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "a".repeat(513))).toThrow(
      "directory.path.relative.too.long",
    );
  });

  test("rejects empty segment", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "tmp//app///users")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects leading slash", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "/users/avatars")).toThrow(
      "directory.path.relative.leading.slash",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "tmp/app/")).toThrow(
      "directory.path.relative.trailing.slash",
    );
  });

  test("rejects backslash", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "users\\avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects control chars", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "users\navatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects dot segment", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "users/./avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });

  test("rejects double dot segment", () => {
    expect(() => v.parse(DirectoryPathRelativeSchema, "users/../avatars")).toThrow(
      "directory.path.relative.bad.segments",
    );
  });
});
