import { describe, expect, test } from "bun:test";
import { Integer, IntegerError } from "../src/integer.vo";

describe("Integer VO", () => {
  test("happy path", () => {
    expect(Integer.safeParse(-130).success).toEqual(true);
    expect(Integer.safeParse(-1).success).toEqual(true);
    expect(Integer.safeParse(0).success).toEqual(true);
    expect(Integer.safeParse(1).success).toEqual(true);
    expect(Integer.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => Integer.parse(null)).toThrow(IntegerError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => Integer.parse("100")).toThrow(IntegerError.Type);
  });

  test("rejects fraction", () => {
    expect(() => Integer.parse(100.5)).toThrow(IntegerError.Type);
  });
});
