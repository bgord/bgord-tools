import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { batch } from "../src/batch";
import { IntegerPositive } from "../src/integer-positive.vo";

const size = v.parse(IntegerPositive, 10);

describe("batch", () => {
  test("happy path", () => {
    const strings = Array.from({ length: 25 }, (_, i) => `item-${i}`);
    const result = batch(strings, size);

    expect(result.length).toEqual(3);
    expect(result[0].length).toEqual(10);
    expect(result[1].length).toEqual(10);
    expect(result[2].length).toEqual(5);
  });

  test("happy path - less than size", () => {
    const strings = ["a", "b", "c"];
    const result = batch(strings, size);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(["a", "b", "c"]);
  });

  test("empty array", () => {
    expect(batch([], size)).toEqual([]);
  });
});
