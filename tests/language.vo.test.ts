import { describe, expect, test } from "bun:test";

import { Language } from "../src/language.vo";

describe("Language", () => {
  test("accepts valid lowercase 2-letter ISO codes", () => {
    expect(Language.parse("en")).toBe("en");
    expect(Language.parse("es")).toBe("es");
    expect(Language.parse("pl")).toBe("pl");
  });

  test("rejects uppercase codes", () => {
    expect(() => Language.parse("EN")).toThrowError("invalid_language");
    expect(() => Language.parse("FR")).toThrowError("invalid_language");
  });

  test("rejects codes that are too short or too long", () => {
    expect(() => Language.parse("e")).toThrow();
    expect(() => Language.parse("eng")).toThrow();
  });

  test("rejects non-alphabetic characters", () => {
    expect(() => Language.parse("e1")).toThrow();
    expect(() => Language.parse("9x")).toThrow();
    expect(() => Language.parse("--")).toThrow();
  });

  test("rejects empty string", () => {
    expect(() => Language.parse("")).toThrow();
  });

  test("rejects non-string input", () => {
    expect(() => Language.parse(42)).toThrow();
  });
});
