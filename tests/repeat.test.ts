import { describe, expect, test } from "bun:test";
import { repeat } from "../src/repeat";

describe("repeat", () => {
  test("happy path", () => {
    const value = "abc";

    expect(repeat(value, 3)).toEqual([value, value, value]);
  });
});
