import { describe, expect, test } from "bun:test";
import {
  Basename,
  BasenameBadCharsError,
  BasenameControlCharsForbiddenError,
  BasenameDotfilesForbiddenError,
  BasenameDotSegmentsForbiddenError,
  BasenameEmptyError,
  BasenameSlashesForbiddenError,
  BasenameTooLongError,
  BasenameTrailingDotForbiddenError,
  BasenameTypeError,
} from "../src/basename.vo";

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
    expect(() => Basename.parse(42)).toThrow(BasenameTypeError);
  });

  test("rejects non-string (null)", () => {
    expect(() => Basename.parse(null)).toThrow(BasenameTypeError);
  });

  test("rejects 129 chars", () => {
    expect(() => Basename.parse("a".repeat(129))).toThrow(BasenameTooLongError);
  });

  test("rejects empty string", () => {
    expect(() => Basename.parse("")).toThrow(BasenameEmptyError);
  });

  test("rejects whitespace-only string", () => {
    expect(() => Basename.parse("   ")).toThrow(BasenameEmptyError);
  });

  test("rejects forward slash 'a/b'", () => {
    expect(() => Basename.parse("a/b")).toThrow(BasenameSlashesForbiddenError);
  });

  test("rejects backslash 'a\\b'", () => {
    expect(() => Basename.parse("a\\b")).toThrow(BasenameSlashesForbiddenError);
  });

  test("rejects control char 'line\\nbreak'", () => {
    expect(() => Basename.parse("line\nbreak")).toThrow(BasenameControlCharsForbiddenError);
  });

  test("rejects control char 'nul\\u0000byte'", () => {
    expect(() => Basename.parse("nul\u0000byte")).toThrow(BasenameControlCharsForbiddenError);
  });

  test("rejects '.'", () => {
    expect(() => Basename.parse(".")).toThrow(BasenameDotSegmentsForbiddenError);
  });

  test("rejects '..'", () => {
    expect(() => Basename.parse("..")).toThrow(BasenameDotSegmentsForbiddenError);
  });

  test("rejects dotfile '.env'", () => {
    expect(() => Basename.parse(".env")).toThrow(BasenameDotfilesForbiddenError);
  });

  test("rejects trailing dot 'name.'", () => {
    expect(() => Basename.parse("name.")).toThrow(BasenameTrailingDotForbiddenError);
  });

  test("rejects space 'name name'", () => {
    expect(() => Basename.parse("name name")).toThrow(BasenameBadCharsError);
  });

  test("rejects emoji 'name🙂'", () => {
    expect(() => Basename.parse("name🙂")).toThrow(BasenameBadCharsError);
  });

  test("rejects symbol 'name@'", () => {
    expect(() => Basename.parse("name@")).toThrow(BasenameBadCharsError);
  });
});
