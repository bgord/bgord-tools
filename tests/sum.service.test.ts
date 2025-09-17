import { describe, expect, test } from "bun:test";
import { Sum } from "../src/sum.service";

describe("Sum", () => {
  test("works for one value", () => {
    expect(Sum.of([1])).toEqual(1);
  });

  test("works for two values", () => {
    expect(Sum.of([1, 2])).toEqual(3);
  });

  test("works for three values", () => {
    expect(Sum.of([1, 3, 6])).toEqual(10);
  });

  test("works for all zeros", () => {
    expect(Sum.of([0, 0, 0])).toEqual(0);
  });
});
