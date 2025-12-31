import { describe, expect, test } from "bun:test";
import { Skip } from "../src/pagination-skip.vo";

describe("PaginationTake", () => {
  test("happy path", () => {
    expect(Skip.safeParse(0).success).toEqual(true);
    expect(Skip.safeParse(1).success).toEqual(true);
    expect(Skip.safeParse(5).success).toEqual(true);
    expect(Skip.safeParse(15).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => Skip.parse(null)).toThrow("pagination.skip.type");
  });

  test("rejects non-number - string", () => {
    expect(() => Skip.parse("123")).toThrow("pagination.skip.type");
  });

  test("rejects fractions", () => {
    expect(() => Skip.parse(1.5)).toThrow("pagination.skip.type");
  });

  test("rejects negative numbers", () => {
    expect(() => Skip.parse(-1)).toThrow("pagination.skip.invalid");
  });
});
