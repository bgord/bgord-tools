import { describe, expect, test } from "bun:test";
import { FilenameFromString, FilenameInvalidError, FilenameTypeError } from "../src/filename-from-string.vo";

describe("FilenameFromStringSchema", () => {
  test("parses 'avatar.WEBP' and normalizes extension to lowercase", () => {
    // @ts-expect-error
    expect(FilenameFromString.parse("avatar.WEBP")).toEqual({ basename: "avatar", extension: "webp" });
  });

  test("trims and parses '  report .PNG '", () => {
    // @ts-expect-error
    expect(FilenameFromString.parse("  report .PNG ")).toEqual({
      basename: "report",
      extension: "png",
    });
  });

  test("rejects missing extension 'avatar'", () => {
    expect(() => FilenameFromString.parse("avatar")).toThrow(FilenameInvalidError);
  });

  test("rejects leading dot only '.png' (no basename)", () => {
    expect(() => FilenameFromString.parse(".png")).toThrow(FilenameInvalidError);
  });

  test("rejects trailing dot 'name.' (no extension)", () => {
    expect(() => FilenameFromString.parse("name.")).toThrow(FilenameInvalidError);
  });

  test("rejects non-string (number)", () => {
    expect(() => FilenameFromString.parse(123)).toThrow(FilenameTypeError);
  });
});
