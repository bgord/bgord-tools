import { describe, expect, test } from "bun:test";
import { PaginationPageError, Page } from "../src/pagination-page.vo";

describe("PaginationTake", () => {
  test("happy path", () => {
    expect(Page.safeParse(0).success).toEqual(true);
    expect(Page.safeParse(1).success).toEqual(true);
    expect(Page.safeParse(5).success).toEqual(true);
    expect(Page.safeParse(15).success).toEqual(true);
  });

  test("transforms null to 1", () => {
    expect(Page.safeParse(null)).toEqual({ success: true, data: 1 });
  });

  test("transforms string to int", () => {
    expect(Page.safeParse("123")).toEqual({ success: true, data: 123 });
  });

  test("transforms negative numbers to 1", () => {
    expect(Page.safeParse(-2)).toEqual({ success: true, data: 1 });
  });

  test("rejects fractions", () => {
    expect(() => Page.parse(1.5)).toThrow(PaginationPageError.Type);
  });
});
