import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Extension } from "../src/extension.vo";

describe("Extension", () => {
  test("happy path", () => {
    expect(v.safeParse(Extension, "webp").success).toEqual(true);
    expect(v.safeParse(Extension, "jpg").success).toEqual(true);
    expect(v.safeParse(Extension, "7z").success).toEqual(true);
    expect(v.safeParse(Extension, ".PNG").success).toEqual(true);
    expect(v.safeParse(Extension, "a".repeat(16)).success).toEqual(true);
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(Extension, 123)).toThrow("extension.type");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(Extension, null)).toThrow("extension.type");
  });

  test("rejects empty string", () => {
    expect(() => v.parse(Extension, "")).toThrow("extension.empty");
  });

  test("accepts single char", () => {
    expect(v.parse(Extension, "c")).toEqual("c");
    expect(v.parse(Extension, ".h")).toEqual("h");
  });

  test("rejects single dot", () => {
    expect(() => v.parse(Extension, ".")).toThrow("extension.empty");
  });

  test("rejects too long", () => {
    expect(() => v.parse(Extension, "a".repeat(17))).toThrow("extension.too.long");
  });

  test("rejects hyphen", () => {
    expect(() => v.parse(Extension, "web-p")).toThrow("extension.bad.chars");
  });

  test("rejects space", () => {
    expect(() => v.parse(Extension, "web p")).toThrow("extension.bad.chars");
  });

  test("rejects punctuation", () => {
    expect(() => v.parse(Extension, "webp!")).toThrow("extension.bad.chars");
  });

  test("rejects double dot", () => {
    expect(() => v.parse(Extension, "..png")).toThrow("extension.bad.chars");
  });

  test("rejects prefix", () => {
    expect(() => v.parse(Extension, "!webp")).toThrow("extension.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(Extension, "webp ")).toThrow("extension.bad.chars");
  });

  test("rejects internal dot", () => {
    expect(() => v.parse(Extension, "a.png")).toThrow("extension.bad.chars");
  });
});
