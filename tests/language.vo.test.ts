import { describe, expect, test } from "bun:test";
import { Language } from "../src/language.vo";

describe("Language", () => {
  test("happy path", () => {
    expect(Language.safeParse("en").success).toEqual(true);
    expect(Language.safeParse("es").success).toEqual(true);
    expect(Language.safeParse("pl").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => Language.parse("")).toThrow("language.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => Language.parse(null)).toThrow("language.type");
  });

  test("rejects non-string - number", () => {
    expect(() => Language.parse(123)).toThrow("language.type");
  });

  test("rejects non-lowercase", () => {
    expect(() => Language.parse("EN")).toThrow("language.bad.chars");
    expect(() => Language.parse("ES")).toThrow("language.bad.chars");
    expect(() => Language.parse("PL")).toThrow("language.bad.chars");
  });

  test("rejects strings < 1 and > 2", () => {
    expect(() => Language.parse("e")).toThrow("language.bad.chars");
    expect(() => Language.parse("eng")).toThrow("language.bad.chars");
  });
});
