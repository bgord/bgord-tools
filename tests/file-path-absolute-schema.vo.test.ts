import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";
import { FilePathAbsoluteSchema } from "../src/file-path-absolute-schema.vo";

describe("FilePathAbsoluteSchema", () => {
  test("happy path", () => {
    expect({
      directory: FilePathAbsoluteSchema.parse("/avatar.webp").directory,
      filename: FilePathAbsoluteSchema.parse("/avatar.webp").filename.get(),
    }).toEqual({ directory: DirectoryPathAbsoluteSchema.parse("/"), filename: "avatar.webp" });

    expect({
      directory: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp").directory,
      filename: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp").filename.get(),
    }).toEqual({ directory: DirectoryPathAbsoluteSchema.parse("/var/uploads"), filename: "avatar.webp" });
  });

  test("rejects non-string - number", () => {
    expect(() => FilePathAbsoluteSchema.parse(123)).toThrow("file.path.absolute.type");
  });

  test("rejects non-string - null", () => {
    expect(() => FilePathAbsoluteSchema.parse(null)).toThrow("file.path.absolute.type");
  });

  test("rejects empty", () => {
    expect(() => FilePathAbsoluteSchema.parse("")).toThrow("file.path.absolute.empty");
  });

  test("rejects lacking leading slash", () => {
    expect(() => FilePathAbsoluteSchema.parse("var/uploads/avatar.webp")).toThrow(
      "file.path.absolute.leading.slash",
    );
  });

  test("rejects backslashes", () => {
    expect(() => FilePathAbsoluteSchema.parse("/var\\uploads/avatar.webp")).toThrow(
      "file.path.absolute.backslash.forbidden",
    );
  });

  test("rejects trailing slash", () => {
    expect(() => FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp/")).toThrow(
      "file.path.absolute.trailing.slash",
    );
  });

  test("single-segment path keeps root directory", () => {
    expect({
      directory: FilePathAbsoluteSchema.parse("/avatar.webp").directory,
      filename: FilePathAbsoluteSchema.parse("/avatar.webp").filename.get(),
    }).toEqual({ directory: DirectoryPathAbsoluteSchema.parse("/"), filename: "avatar.webp" });
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
      expect(() => FilePathAbsoluteSchema.parse(value)).toThrow();
    }
  });
});
