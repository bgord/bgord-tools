import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Language } from "../src/language.vo";

describe("Language", () => {
  test("happy path", () => {
    expect(v.safeParse(Language, "en").success).toEqual(true);
    expect(v.safeParse(Language, "es").success).toEqual(true);
    expect(v.safeParse(Language, "pl").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => v.parse(Language, "")).toThrow("language.bad.chars");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(Language, null)).toThrow("language.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(Language, 123)).toThrow("language.type");
  });

  test("rejects non-lowercase", () => {
    expect(() => v.parse(Language, "EN")).toThrow("language.bad.chars");
    expect(() => v.parse(Language, "ES")).toThrow("language.bad.chars");
    expect(() => v.parse(Language, "PL")).toThrow("language.bad.chars");
  });

  test("rejects strings < 1 and > 2", () => {
    expect(() => v.parse(Language, "e")).toThrow("language.bad.chars");
    expect(() => v.parse(Language, "eng")).toThrow("language.bad.chars");
  });
});
