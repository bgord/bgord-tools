import { describe, expect, test } from "bun:test";
import {
  DirectoryPathAbsoluteError,
  DirectoryPathAbsoluteSchema,
  type DirectoryPathAbsoluteType,
} from "../src/directory-path-absolute.vo";

describe("DirectoryPathAbsoluteSchema", () => {
  test("accepts '/tmp/app/users' as-is", () => {
    expect(DirectoryPathAbsoluteSchema.parse("/tmp/app/users")).toEqual(
      "/tmp/app/users" as DirectoryPathAbsoluteType,
    );
  });

  test("normalizes '/tmp//app///users/' to '/tmp/app/users'", () => {
    expect(DirectoryPathAbsoluteSchema.parse("/tmp//app///users/")).toEqual(
      "/tmp/app/users" as DirectoryPathAbsoluteType,
    );
  });

  test("accepts root '/' as-is", () => {
    expect(DirectoryPathAbsoluteSchema.parse("/")).toEqual("/" as DirectoryPathAbsoluteType);
  });

  test("rejects relative path 'tmp/app'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("tmp/app")).toThrow(
      DirectoryPathAbsoluteError.AbsDirMustStartWithSlashError,
    );
  });

  test("rejects backslash '/tmp\\app'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\\app")).toThrow(
      DirectoryPathAbsoluteError.AbsDirBackslashForbiddenError,
    );
  });

  test("rejects control chars '/tmp\\napp'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp\napp")).toThrow(
      DirectoryPathAbsoluteError.AbsDirControlCharsForbiddenError,
    );
  });

  test("rejects dot-segment '/tmp/../etc'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/../etc")).toThrow(
      DirectoryPathAbsoluteError.AbsDirBadSegmentsError,
    );
  });

  test("rejects dot-segment '/tmp/./users'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/./users")).toThrow(
      DirectoryPathAbsoluteError.AbsDirBadSegmentsError,
    );
  });

  test("rejects invalid segment '/tmp/app/invalid segment'", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse("/tmp/app/invalid segment")).toThrow(
      DirectoryPathAbsoluteError.AbsDirBadSegmentsError,
    );
  });

  test("rejects non-string (number)", () => {
    expect(() => DirectoryPathAbsoluteSchema.parse(42)).toThrow(DirectoryPathAbsoluteError.AbsDirTypeError);
  });
});
