import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";
import { FilePathRelativeSchema } from "../src/file-path-relative-schema.vo";

describe("FilePathRelativeSchema", () => {
  test("happy path", () => {
    expect({
      directory: FilePathRelativeSchema.parse("tmp/file.txt").directory,
      filename: FilePathRelativeSchema.parse("tmp/file.txt").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "tmp"), filename: "file.txt" });

    expect({
      directory: FilePathRelativeSchema.parse("a/b/c/avatar.webp").directory,
      filename: FilePathRelativeSchema.parse("a/b/c/avatar.webp").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "a/b/c"), filename: "avatar.webp" });

    expect({
      directory: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").directory,
      filename: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "dir/sub"), filename: "archive.tar.gz" });
  });

  test("rejects non-string - null", () => {
    expect(() => FilePathRelativeSchema.parse(null)).toThrow("file.path.relative.type");
  });

  test("rejects non-string - number", () => {
    expect(() => FilePathRelativeSchema.parse(123)).toThrow("file.path.relative.type");
  });

  test("rejects empty", () => {
    expect(() => FilePathRelativeSchema.parse("")).toThrow("file.path.relative.empty");
  });

  test("rejects leading slash", () => {
    expect(() => FilePathRelativeSchema.parse("/tmp/file.txt")).toThrow("file.path.relative.leading.slash");
  });

  test("rejects backslash", () => {
    expect(() => FilePathRelativeSchema.parse("tmp\\file.txt")).toThrow(
      "file.path.relative.backslash.forbidden",
    );
  });

  test("rejects no directory", () => {
    expect(() => FilePathRelativeSchema.parse("file.txt")).toThrow("file.path.relative.requires.directory");
  });

  test("delegated failures", () => {
    const invalid = [
      "tmp/./file.txt",
      "tmp/../file.txt",
      "tmp/\u0000/sub/file.txt",
      "my dir/file.txt",
      "tmp/file",
      "tmp/file name.txt",
      "tmp/",
    ];

    for (const value of invalid) {
      expect(() => FilePathRelativeSchema.parse(value)).toThrow();
    }
  });
});
