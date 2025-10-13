import { describe, expect, test } from "bun:test";
import { Language, LanguageError } from "../src/language.vo";

describe("Language", () => {
  test("happy path", () => {
    expect(Language.safeParse("en").success).toEqual(true);
    expect(Language.safeParse("es").success).toEqual(true);
    expect(Language.safeParse("pl").success).toEqual(true);
  });

  test("converts upper to lowercase", () => {
    expect(Language.safeParse("EN").success).toEqual(true);
    expect(Language.safeParse("FR").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => Language.parse("")).toThrow(LanguageError.BadChars);
  });

  test("rejects non-string - null", () => {
    expect(() => Language.parse(null)).toThrow(LanguageError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => Language.parse(123)).toThrow(LanguageError.Type);
  });

  test("rejects strings < 1 and > 2", () => {
    expect(() => Language.parse("e")).toThrow(LanguageError.BadChars);
    expect(() => Language.parse("eng")).toThrow(LanguageError.BadChars);
  });
});
