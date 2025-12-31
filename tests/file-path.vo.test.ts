import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";
import { FilePathAbsolute, FilePathRelative } from "../src/file-path.vo";
import { Filename } from "../src/filename.vo";

describe("FilePathRelative", () => {
  test("fromParts", () => {
    expect(FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp")).get()).toEqual(
      "users/avatars/avatar.webp",
    );
  });

  test("fromString", () => {
    expect({
      path: FilePathRelative.fromString("tmp/file.txt").get(),
      directory: FilePathRelative.fromString("tmp/file.txt").getDirectory(),
      filename: FilePathRelative.fromString("tmp/file.txt").getFilename().get(),
    }).toEqual({
      path: "tmp/file.txt",
      directory: DirectoryPathRelativeSchema.parse("tmp"),
      filename: "file.txt",
    });
  });

  test("rejects absolute paths", () => {
    expect(() => FilePathRelative.fromString("/tmp/file.txt")).toThrow();
  });

  test("withFilename", () => {
    expect(
      FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp"))
        .withFilename(Filename.fromString("avatar.png"))
        .get(),
    ).toEqual("users/avatars/avatar.png");
  });

  test("withDirectory", () => {
    expect(
      FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp"))
        .withDirectory(DirectoryPathRelativeSchema.parse("users/pictures"))
        .get(),
    ).toEqual("users/pictures/avatar.webp");
  });

  test("toAbsolute", () => {
    expect(
      FilePathRelative.fromParts("users/avatars", Filename.fromString("avatar.webp"))
        .toAbsolute(DirectoryPathAbsoluteSchema.parse("/tmp/app"))
        .get(),
    ).toEqual("/tmp/app/avatar.webp");
  });
});

describe("FilePathAbsolute", () => {
  test("fromParts", () => {
    expect(FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp")).get()).toEqual(
      "/tmp/app/users/avatar.webp",
    );
  });

  test("fromString", () => {
    expect({
      path: FilePathAbsolute.fromString("/avatar.webp").get(),
      directory: FilePathAbsolute.fromString("/avatar.webp").getDirectory(),
      filename: FilePathAbsolute.fromString("/avatar.webp").getFilename().get(),
    }).toEqual({
      path: "/avatar.webp",
      directory: DirectoryPathAbsoluteSchema.parse("/"),
      filename: "avatar.webp",
    });
  });

  test("rejects relative paths", () => {
    expect(() => FilePathAbsolute.fromString("var/uploads/avatar.webp")).toThrow();
  });

  test("withFilename", () => {
    expect(
      FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp"))
        .withFilename(Filename.fromString("avatar.png"))
        .get(),
    ).toEqual("/tmp/app/users/avatar.png");
  });

  test("withDirectory", () => {
    expect(
      FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp"))
        .withDirectory(DirectoryPathAbsoluteSchema.parse("/var/lib/app/users"))
        .get(),
    ).toEqual("/var/lib/app/users/avatar.webp");
  });

  test("toRelative", () => {
    expect(
      FilePathAbsolute.fromParts("/tmp/app/users", Filename.fromString("avatar.webp"))
        .toRelative(DirectoryPathRelativeSchema.parse("users/avatars"))
        .get(),
    ).toEqual("users/avatars/avatar.webp");
  });
});
