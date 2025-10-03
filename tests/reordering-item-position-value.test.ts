import { describe, expect, test } from "bun:test";
import { ReorderingPosition, ReorderingPositionError } from "../src/reordering.service";

describe("ReorderingPosition VO", () => {
  test("validation errors", () => {
    const values = [-1, 2.5, "a"];

    for (const value of values) {
      // @ts-expect-error when Position value type is invalid
      expect(() => new ReorderingPosition(value)).toThrow(ReorderingPositionError.error);
    }
  });
});
