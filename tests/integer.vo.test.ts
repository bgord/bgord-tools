import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Integer } from "../src/integer.vo";

describe("Integer VO", () => {
  test("happy path", () => {
    expect(v.safeParse(Integer, -130).success).toEqual(true);
    expect(v.safeParse(Integer, -1).success).toEqual(true);
    expect(v.safeParse(Integer, 0).success).toEqual(true);
    expect(v.safeParse(Integer, 1).success).toEqual(true);
    expect(v.safeParse(Integer, 130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(Integer, null)).toThrow("integer.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(Integer, "100")).toThrow("integer.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(Integer, 100.5)).toThrow("integer.type");
  });
});
