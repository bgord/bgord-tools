import { describe, expect, test } from "bun:test";
import {
  DirectoryPathRelativeSchema,
  type DirectoryPathRelativeType,
  RelDirBackslashForbiddenError,
  RelDirBadSegmentsError,
  RelDirControlCharsForbiddenError,
  RelDirEmptyError,
  RelDirMustNotStartWithSlashError,
  RelDirTypeError,
} from "../src/directory-path-relative.vo";

describe("DirectoryPathRelativeSchema", () => {
  test("accepts 'users/avatars' as-is", () => {
    expect(DirectoryPathRelativeSchema.parse("users/avatars")).toEqual(
      "users/avatars" as DirectoryPathRelativeType,
    );
  });

  test("normalizes 'users//avatars/' to 'users/avatars'", () => {
    expect(DirectoryPathRelativeSchema.parse("users//avatars/")).toEqual(
      "users/avatars" as DirectoryPathRelativeType,
    );
  });

  test("rejects leading slash '/users/avatars'", () => {
    expect(() => DirectoryPathRelativeSchema.parse("/users/avatars")).toThrow(
      RelDirMustNotStartWithSlashError,
    );
  });

  test("rejects backslash 'users\\avatars'", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\\avatars")).toThrow(RelDirBackslashForbiddenError);
  });

  test("rejects control chars 'users\\navatars'", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users\navatars")).toThrow(
      RelDirControlCharsForbiddenError,
    );
  });

  test("rejects empty (after trim) '   '", () => {
    expect(() => DirectoryPathRelativeSchema.parse("   ")).toThrow(RelDirEmptyError);
  });

  test("rejects dot segment 'users/./avatars'", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/./avatars")).toThrow(RelDirBadSegmentsError);
  });

  test("rejects dot segment 'users/../avatars'", () => {
    expect(() => DirectoryPathRelativeSchema.parse("users/../avatars")).toThrow(RelDirBadSegmentsError);
  });

  test("rejects non-string (number)", () => {
    expect(() => DirectoryPathRelativeSchema.parse(123)).toThrow(RelDirTypeError);
  });
});
