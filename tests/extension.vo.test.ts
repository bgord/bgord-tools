import { describe, expect, test } from "bun:test";
import { Extension, ExtensionError } from "../src/extension.vo";

describe("Extension", () => {
  test("happy path", () => {
    expect(Extension.safeParse("webp").success).toEqual(true);
    expect(Extension.safeParse("jpg").success).toEqual(true);
    expect(Extension.safeParse("7z").success).toEqual(true);
    expect(Extension.safeParse(".PNG").success).toEqual(true);
    expect(Extension.safeParse("a".repeat(16)).success).toEqual(true);
  });

  test("rejects non-string - number", () => {
    expect(() => Extension.parse(123)).toThrow(ExtensionError.Type);
  });

  test("rejects non-string - null", () => {
    expect(() => Extension.parse(null)).toThrow(ExtensionError.Type);
  });

  test("rejects empty string", () => {
    expect(() => Extension.parse("")).toThrow(ExtensionError.Empty);
  });

  test("rejects single char", () => {
    expect(() => Extension.parse("a")).toThrow(ExtensionError.Empty);
  });

  test("rejects single dot", () => {
    expect(() => Extension.parse(".")).toThrow(ExtensionError.Empty);
  });

  test("rejects too long", () => {
    expect(() => Extension.parse("a".repeat(17))).toThrow(ExtensionError.TooLong);
  });

  test("rejects hyphen", () => {
    expect(() => Extension.parse("web-p")).toThrow(ExtensionError.BadChars);
  });

  test("rejects space", () => {
    expect(() => Extension.parse("web p")).toThrow(ExtensionError.BadChars);
  });

  test("rejects punctuation", () => {
    expect(() => Extension.parse("webp!")).toThrow(ExtensionError.BadChars);
  });

  test("rejects double dot", () => {
    expect(() => Extension.parse("..png")).toThrow(ExtensionError.BadChars);
  });
});
