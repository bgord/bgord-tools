import { describe, expect, test } from "bun:test";
import { Basename, BasenameError } from "../src/basename.vo";

describe("Basename", () => {
  test("happy path", () => {
    expect(Basename.safeParse("avatar").success).toEqual(true);
    expect(Basename.safeParse("Report_v1.2-rc").success).toEqual(true);
    expect(Basename.safeParse("a".repeat(128)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => Basename.parse(null)).toThrow(BasenameError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => Basename.parse(42)).toThrow(BasenameError.Type);
  });

  test("rejects 129 chars", () => {
    expect(() => Basename.parse("a".repeat(129))).toThrow(BasenameError.TooLong);
  });

  test("rejects empty", () => {
    expect(() => Basename.parse("")).toThrow(BasenameError.Empty);
  });

  test("rejects forward slash", () => {
    expect(() => Basename.parse("a/b")).toThrow(BasenameError.BadChars);
  });

  test("rejects backslash", () => {
    expect(() => Basename.parse("a\\b")).toThrow(BasenameError.BadChars);
  });

  test("rejects control chars", () => {
    expect(() => Basename.parse("line\nbreak")).toThrow(BasenameError.BadChars);
    expect(() => Basename.parse("nul\u0000byte")).toThrow(BasenameError.BadChars);
  });

  test("rejects single dot", () => {
    expect(() => Basename.parse(".")).toThrow(BasenameError.DotSegments);
  });

  test("rejects double dot", () => {
    expect(() => Basename.parse("..")).toThrow(BasenameError.DotSegments);
  });

  test("rejects dotfile", () => {
    expect(() => Basename.parse(".env")).toThrow(BasenameError.Dotfiles);
  });

  test("rejects trailing dot", () => {
    expect(() => Basename.parse("name.")).toThrow(BasenameError.TrailingDot);
  });

  test("rejects space", () => {
    expect(() => Basename.parse("name name")).toThrow(BasenameError.BadChars);
  });

  test("rejects emoji", () => {
    expect(() => Basename.parse("name🙂")).toThrow(BasenameError.BadChars);
  });

  test("rejects symbol", () => {
    expect(() => Basename.parse("name@")).toThrow(BasenameError.BadChars);
  });
});
