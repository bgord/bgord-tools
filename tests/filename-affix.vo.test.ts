import { describe, expect, test } from "bun:test";
import { FilenameAffix, FilenameAffixError } from "../src/filename-affix.vo";

describe("FilenameAffixSchema", () => {
  test("happy path", () => {
    expect(FilenameAffix.safeParse("-sm").success).toEqual(true);
    expect(FilenameAffix.safeParse("_v2").success).toEqual(true);
  });

  test("rejects non-string - number", () => {
    expect(() => FilenameAffix.parse(123)).toThrow(FilenameAffixError.Type);
  });

  test("rejects non-string - null", () => {
    expect(() => FilenameAffix.parse(null)).toThrow(FilenameAffixError.Type);
  });

  test("rejects empty", () => {
    expect(() => FilenameAffix.parse("")).toThrow(FilenameAffixError.Empty);
  });

  test("rejects too long", () => {
    expect(() => FilenameAffix.parse("x".repeat(33))).toThrow(FilenameAffixError.TooLong);
  });

  test("rejects disallowed characters", () => {
    expect(() => FilenameAffix.parse("/@!")).toThrow(FilenameAffixError.BadChars);
  });
});
