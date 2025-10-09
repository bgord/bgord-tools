import { describe, expect, test } from "bun:test";
import { Basename } from "../src/basename.vo";
import { Extension } from "../src/extension.vo";
import { FilenameFromString, FilenameFromStringError } from "../src/filename-from-string.vo";

describe("FilenameFromString", () => {
  test("happy path", () => {
    expect(FilenameFromString.parse("avatar.WEBP")).toEqual({
      basename: Basename.parse("avatar"),
      extension: Extension.parse("webp"),
    });
  });

  test("rejects non-string - null", () => {
    expect(() => FilenameFromString.parse(null)).toThrow(FilenameFromStringError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => FilenameFromString.parse(123)).toThrow(FilenameFromStringError.Type);
  });

  test("rejects missing extension", () => {
    expect(() => FilenameFromString.parse("avatar")).toThrow(FilenameFromStringError.Invalid);
  });

  test("rejects missing extension with dot", () => {
    expect(() => FilenameFromString.parse("name.")).toThrow(FilenameFromStringError.Invalid);
  });

  test("rejects only an extension", () => {
    expect(() => FilenameFromString.parse(".png")).toThrow(FilenameFromStringError.Invalid);
  });
});
