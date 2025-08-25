import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";
import { FilePathAbsolute, FilePathRelative } from "../src/file-path.vo";
import { Filename } from "../src/filename.vo";

describe("FilePathRelative", () => {
  test("builds and returns a relative file path", () => {
    const filename = Filename.fromString("avatar.webp");
    const relativePath = FilePathRelative.fromParts("users/avatars", filename);
    expect(relativePath.get()).toBe("users/avatars/avatar.webp");
  });

  test("rebases to a new relative directory", () => {
    const filename = Filename.fromString("avatar.webp");
    const original = FilePathRelative.fromParts("users/avatars", filename);
    const nextDirectory = DirectoryPathRelativeSchema.parse("users/pictures");
    const rebased = original.withDirectoryRelative(nextDirectory);
    expect(rebased.get()).toBe("users/pictures/avatar.webp");
  });

  test("converts to an absolute file path", () => {
    const filename = Filename.fromString("avatar.webp");
    const relativePath = FilePathRelative.fromParts("users/avatars", filename);
    const absoluteDir = DirectoryPathAbsoluteSchema.parse("/tmp/app");
    const absolutePath = relativePath.toAbsolute(absoluteDir);
    expect(absolutePath.get()).toBe("/tmp/app/avatar.webp");
  });

  test("parses a basic relative path", () => {
    const filePath = FilePathRelative.fromString("tmp/file.txt");

    expect(filePath.get()).toBe("tmp/file.txt");
    // @ts-expect-error
    expect(filePath.getDirectory()).toEqual("tmp");
    expect(filePath.getFilename().get()).toBe("file.txt");
  });

  test("parses a nested path and normalizes duplicate slashes/whitespace", () => {
    const filePath = FilePathRelative.fromString("  a//b///c/file.png  ");

    expect(filePath.get()).toBe("a/b/c/file.png");
    // @ts-expect-error
    expect(filePath.getDirectory()).toBe("a/b/c");
    expect(filePath.getFilename().get()).toBe("file.png");
  });

  test("rejects absolute paths", () => {
    expect(() => FilePathRelative.fromString("/tmp/file.txt")).toThrow();
  });
});

describe("FilePathAbsolute", () => {
  test("builds and returns an absolute file path", () => {
    const filename = Filename.fromString("avatar.webp");
    const absolutePath = FilePathAbsolute.fromParts("/tmp/app/users", filename);
    expect(absolutePath.get()).toBe("/tmp/app/users/avatar.webp");
  });

  test("rebases to a new absolute directory", () => {
    const filename = Filename.fromString("avatar.webp");
    const original = FilePathAbsolute.fromParts("/tmp/app/users", filename);
    const nextDirectory = DirectoryPathAbsoluteSchema.parse("/var/lib/app/users");
    const rebased = original.withDirectoryAbsolute(nextDirectory);
    expect(rebased.get()).toBe("/var/lib/app/users/avatar.webp");
  });

  test("converts to a relative file path", () => {
    const filename = Filename.fromString("avatar.webp");
    const absolutePath = FilePathAbsolute.fromParts("/tmp/app/users", filename);
    const relativeDir = DirectoryPathRelativeSchema.parse("users/avatars");
    const relativePath = absolutePath.toRelative(relativeDir);
    expect(relativePath.get()).toBe("users/avatars/avatar.webp");
  });

  test("parses a root-level file", () => {
    const filePath = FilePathAbsolute.fromString("/avatar.webp");

    expect(filePath.get()).toBe("/avatar.webp");
    // @ts-expect-error
    expect(filePath.getDirectory()).toBe("/");
    expect(filePath.getFilename().get()).toBe("avatar.webp");
  });

  test("parses a nested path and normalizes duplicate slashes/whitespace", () => {
    const filePath = FilePathAbsolute.fromString("   /var//uploads///avatar.webp   ");

    expect(filePath.get()).toBe("/var/uploads/avatar.webp");
    // @ts-expect-error
    expect(filePath.getDirectory()).toBe("/var/uploads");
    expect(filePath.getFilename().get()).toBe("avatar.webp");
  });

  test("rejects relative paths", () => {
    expect(() => FilePathAbsolute.fromString("var/uploads/avatar.webp")).toThrow();
  });
});
