import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { FilenameAffix } from "../src/filename-affix.vo";

describe("FilenameAffixSchema", () => {
  test("happy path", () => {
    expect(v.safeParse(FilenameAffix, "-sm").success).toEqual(true);
    expect(v.safeParse(FilenameAffix, "_v2").success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => v.parse(FilenameAffix, "*-sm")).toThrow("affix.bad.chars");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(FilenameAffix, "sm-*")).toThrow("affix.bad.chars");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(FilenameAffix, 123)).toThrow("affix.type");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(FilenameAffix, null)).toThrow("affix.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(FilenameAffix, "")).toThrow("affix.empty");
  });

  test("rejects too long", () => {
    expect(() => v.parse(FilenameAffix, "x".repeat(65))).toThrow("affix.too.long");
  });

  test("rejects disallowed characters", () => {
    expect(() => v.parse(FilenameAffix, "/@!")).toThrow("affix.bad.chars");
  });
});
