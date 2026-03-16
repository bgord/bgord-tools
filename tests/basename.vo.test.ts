import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Basename } from "../src/basename.vo";

describe("Basename", () => {
  test("happy path", () => {
    expect(v.safeParse(Basename, "avatar").success).toEqual(true);
    expect(v.safeParse(Basename, "Report_v1.2-rc").success).toEqual(true);
    expect(v.safeParse(Basename, "a".repeat(128)).success).toEqual(true);
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(Basename, null)).toThrow("basename.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(Basename, 42)).toThrow("basename.type");
  });

  test("rejects 129 chars", () => {
    expect(() => v.parse(Basename, "a".repeat(129))).toThrow("basename.too.long");
  });

  test("rejects empty", () => {
    expect(() => v.parse(Basename, "")).toThrow("basename.empty");
  });

  test("rejects forward slash", () => {
    expect(() => v.parse(Basename, "a/b")).toThrow("basename.bad.chars");
  });

  test("rejects backslash", () => {
    expect(() => v.parse(Basename, "a\\b")).toThrow("basename.bad.chars");
  });

  test("rejects control chars", () => {
    expect(() => v.parse(Basename, "line\nbreak")).toThrow("basename.bad.chars");
    expect(() => v.parse(Basename, "nul\u0000byte")).toThrow("basename.bad.chars");
  });

  test("rejects single dot", () => {
    expect(() => v.parse(Basename, ".")).toThrow("basename.dot.segments");
  });

  test("rejects double dot", () => {
    expect(() => v.parse(Basename, "..")).toThrow("basename.dot.segments");
  });

  test("rejects dotfile", () => {
    expect(() => v.parse(Basename, ".env")).toThrow("basename.dotfiles");
  });

  test("rejects trailing dot", () => {
    expect(() => v.parse(Basename, "name.")).toThrow("basename.trailing.dot");
  });

  test("rejects space", () => {
    expect(() => v.parse(Basename, "name name")).toThrow("basename.bad.chars");
  });

  test("rejects emoji", () => {
    expect(() => v.parse(Basename, "name🙂")).toThrow("basename.bad.chars");
  });

  test("rejects symbol", () => {
    expect(() => v.parse(Basename, "name@")).toThrow("basename.bad.chars");
  });
});
