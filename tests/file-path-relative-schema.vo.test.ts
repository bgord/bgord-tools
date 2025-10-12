import { describe, expect, test } from "bun:test";
import { DirectoryPathRelativeSchema } from "../src/directory-path-relative.vo";
import { FilePathRelativeSchema, FilePathRelativeSchemaError } from "../src/file-path-relative-schema.vo";

describe("FilePathRelativeSchema", () => {
  test("happy path", () => {
    expect({
      directory: FilePathRelativeSchema.parse("tmp/file.txt").directory,
      filename: FilePathRelativeSchema.parse("tmp/file.txt").filename.get(),
    }).toEqual({ directory: DirectoryPathRelativeSchema.parse("tmp"), filename: "file.txt" });

    expect({
      directory: FilePathRelativeSchema.parse("a/b/c/avatar.webp").directory,
      filename: FilePathRelativeSchema.parse("a/b/c/avatar.webp").filename.get(),
    }).toEqual({ directory: DirectoryPathRelativeSchema.parse("a/b/c"), filename: "avatar.webp" });

    expect({
      directory: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").directory,
      filename: FilePathRelativeSchema.parse("dir/sub/archive.tar.gz").filename.get(),
    }).toEqual({ directory: DirectoryPathRelativeSchema.parse("dir/sub"), filename: "archive.tar.gz" });
  });

  test("rejects empty", () => {
    expect(() => FilePathRelativeSchema.parse("")).toThrow(FilePathRelativeSchemaError.Empty);
  });

  test("rejects leading slash", () => {
    expect(() => FilePathRelativeSchema.parse("/tmp/file.txt")).toThrow(
      FilePathRelativeSchemaError.LeadingSlash,
    );
  });

  test("rejects backslash", () => {
    expect(() => FilePathRelativeSchema.parse("tmp\\file.txt")).toThrow(
      FilePathRelativeSchemaError.BackslashForbidden,
    );
  });

  test("rejects no directory", () => {
    expect(() => FilePathRelativeSchema.parse("file.txt")).toThrow(
      FilePathRelativeSchemaError.RequiresDirectory,
    );
  });

  test("rejects non-string", () => {
    expect(() => FilePathRelativeSchema.parse(123)).toThrow(FilePathRelativeSchemaError.Type);
  });

  describe("delegated failures", () => {
    const cases = [
      "tmp/./file.txt",
      "tmp/../file.txt",
      "tmp/\u0000/sub/file.txt",
      "my dir/file.txt",
      "tmp/file",
      "tmp/file name.txt",
      "tmp/",
    ];

    for (const input of cases) {
      test(`fails "${input}"`, () => expect(() => FilePathRelativeSchema.parse(input)).toThrow());
    }
  });
});
