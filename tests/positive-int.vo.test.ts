import { describe, expect, test } from "bun:test";
import { PositiveInt, PositiveIntError } from "../src/positive-int.vo";

describe("PositiveInt", () => {
  test("happy path", () => {
    expect(PositiveInt.safeParse(1).success).toEqual(true);
    expect(PositiveInt.safeParse(130).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => PositiveInt.parse(null)).toThrow(PositiveIntError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => PositiveInt.parse("100")).toThrow(PositiveIntError.Type);
  });

  test("rejects fraction", () => {
    expect(() => PositiveInt.parse(100.5)).toThrow(PositiveIntError.Type);
  });

  test("rejects 0", () => {
    expect(() => PositiveInt.parse(0)).toThrow(PositiveIntError.Invalid);
  });
});
