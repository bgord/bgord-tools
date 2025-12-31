import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";

describe("DirectoryPathAbsoluteSchema", () => {
  test("happy path", () => {
    const valid = ["/tmp/app/users", "/", "/ok.png"];

    for (const value of valid) {
      // @ts-expect-error Comparison
      expect(DirectoryPathAbsoluteSchema.safeParse(value)).toEqual({ success: true, data: value });
    }
  });

  test("rejects non-string - null", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(null)).toThrow("directory.path.absolue.type");
  });

  test("rejects non-string - number", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(42)).toThrow("directory.path.absolue.type");
  });

  test("rejects too-long", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(`/${"a".repeat(512)}`)).toThrow(
      "directory.path.absolue.too.long",
    );
  });

  test("rejects empty", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("")).toThrow("directory.path.absolue.empty");
  });

  test("rejects empty segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp//app///users/")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("tmp/app/")).toThrow(
      "directory.path.absolue.trailing.slash",
    );
  });

  test("rejects relative path", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("tmp/app")).toThrow(
      "directory.path.absolue.leading.slash",
    );
  });

  test("rejects backslash", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\\app")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects control chars", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\napp")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects dot segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/../etc")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects double-dot segment ", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/./users")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });

  test("rejects invalid segment", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/app/invalid segment")).toThrow(
      "directory.path.absolue.bad.segments",
    );
  });
});
