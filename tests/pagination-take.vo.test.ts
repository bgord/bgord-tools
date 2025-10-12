import { describe, expect, test } from "bun:test";
import { PaginationTakeError, Take } from "../src/pagination-take.vo";

describe("Timestamp", () => {
  test("happy path", () => {
    expect(Take.safeParse(1).success).toEqual(true);
    expect(Take.safeParse(5).success).toEqual(true);
    expect(Take.safeParse(15).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => Take.parse(null)).toThrow(PaginationTakeError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => Take.parse("123")).toThrow(PaginationTakeError.Type);
  });

  test("rejects fractions", () => {
    expect(() => Take.parse(1.5)).toThrow(PaginationTakeError.Type);
  });

  test("rejects zero", () => {
    expect(() => Take.parse(0)).toThrow(PaginationTakeError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => Take.parse(-1)).toThrow(PaginationTakeError.Invalid);
  });
});
