import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";

describe("Extension", () => {
  test("happy path", () => {
    expect(Extension.safeParse("webp").success).toEqual(true);
    expect(Extension.safeParse("jpg").success).toEqual(true);
    expect(Extension.safeParse("7z").success).toEqual(true);
    expect(Extension.safeParse(".PNG").success).toEqual(true);
    expect(Extension.safeParse("a".repeat(16)).success).toEqual(true);
  });

  test("rejects non-string - number", () => {
    expect(() => Extension.parse(123)).toThrow("extension.type");
  });

  test("rejects non-string - null", () => {
    expect(() => Extension.parse(null)).toThrow("extension.type");
  });

  test("rejects empty string", () => {
    expect(() => Extension.parse("")).toThrow("extension.empty");
  });

  test("rejects single char", () => {
    expect(() => Extension.parse("a")).toThrow("extension.empty");
  });

  test("rejects single dot", () => {
    expect(() => Extension.parse(".")).toThrow("extension.empty");
  });

  test("rejects too long", () => {
    expect(() => Extension.parse("a".repeat(17))).toThrow("extension.too.long");
  });

  test("rejects hyphen", () => {
    expect(() => Extension.parse("web-p")).toThrow("extension.bad.chars");
  });

  test("rejects space", () => {
    expect(() => Extension.parse("web p")).toThrow("extension.bad.chars");
  });

  test("rejects punctuation", () => {
    expect(() => Extension.parse("webp!")).toThrow("extension.bad.chars");
  });

  test("rejects double dot", () => {
    expect(() => Extension.parse("..png")).toThrow("extension.bad.chars");
  });

  test("rejects prefix", () => {
    expect(() => Extension.parse("!webp")).toThrow("extension.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => Extension.parse("webp ")).toThrow("extension.bad.chars");
  });

  test("rejects internal dot", () => {
    expect(() => Extension.parse("a.png")).toThrow("extension.bad.chars");
  });
});
