import { describe, expect, it } from "bun:test";
import { Language } from "../src/language.vo";

describe("Language", () => {
  it("accepts valid lowercase 2-letter ISO codes", () => {
    expect(Language.parse("en")).toBe("en");
    expect(Language.parse("es")).toBe("es");
    expect(Language.parse("pl")).toBe("pl");
  });

  it("rejects uppercase codes", () => {
    expect(() => Language.parse("EN")).toThrowError("invalid_language");
    expect(() => Language.parse("FR")).toThrowError("invalid_language");
  });

  it("rejects codes that are too short or too long", () => {
    expect(() => Language.parse("e")).toThrow();
    expect(() => Language.parse("eng")).toThrow();
  });

  it("rejects non-alphabetic characters", () => {
    expect(() => Language.parse("e1")).toThrow();
    expect(() => Language.parse("9x")).toThrow();
    expect(() => Language.parse("--")).toThrow();
  });

  it("rejects empty string", () => {
    expect(() => Language.parse("")).toThrow();
  });

  it("rejects non-string input", () => {
    expect(() => Language.parse(42)).toThrow();
  });
});
