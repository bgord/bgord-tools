import { describe, expect, test } from "bun:test";
import {
  Extension,
  ExtensionBadCharsError,
  ExtensionEmptyError,
  ExtensionTooLongError,
  ExtensionTypeError,
} from "../src/extension.vo";

describe("Extension", () => {
  test("accepts 'webp'", () => {
    expect(Extension.safeParse("webp").success).toEqual(true);
  });

  test("accepts 'jpg'", () => {
    expect(Extension.safeParse("jpg").success).toEqual(true);
  });

  test("accepts '7z'", () => {
    expect(Extension.safeParse("7z").success).toEqual(true);
  });

  test("accepts and normalizes '.PNG'", () => {
    expect(Extension.safeParse(".PNG").success).toEqual(true);
  });

  test("accepts and normalizes '  JpEg  '", () => {
    expect(Extension.safeParse("  JpEg  ").success).toEqual(true);
  });

  test("rejects empty string", () => {
    expect(() => Extension.parse("")).toThrow(ExtensionEmptyError);
  });

  test("rejects single char", () => {
    expect(() => Extension.parse("a")).toThrow(ExtensionEmptyError);
  });

  test("rejects single dot '.' (becomes empty after normalize)", () => {
    expect(() => Extension.parse(".")).toThrow(ExtensionEmptyError);
  });

  test("accepts length 16", () => {
    expect(Extension.safeParse("a".repeat(16)).success).toEqual(true);
  });

  test("rejects length 17", () => {
    expect(() => Extension.parse("a".repeat(17))).toThrow(ExtensionTooLongError);
  });

  test("rejects hyphen 'web-p'", () => {
    expect(() => Extension.parse("web-p")).toThrow(ExtensionBadCharsError);
  });

  test("rejects space 'web p'", () => {
    expect(() => Extension.parse("web p")).toThrow(ExtensionBadCharsError);
  });

  test("rejects punctuation 'webp!'", () => {
    expect(() => Extension.parse("webp!")).toThrow(ExtensionBadCharsError);
  });

  test("rejects '..png' (normalizes to '.png', dot disallowed)", () => {
    expect(() => Extension.parse("..png")).toThrow(ExtensionBadCharsError);
  });

  test("rejects non-string (number)", () => {
    expect(() => Extension.parse(123)).toThrow(ExtensionTypeError);
  });

  test("rejects non-string (object)", () => {
    expect(() => Extension.parse({})).toThrow(ExtensionTypeError);
  });
});
