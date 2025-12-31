import { describe, expect, test } from "bun:test";
import { Basename } from "../src/basename.vo";

describe("Basename", () => {
  test("happy path", () => {
    expect(Basename.safeParse("avatar").success).toEqual(true);
    expect(Basename.safeParse("Report_v1.2-rc").success).toEqual(true);
    expect(Basename.safeParse("a".repeat(128)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => Basename.parse(null)).toThrow("basename.type");
  });

  test("rejects non-string - number", () => {
    expect(() => Basename.parse(42)).toThrow("basename.type");
  });

  test("rejects 129 chars", () => {
    expect(() => Basename.parse("a".repeat(129))).toThrow("basename.too.long");
  });

  test("rejects empty", () => {
    expect(() => Basename.parse("")).toThrow("basename.empty");
  });

  test("rejects forward slash", () => {
    expect(() => Basename.parse("a/b")).toThrow("basename.bad.chars");
  });

  test("rejects backslash", () => {
    expect(() => Basename.parse("a\\b")).toThrow("basename.bad.chars");
  });

  test("rejects control chars", () => {
    expect(() => Basename.parse("line\nbreak")).toThrow("basename.bad.chars");
    expect(() => Basename.parse("nul\u0000byte")).toThrow("basename.bad.chars");
  });

  test("rejects single dot", () => {
    expect(() => Basename.parse(".")).toThrow("basename.dot.segments");
  });

  test("rejects double dot", () => {
    expect(() => Basename.parse("..")).toThrow("basename.dot.segments");
  });

  test("rejects dotfile", () => {
    expect(() => Basename.parse(".env")).toThrow("basename.dotfiles");
  });

  test("rejects trailing dot", () => {
    expect(() => Basename.parse("name.")).toThrow("basename.trailing.dot");
  });

  test("rejects space", () => {
    expect(() => Basename.parse("name name")).toThrow("basename.bad.chars");
  });

  test("rejects emoji", () => {
    expect(() => Basename.parse("name🙂")).toThrow("basename.bad.chars");
  });

  test("rejects symbol", () => {
    expect(() => Basename.parse("name@")).toThrow("basename.bad.chars");
  });
});
