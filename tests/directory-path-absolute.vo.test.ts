import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";

describe("DirectoryPathAbsoluteSchema", () => {
  test("happy path", () => {
    const valid = ["/tmp/app/users", "/", "/ok.png"];
    for (const value of valid) {
      expect(v.safeParse(DirectoryPathAbsoluteSchema, value)).toMatchObject({ success: true, output: value });
    }
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, null)).toThrow("directory.path.absolue.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, 42)).toThrow("directory.path.absolue.type");
  });

  test("rejects too long", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, `/${"a".repeat(512)}`)).toThrow(
      "directory.path.absolue.too.long",
    );
  });

  test("rejects empty", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "")).toThrow("directory.path.absolue.empty");
  });

  test("rejects empty segment", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp//app///users")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp/app/")).toThrow(
      "directory.path.absolue.trailing.slash",
    );
  });

  test("rejects relative path", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "tmp/app")).toThrow(
      "directory.path.absolue.leading.slash",
    );
  });

  test("rejects backslash", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp\\app")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects control chars", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp\napp")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects dot segment", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp/../etc")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects double-dot segment", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp/./users")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects invalid segment", () => {
    expect(() => v.parse(DirectoryPathAbsoluteSchema, "/tmp/app/invalid segment")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });
});
