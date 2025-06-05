import { describe, expect, it } from "bun:test";

import { ReorderingPosition } from "../src/reordering.service";

describe("ReorderingPosition VO", () => {
  it("validation errors", () => {
    const values = [-1, 2.5, "a"];

    for (const value of values) {
      // @ts-expect-error when Position value type is invalid
      expect(() => new ReorderingPosition(value)).toThrow("Position is not a positive integer");
    }
  });
});
