import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Basename } from "../src/basename.vo";
import { Extension } from "../src/extension.vo";
import { FilenameFromString } from "../src/filename-from-string.vo";

describe("FilenameFromString", () => {
  test("happy path", () => {
    expect(FilenameFromString.parse("avatar.WEBP")).toEqual({
      basename: v.parse(Basename, "avatar"),
      extension: v.parse(Extension, "webp"),
    });
  });

  test("rejects prefix", () => {
    expect(() => FilenameFromString.parse("\navatar.png")).toThrow("filename.from.string.invalid");
  });

  test("rejects suffix", () => {
    expect(() => FilenameFromString.parse("avatar.png\n")).toThrow("filename.from.string.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => FilenameFromString.parse(null)).toThrow("filename.from.string.type");
  });

  test("rejects non-string - number", () => {
    expect(() => FilenameFromString.parse(123)).toThrow("filename.from.string.type");
  });

  test("rejects empty", () => {
    expect(() => FilenameFromString.parse("")).toThrow("filename.from.string.invalid");
  });

  test("rejects missing extension", () => {
    expect(() => FilenameFromString.parse("avatar")).toThrow("filename.from.string.invalid");
  });

  test("rejects missing extension with dot", () => {
    expect(() => FilenameFromString.parse("name.")).toThrow("filename.from.string.invalid");
  });

  test("rejects only an extension", () => {
    expect(() => FilenameFromString.parse(".png")).toThrow("filename.from.string.invalid");
  });
});
