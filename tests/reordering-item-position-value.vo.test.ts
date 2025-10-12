import { describe, expect, test } from "bun:test";
import {
  ReorderingItemPositionValue,
  ReorderingItemPositionValueError,
} from "../src/reordering-item-position-value.vo";

describe("ReorderingItemPositionValue", () => {
  test("happy path", () => {
    expect(ReorderingItemPositionValue.safeParse(0).success).toEqual(true);
    expect(ReorderingItemPositionValue.safeParse(1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => ReorderingItemPositionValue.parse(null)).toThrow(ReorderingItemPositionValueError.Invalid);
  });

  test("rejects non-number - string", () => {
    expect(() => ReorderingItemPositionValue.parse("123")).toThrow(ReorderingItemPositionValueError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => ReorderingItemPositionValue.parse(-1)).toThrow(ReorderingItemPositionValueError.Invalid);
  });

  test("rejects fractions", () => {
    expect(() => ReorderingItemPositionValue.parse(1.5)).toThrow(ReorderingItemPositionValueError.Invalid);
  });
});
