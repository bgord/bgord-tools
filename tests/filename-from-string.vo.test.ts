import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Basename } from "../src/basename.vo";
import { Extension } from "../src/extension.vo";
import { FilenameFromString } from "../src/filename-from-string.vo";

describe("FilenameFromString", () => {
  test("happy path", () => {
    expect(v.parse(FilenameFromString, "avatar.WEBP")).toEqual({
      basename: v.parse(Basename, "avatar"),
      extension: v.parse(Extension, "webp"),
    });

    expect(v.parse(FilenameFromString, "main.min.css")).toEqual({
      basename: v.parse(Basename, "main.min"),
      extension: v.parse(Extension, "css"),
    });
  });

  test("rejects prefix", () => {
    expect(() => v.parse(FilenameFromString, "\navatar.png")).toThrow("filename.from.string.invalid");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(FilenameFromString, "avatar.png\n")).toThrow("filename.from.string.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(FilenameFromString, null)).toThrow("filename.from.string.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(FilenameFromString, 123)).toThrow("filename.from.string.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(FilenameFromString, "")).toThrow("filename.from.string.invalid");
  });

  test("rejects missing extension", () => {
    expect(() => v.parse(FilenameFromString, "avatar")).toThrow("filename.from.string.invalid");
  });

  test("rejects missing extension with dot", () => {
    expect(() => v.parse(FilenameFromString, "name.")).toThrow("filename.from.string.invalid");
  });

  test("rejects only an extension", () => {
    expect(() => v.parse(FilenameFromString, ".png")).toThrow("filename.from.string.invalid");
  });
});
