import { describe, expect, test } from "bun:test";
import { RoundingDownStrategy } from "../src/rounding-down.strategy";

describe("RoundingDownStrategy", () => {
  test("happy path", () => {
    const rounding = new RoundingDownStrategy();

    expect(rounding.round(5.6)).toEqual(5);
    expect(rounding.round(3.2)).toEqual(3);
  });
});
