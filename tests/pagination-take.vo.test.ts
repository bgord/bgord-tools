import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Take } from "../src/pagination-take.vo";

describe("PaginationTake", () => {
  test("happy path", () => {
    expect(v.safeParse(Take, 1).success).toEqual(true);
    expect(v.safeParse(Take, 5).success).toEqual(true);
    expect(v.safeParse(Take, 15).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(Take, null)).toThrow("pagination.take.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(Take, "123")).toThrow("pagination.take.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(Take, 1.5)).toThrow("pagination.take.type");
  });

  test("rejects zero", () => {
    expect(() => v.parse(Take, 0)).toThrow("pagination.take.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(Take, -1)).toThrow("pagination.take.invalid");
  });
});
