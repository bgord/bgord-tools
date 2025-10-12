import { describe, expect, test } from "bun:test";
import { DirectoryPathAbsoluteSchema } from "../src/directory-path-absolute.vo";
import { FilePathAbsoluteSchema, FilePathAbsoluteSchemaError } from "../src/file-path-absolute-schema.vo";

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

  test("rejects non-string", () => {
    expect(() => FilePathAbsoluteSchema.parse(123)).toThrow(FilePathAbsoluteSchemaError.Type);
  });

  test("rejects empty", () => {
    expect(() => FilePathAbsoluteSchema.parse("")).toThrow(FilePathAbsoluteSchemaError.Empty);
  });

  test("rejects lacking leading slash", () => {
    expect(() => FilePathAbsoluteSchema.parse("var/uploads/avatar.webp")).toThrow(
      FilePathAbsoluteSchemaError.LeadingSlash,
    );
  });

  test("rejects backslashes", () => {
    expect(() => FilePathAbsoluteSchema.parse("/var\\uploads/avatar.webp")).toThrow(
      FilePathAbsoluteSchemaError.BackslashForbidden,
    );
  });

  test("rejects trailing slash", () => {
    expect(() => FilePathAbsoluteSchema.parse("/var/uploads/avatar.webp/")).toThrow(
      FilePathAbsoluteSchemaError.TrailingSlash,
    );
  });

  test("single-segment path keeps root directory", () => {
    expect({
      directory: FilePathAbsoluteSchema.parse("/avatar.webp").directory,
      filename: FilePathAbsoluteSchema.parse("/avatar.webp").filename.get(),
    }).toEqual({ directory: DirectoryPathAbsoluteSchema.parse("/"), filename: "avatar.webp" });
  });

  describe("delegated failures", () => {
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
});
