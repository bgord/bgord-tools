import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";
import { FilePathRelativeSchema } from "../src/file-path-relative-schema.vo";

describe("FilePathRelativeSchema", () => {
  test("happy path", () => {
    expect({
      directory: v.parse(FilePathRelativeSchema, "tmp/file.txt").directory,
      filename: v.parse(FilePathRelativeSchema, "tmp/file.txt").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "tmp"), filename: "file.txt" });
    expect({
      directory: v.parse(FilePathRelativeSchema, "a/b/c/avatar.webp").directory,
      filename: v.parse(FilePathRelativeSchema, "a/b/c/avatar.webp").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "a/b/c"), filename: "avatar.webp" });
    expect({
      directory: v.parse(FilePathRelativeSchema, "dir/sub/archive.tar.gz").directory,
      filename: v.parse(FilePathRelativeSchema, "dir/sub/archive.tar.gz").filename.get(),
    }).toEqual({ directory: v.parse(DirectoryPathRelativeSchema, "dir/sub"), filename: "archive.tar.gz" });
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(FilePathRelativeSchema, null)).toThrow("file.path.relative.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(FilePathRelativeSchema, 123)).toThrow("file.path.relative.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(FilePathRelativeSchema, "")).toThrow("file.path.relative.empty");
  });

  test("rejects leading slash", () => {
    expect(() => v.parse(FilePathRelativeSchema, "/tmp/file.txt")).toThrow(
      "file.path.relative.leading.slash",
    );
  });

  test("rejects backslash", () => {
    expect(() => v.parse(FilePathRelativeSchema, "tmp\\file.txt")).toThrow(
      "file.path.relative.backslash.forbidden",
    );
  });

  test("rejects no directory", () => {
    expect(() => v.parse(FilePathRelativeSchema, "file.txt")).toThrow(
      "file.path.relative.requires.directory",
    );
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
      expect(() => v.parse(FilePathRelativeSchema, value)).toThrow();
    }
  });
});
