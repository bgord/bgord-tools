import { describe, expect, test } from "bun:test";
import type { BasenameType } from "../src/basename.vo";
import type { ExtensionType } from "../src/extension.vo";
import { FilenameFromString, FilenameInvalidError, FilenameTypeError } from "../src/filename-from-string.vo";

describe("FilenameFromStringSchema", () => {
  test("parses 'avatar.WEBP' and normalizes extension to lowercase", () => {
    expect(FilenameFromString.parse("avatar.WEBP")).toEqual({
      basename: "avatar" as BasenameType,
      extension: "webp" as ExtensionType,
    });
  });

  test("trims and parses '  report .PNG '", () => {
    expect(FilenameFromString.parse("  report .PNG ")).toEqual({
      basename: "report" as BasenameType,
      extension: "png" as ExtensionType,
    });
  });

  test("rejects missing extension 'avatar'", () => {
    expect(() => FilenameFromString.parse("avatar")).toThrow(FilenameInvalidError);
  });

  test("rejects leading dot only '.png'", () => {
    expect(() => FilenameFromString.parse(".png")).toThrow(FilenameInvalidError);
  });

  test("rejects trailing dot 'name.'", () => {
    expect(() => FilenameFromString.parse("name.")).toThrow(FilenameInvalidError);
  });

  test("rejects non-string", () => {
    expect(() => FilenameFromString.parse(123)).toThrow(FilenameTypeError);
  });
});
