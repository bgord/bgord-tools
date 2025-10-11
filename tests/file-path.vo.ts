import { describe, expect, test } from "bun:test";
import {
  DirectoryPathAbsoluteSchema,
  type DirectoryPathAbsoluteType,
} from "../src/directory-path-absolute.vo";
import {
  DirectoryPathRelativeSchema,
  type DirectoryPathRelativeType,
} from "../src/directory-path-relative.vo";
import { FilePathAbsolute, FilePathRelative } from "../src/file-path.vo";
import { Filename } from "../src/filename.vo";

describe("FilePathRelative", () => {
  test("builds and returns a relative file path", () => {
    expect(FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp")).get()).toEqual(
      "users/avatars/avatar.webp",
    );
  });

  test("rebases to a new relative directory", () => {
    expect(
      FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp"))
        .withDirectory(DirectoryPathRelativeSchema.parse("users/pictures"))
        .get(),
    ).toEqual("users/pictures/avatar.webp");
  });

  test("converts to an absolute file path", () => {
    expect(
      FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp"))
        .toAbsolute(DirectoryPathAbsoluteSchema.parse("/tmp/app"))
        .get(),
    ).toEqual("/tmp/app/avatar.webp");
  });

  test("parses a basic relative path", () => {
    expect({
      path: FilePathRelative.fromString("tmp/file.txt").get(),
      directory: FilePathRelative.fromString("tmp/file.txt").getDirectory(),
      filename: FilePathRelative.fromString("tmp/file.txt").getFilename().get(),
    }).toEqual({ path: "tmp/file.txt", directory: "tmp" as DirectoryPathRelativeType, filename: "file.txt" });
  });

  test("parses a nested path and normalizes duplicate slashes/whitespace", () => {
    expect({
      path: FilePathRelative.fromString("  a//b///c/file.png  ").get(),
      directory: FilePathRelative.fromString("  a//b///c/file.png  ").getDirectory(),
      filename: FilePathRelative.fromString("  a//b///c/file.png  ").getFilename().get(),
    }).toEqual({
      path: "a/b/c/file.png",
      directory: "a/b/c" as DirectoryPathRelativeType,
      filename: "file.png",
    });
  });

  test("rejects absolute paths", () => {
    expect(() => FilePathRelative.fromString("/tmp/file.txt")).toThrow();
  });
});

describe("FilePathAbsolute", () => {
  test("builds and returns an absolute file path", () => {
    expect(FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp")).get()).toEqual(
      "/tmp/app/users/avatar.webp",
    );
  });

  test("rebases to a new absolute directory", () => {
    expect(
      FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp"))
        .withDirectory(DirectoryPathAbsoluteSchema.parse("/var/lib/app/users"))
        .get(),
    ).toEqual("/var/lib/app/users/avatar.webp");
  });

  test("converts to a relative file path", () => {
    expect(
      FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp"))
        .toRelative(DirectoryPathRelativeSchema.parse("users/avatars"))
        .get(),
    ).toEqual("users/avatars/avatar.webp");
  });

  test("parses a root-level file", () => {
    expect({
      path: FilePathAbsolute.fromString("/avatar.webp").get(),
      directory: FilePathAbsolute.fromString("/avatar.webp").getDirectory(),
      filename: FilePathAbsolute.fromString("/avatar.webp").getFilename().get(),
    }).toEqual({
      path: "/avatar.webp",
      directory: "/" as DirectoryPathAbsoluteType,
      filename: "avatar.webp",
    });
  });

  test("parses a nested path and normalizes duplicate slashes/whitespace", () => {
    expect({
      path: FilePathAbsolute.fromString("   /var//uploads///avatar.webp   ").get(),
      directory: FilePathAbsolute.fromString("   /var//uploads///avatar.webp   ").getDirectory(),
      filename: FilePathAbsolute.fromString("   /var//uploads///avatar.webp   ").getFilename().get(),
    }).toEqual({
      path: "/var/uploads/avatar.webp",
      directory: "/var/uploads" as DirectoryPathAbsoluteType,
      filename: "avatar.webp",
    });
  });

  test("rejects relative paths", () => {
    expect(() => FilePathAbsolute.fromString("var/uploads/avatar.webp")).toThrow();
  });
});
