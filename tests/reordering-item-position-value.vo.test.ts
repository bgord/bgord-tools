import { describe, expect, test } from "bun:test";
import { ReorderingItemPositionValue } from "../src/reordering-item-position-value.vo";

describe("ReorderingItemPositionValue", () => {
  test("happy path", () => {
    expect(ReorderingItemPositionValue.safeParse(0).success).toEqual(true);
    expect(ReorderingItemPositionValue.safeParse(1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => ReorderingItemPositionValue.parse(null)).toThrow("reordering.position.type");
  });

  test("rejects non-number - string", () => {
    expect(() => ReorderingItemPositionValue.parse("123")).toThrow("reordering.position.type");
  });

  test("rejects negative numbers", () => {
    expect(() => ReorderingItemPositionValue.parse(-1)).toThrow("reordering.position.type");
  });

  test("rejects fractions", () => {
    expect(() => ReorderingItemPositionValue.parse(1.5)).toThrow("reordering.position.type");
  });
});
