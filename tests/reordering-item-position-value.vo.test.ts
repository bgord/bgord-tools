import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { ReorderingItemPositionValue } from "../src/reordering-item-position-value.vo";

describe("ReorderingItemPositionValue", () => {
  test("happy path", () => {
    expect(v.safeParse(ReorderingItemPositionValue, 0).success).toEqual(true);
    expect(v.safeParse(ReorderingItemPositionValue, 1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(ReorderingItemPositionValue, null)).toThrow("reordering.position.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(ReorderingItemPositionValue, "123")).toThrow("reordering.position.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(ReorderingItemPositionValue, -1)).toThrow("reordering.position.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(ReorderingItemPositionValue, 1.5)).toThrow("reordering.position.type");
  });
});
