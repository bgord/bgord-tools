import { describe, expect, test } from "bun:test";
import { Basename, BasenameError } from "../src/basename.vo";

describe("Basename", () => {
  test("accepts 'avatar'", () => {
    expect(Basename.safeParse("avatar").success).toEqual(true);
  });

  test("accepts 'Report_v1.2-rc'", () => {
    expect(Basename.safeParse("Report_v1.2-rc").success).toEqual(true);
  });

  test("accepts and trims ' a.b_c-d '", () => {
    expect(Basename.safeParse(" a.b_c-d ").success).toEqual(true);
  });

  test("accepts 128 chars", () => {
    expect(Basename.safeParse("a".repeat(128)).success).toEqual(true);
  });

  test("rejects non-string (number)", () => {
    expect(() => Basename.parse(42)).toThrow(BasenameError.Type);
  });

  test("rejects non-string (null)", () => {
    expect(() => Basename.parse(null)).toThrow(BasenameError.Type);
  });

  test("rejects 129 chars", () => {
    expect(() => Basename.parse("a".repeat(129))).toThrow(BasenameError.TooLong);
  });

  test("rejects empty string", () => {
    expect(() => Basename.parse("")).toThrow(BasenameError.Empty);
  });

  test("rejects whitespace-only string", () => {
    expect(() => Basename.parse("   ")).toThrow(BasenameError.Empty);
  });

  test("rejects forward slash 'a/b'", () => {
    expect(() => Basename.parse("a/b")).toThrow(BasenameError.BadChars);
  });

  test("rejects backslash 'a\\b'", () => {
    expect(() => Basename.parse("a\\b")).toThrow(BasenameError.BadChars);
  });

  test("rejects control char 'line\\nbreak'", () => {
    expect(() => Basename.parse("line\nbreak")).toThrow(BasenameError.BadChars);
  });

  test("rejects control char 'nul\\u0000byte'", () => {
    expect(() => Basename.parse("nul\u0000byte")).toThrow(BasenameError.BadChars);
  });

  test("rejects '.'", () => {
    expect(() => Basename.parse(".")).toThrow(BasenameError.DotSegments);
  });

  test("rejects '..'", () => {
    expect(() => Basename.parse("..")).toThrow(BasenameError.DotSegments);
  });

  test("rejects dotfile '.env'", () => {
    expect(() => Basename.parse(".env")).toThrow(BasenameError.Dotfiles);
  });

  test("rejects trailing dot 'name.'", () => {
    expect(() => Basename.parse("name.")).toThrow(BasenameError.TrailingDot);
  });

  test("rejects space 'name name'", () => {
    expect(() => Basename.parse("name name")).toThrow(BasenameError.BadChars);
  });

  test("rejects emoji 'name🙂'", () => {
    expect(() => Basename.parse("name🙂")).toThrow(BasenameError.BadChars);
  });

  test("rejects symbol 'name@'", () => {
    expect(() => Basename.parse("name@")).toThrow(BasenameError.BadChars);
  });
});
