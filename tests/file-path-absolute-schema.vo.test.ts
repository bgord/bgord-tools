import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";
import { FilePathAbsoluteSchema } from "../src/file-path-absolute-schema.vo";

describe("FilePathAbsoluteSchema", () => {
  test("happy path", () => {
    expect({
      directory: v.parse(FilePathAbsoluteSchema, "/avatar.webp").directory,
      filename: v.parse(FilePathAbsoluteSchema, "/avatar.webp").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathAbsoluteSchema, "/"), filename: "avatar.webp" });
    expect({
      directory: v.parse(FilePathAbsoluteSchema, "/var/uploads/avatar.webp").directory,
      filename: v.parse(FilePathAbsoluteSchema, "/var/uploads/avatar.webp").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathAbsoluteSchema, "/var/uploads"), filename: "avatar.webp" });
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, 123)).toThrow("file.path.absolute.type");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, null)).toThrow("file.path.absolute.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, "")).toThrow("file.path.absolute.empty");
  });

  test("rejects lacking leading slash", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, "var/uploads/avatar.webp")).toThrow(
      "file.path.absolute.leading.slash",
    );
  });

  test("rejects backslashes", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, "/var\\uploads/avatar.webp")).toThrow(
      "file.path.absolute.backslash.forbidden",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => v.parse(FilePathAbsoluteSchema, "/var/uploads/avatar.webp/")).toThrow(
      "file.path.absolute.trailing.slash",
    );
  });

  test("single-segment path keeps root directory", () => {
    expect({
      directory: v.parse(FilePathAbsoluteSchema, "/avatar.webp").directory,
      filename: v.parse(FilePathAbsoluteSchema, "/avatar.webp").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathAbsoluteSchema, "/"), filename: "avatar.webp" });
  });

  test("delegated failures", () => {
    const invalid = [
      "/var/./avatar.webp",
      "/var/../avatar.webp",
      "/var/\u0000/uploads/avatar.webp",
      "/var/uploads/",
      "/var/uploads/avatar",
      "/var/upload s/avatar.webp",
    ];
    for (const value of invalid) {
      expect(() => v.parse(FilePathAbsoluteSchema, value)).toThrow();
    }
  });
});
