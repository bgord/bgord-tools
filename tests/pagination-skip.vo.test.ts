import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Skip } from "../src/pagination-skip.vo";

describe("PaginationSkip", () => {
  test("happy path", () => {
    expect(v.safeParse(Skip, 0).success).toEqual(true);
    expect(v.safeParse(Skip, 1).success).toEqual(true);
    expect(v.safeParse(Skip, 5).success).toEqual(true);
    expect(v.safeParse(Skip, 15).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(Skip, null)).toThrow("pagination.skip.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(Skip, "123")).toThrow("pagination.skip.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(Skip, 1.5)).toThrow("pagination.skip.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(Skip, -1)).toThrow("pagination.skip.invalid");
  });
});
