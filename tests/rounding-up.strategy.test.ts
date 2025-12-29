import { describe, expect, test } from "bun:test";
import { RoundingUpStrategy } from "../src/rounding-up.strategy";

describe("RoundingUpStrategy", () => {
  test("happy path", () => {
    const rounding = new RoundingUpStrategy();

    expect(rounding.round(5.6)).toEqual(6);
    expect(rounding.round(3.2)).toEqual(4);
  });
});
