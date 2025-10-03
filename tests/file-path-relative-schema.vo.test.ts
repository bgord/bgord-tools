import { describe, expect, test } from "bun:test";
import type { DirectoryPathRelativeType } from "../src/directory-path-relative.vo";
import {
  FilePathRelativeSchema,
  RelFilePathBackslashForbiddenError,
  RelFilePathMustNotStartWithSlashError,
  RelFilePathRequiresDirectoryError,
  RelFilePathTypeError,
} from "../src/file-path-relative-schema.vo";

describe("FilePathRelativeSchema", () => {
  describe("valid inputs", () => {
    test(`parses "tmp/file.txt"`, () => {
      expect({
        directory: FilePathRelativeSchema.parse("tmp/file.txt").directory,
        filename: FilePathRelativeSchema.parse("tmp/file.txt").filename.get(),
      }).toEqual({ directory: "tmp" as DirectoryPathRelativeType, filename: "file.txt" });
    });

    test(`parses "a/b/c/avatar.webp"`, () => {
      expect({
        directory: FilePathRelativeSchema.parse("a/b/c/avatar.webp").directory,
        filename: FilePathRelativeSchema.parse("a/b/c/avatar.webp").filename.get(),
      }).toEqual({ directory: "a/b/c" as DirectoryPathRelativeType, filename: "avatar.webp" });
    });

    test(`parses "   tmp//deep///file.png   " (trims & collapses slashes)`, () => {
      expect({
        directory: FilePathRelativeSchema.parse("   tmp//deep///file.png   ").directory,
        filename: FilePathRelativeSchema.parse("   tmp//deep///file.png   ").filename.get(),
      }).toEqual({ directory: "tmp/deep" as DirectoryPathRelativeType, filename: "file.png" });
    });

    test(`parses "dir/sub/archive.tar.gz" (multi-dot basename)`, () => {
      expect({
        directory: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").directory,
        filename: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").filename.get(),
      }).toEqual({ directory: "dir/sub" as DirectoryPathRelativeType, filename: "archive.tar.gz" });
    });
  });

  describe("explicit refine errors", () => {
    test(`rejects "/tmp/file.txt"`, () => {
      expect(() => FilePathRelativeSchema.parse("/tmp/file.txt")).toThrow(
        RelFilePathMustNotStartWithSlashError,
      );
    });

    test(`rejects "///file.txt"`, () => {
      expect(() => FilePathRelativeSchema.parse("///file.txt")).toThrow(
        RelFilePathMustNotStartWithSlashError,
      );
    });

    test(`rejects "tmp\\file.txt"`, () => {
      expect(() => FilePathRelativeSchema.parse("tmp\\file.txt")).toThrow(RelFilePathBackslashForbiddenError);
    });

    test(`rejects "file.txt" (no directory)`, () => {
      expect(() => FilePathRelativeSchema.parse("file.txt")).toThrow(RelFilePathRequiresDirectoryError);
    });

    test(`rejects "tmp/" (trailing slash removed → "tmp")`, () => {
      expect(() => FilePathRelativeSchema.parse("tmp/")).toThrow(RelFilePathRequiresDirectoryError);
    });

    test("rejects non-string", () => {
      expect(() => FilePathRelativeSchema.parse(123)).toThrow(RelFilePathTypeError);
    });
  });

  describe("delegated failures (DirectoryPathRelativeSchema / Filename.fromString)", () => {
    const cases = [
      "tmp/./file.txt",
      "tmp/../file.txt",
      "tmp/\u0000/sub/file.txt",
      "my dir/file.txt",
      "tmp/file",
      "tmp/file name.txt",
    ] as const;

    for (const input of cases) {
      test(`fails "${input}"`, () => expect(() => FilePathRelativeSchema.parse(input)).toThrow());
    }
  });

  test("collapses duplicate slashes within directory", () => {
    expect({
      directory: FilePathRelativeSchema.parse("a///b////c/file.txt").directory,
      filename: FilePathRelativeSchema.parse("a///b////c/file.txt").filename.get(),
    }).toEqual({ directory: "a/b/c" as DirectoryPathRelativeType, filename: "file.txt" });
  });
});
