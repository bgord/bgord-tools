import { describe, expect, test } from "bun:test";
import { FilenameSuffix, FilenameSuffixError } from "../src/filename-suffix.vo";

describe("FilenameSuffixSchema", () => {
  test("accepts '-sm'", () => {
    expect(FilenameSuffix.safeParse("-sm").success).toEqual(true);
  });

  test("accepts '_v2'", () => {
    expect(FilenameSuffix.safeParse("_v2").success).toEqual(true);
  });

  test("accepts and trims ' rc1 '", () => {
    expect(FilenameSuffix.safeParse(" rc1 ").success).toEqual(true);
  });

  test("rejects non-string - number", () => {
    expect(() => FilenameSuffix.parse(123)).toThrow(FilenameSuffixError.Type);
  });

  test("rejects non-string - null", () => {
    expect(() => FilenameSuffix.parse(null)).toThrow(FilenameSuffixError.Type);
  });

  test("rejects empty", () => {
    expect(() => FilenameSuffix.parse("")).toThrow(FilenameSuffixError.Empty);
  });

  test("rejects length 33", () => {
    expect(() => FilenameSuffix.parse("x".repeat(33))).toThrow(FilenameSuffixError.TooLong);
  });

  test("rejects disallowed characters '/@!'", () => {
    expect(() => FilenameSuffix.parse("/@!")).toThrow(FilenameSuffixError.BadChars);
  });
});
