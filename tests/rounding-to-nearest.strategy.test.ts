import { describe, expect, test } from "bun:test";
import { RoundingToNearestStrategy } from "../src/rounding-to-nearest.strategy";

describe("RoundingToNearestStrategy", () => {
  test("happy path", () => {
    const rounding = new RoundingToNearestStrategy();

    expect(rounding.round(5.6)).toEqual(6);
    expect(rounding.round(3.2)).toEqual(3);
  });
});
