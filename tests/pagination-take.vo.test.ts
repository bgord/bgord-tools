import { describe, expect, test } from "bun:test";
import { Take } from "../src/pagination-take.vo";

describe("PaginationTake", () => {
  test("happy path", () => {
    expect(Take.safeParse(1).success).toEqual(true);
    expect(Take.safeParse(5).success).toEqual(true);
    expect(Take.safeParse(15).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => Take.parse(null)).toThrow("pagination.take.type");
  });

  test("rejects non-number - string", () => {
    expect(() => Take.parse("123")).toThrow("pagination.take.type");
  });

  test("rejects fractions", () => {
    expect(() => Take.parse(1.5)).toThrow("pagination.take.type");
  });

  test("rejects zero", () => {
    expect(() => Take.parse(0)).toThrow("pagination.take.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => Take.parse(-1)).toThrow("pagination.take.invalid");
  });
});
