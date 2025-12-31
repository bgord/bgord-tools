import { describe, expect, test } from "bun:test";
import { FilenameAffix } from "../src/filename-affix.vo";

describe("FilenameAffixSchema", () => {
  test("happy path", () => {
    expect(FilenameAffix.safeParse("-sm").success).toEqual(true);
    expect(FilenameAffix.safeParse("_v2").success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => FilenameAffix.parse("*-sm")).toThrow("affix.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => FilenameAffix.parse("sm-*")).toThrow("affix.bad.chars");
  });

  test("rejects non-string - number", () => {
    expect(() => FilenameAffix.parse(123)).toThrow("affix.type");
  });

  test("rejects non-string - null", () => {
    expect(() => FilenameAffix.parse(null)).toThrow("affix.type");
  });

  test("rejects empty", () => {
    expect(() => FilenameAffix.parse("")).toThrow("affix.empty");
  });

  test("rejects too long", () => {
    expect(() => FilenameAffix.parse("x".repeat(33))).toThrow("affix.too.long");
  });

  test("rejects disallowed characters", () => {
    expect(() => FilenameAffix.parse("/@!")).toThrow("affix.bad.chars");
  });
});
