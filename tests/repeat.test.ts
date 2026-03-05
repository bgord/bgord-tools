import { describe, expect, test } from "bun:test";
import { IntegerPositive } from "../src/integer-positive.vo";
import { repeat } from "../src/repeat";

describe("repeat", () => {
  test("happy path", () => {
    const value = "abc";

    expect(repeat(value, IntegerPositive.parse(3))).toEqual([value, value, value]);
  });
});
