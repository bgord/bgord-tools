import { describe, expect, test } from "bun:test";
import { Language } from "../src/language.vo";

describe("Language (smoke tests)", () => {
  test("accepts valid lowercase 2-letter ISO codes", () => {
    expect(Language.safeParse("en").success).toEqual(true);
    expect(Language.safeParse("es").success).toEqual(true);
    expect(Language.safeParse("pl").success).toEqual(true);
  });

  test("rejects uppercase codes", () => {
    expect(Language.safeParse("EN").success).toEqual(false);
    expect(Language.safeParse("FR").success).toEqual(false);
  });

  test("rejects codes that are not exactly length 2", () => {
    expect(Language.safeParse("e").success).toEqual(false);
    expect(Language.safeParse("eng").success).toEqual(false);
  });

  test("rejects non-alphabetic characters and non-string inputs", () => {
    expect(Language.safeParse("e1").success).toEqual(false);
    expect(Language.safeParse("--").success).toEqual(false);
    expect(Language.safeParse(42).success).toEqual(false);
  });
});
