import { describe, expect, test } from "bun:test";
import {
  FilenameSuffix,
  FilenameSuffixTooLongError,
  FilenameSuffixTypeError,
} from "../src/filename-suffix.vo";

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

  test("sanitizes disallowed characters ' /@!🙂 ' (becomes empty and still valid)", () => {
    expect(FilenameSuffix.safeParse(" /@!🙂 ").success).toEqual(true);
  });

  test("rejects length 33 after sanitization", () => {
    expect(() => FilenameSuffix.parse("x".repeat(33))).toThrow(FilenameSuffixTooLongError);
  });

  test("accepts boundary length 32", () => {
    expect(FilenameSuffix.safeParse("x".repeat(32)).success).toEqual(true);
  });

  test("rejects non-string (number)", () => {
    expect(() => FilenameSuffix.parse(123)).toThrow(FilenameSuffixTypeError);
  });

  test("rejects non-string (null)", () => {
    expect(() => FilenameSuffix.parse(null)).toThrow(FilenameSuffixTypeError);
  });
});
