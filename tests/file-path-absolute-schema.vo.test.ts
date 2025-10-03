import { describe, expect, test } from "bun:test";
import type { DirectoryPathAbsoluteType } from "../src/directory-path-absolute.vo";
import {
  AbsFilePathBackslashForbiddenError,
  AbsFilePathMissingFilenameError,
  AbsFilePathMustStartWithSlashError,
  AbsFilePathTypeError,
  FilePathAbsoluteSchema,
} from "../src/file-path-absolute-schema.vo";

describe("FilePathAbsoluteSchema", () => {
  describe("valid inputs", () => {
    test(`parses "/avatar.webp"`, () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("/avatar.webp").directory,
        filename: FilePathAbsoluteSchema.parse("/avatar.webp").filename.get(),
      }).toEqual({ directory: "/" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });

    test(`parses "/var/uploads/avatar.webp"`, () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp").directory,
        filename: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp").filename.get(),
      }).toEqual({ directory: "/var/uploads" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });

    test(`parses "   /var//uploads///avatar.webp   " (trims & collapses)`, () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("   /var//uploads///avatar.webp   ").directory,
        filename: FilePathAbsoluteSchema.parse("   /var//uploads///avatar.webp   ").filename.get(),
      }).toEqual({ directory: "/var/uploads" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });

    test(`parses "/var/uploads/avatar.webp/" (trailing slash removed)`, () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp/").directory,
        filename: FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp/").filename.get(),
      }).toEqual({ directory: "/var/uploads" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });

    test(`parses "///avatar.webp" (leading slashes collapse)`, () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("///avatar.webp").directory,
        filename: FilePathAbsoluteSchema.parse("///avatar.webp").filename.get(),
      }).toEqual({ directory: "/" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });
  });

  describe("explicit refine errors", () => {
    test(`rejects "var/uploads/avatar.webp"`, () => {
      expect(() => FilePathAbsoluteSchema.parse("var/uploads/avatar.webp")).toThrow(
        AbsFilePathMustStartWithSlashError,
      );
    });

    test(`rejects "/var\\uploads/avatar.webp"`, () => {
      expect(() => FilePathAbsoluteSchema.parse("/var\\uploads/avatar.webp")).toThrow(
        AbsFilePathBackslashForbiddenError,
      );
    });

    test(`rejects "/" (missing filename)`, () => {
      expect(() => FilePathAbsoluteSchema.parse("/")).toThrow(AbsFilePathMissingFilenameError);
    });

    test("rejects non-string", () => {
      expect(() => FilePathAbsoluteSchema.parse(123)).toThrow(AbsFilePathTypeError);
    });
  });

  describe("delegated failures (directory/filename VOs)", () => {
    for (const input of [
      "/var/./avatar.webp",
      "/var/../avatar.webp",
      "/var/\u0000/uploads/avatar.webp",
      "/var/uploads/",
      "/var/uploads/avatar",
      "/var/upload s/avatar.webp",
    ] as const) {
      test(`fails "${input}"`, () => {
        expect(() => FilePathAbsoluteSchema.parse(input)).toThrow();
      });
    }
  });

  describe("regression guards", () => {
    test("single-segment path keeps root directory", () => {
      expect({
        directory: FilePathAbsoluteSchema.parse("/avatar.webp").directory,
        filename: FilePathAbsoluteSchema.parse("/avatar.webp").filename.get(),
      }).toEqual({ directory: "/" as DirectoryPathAbsoluteType, filename: "avatar.webp" });
    });
  });
});
