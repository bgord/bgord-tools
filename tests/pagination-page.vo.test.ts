import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Page } from "../src/pagination-page.vo";

describe("PaginationPage", () => {
  test("happy path", () => {
    expect(v.safeParse(Page, 0).success).toEqual(true);
    expect(v.safeParse(Page, 1).success).toEqual(true);
    expect(v.safeParse(Page, 5).success).toEqual(true);
    expect(v.safeParse(Page, 15).success).toEqual(true);
  });

  test("transforms null to 1", () => {
    expect(v.safeParse(Page, null)).toMatchObject({ success: true, output: 1 });
  });

  test("transforms undefined to 1", () => {
    expect(v.safeParse(Page, undefined)).toMatchObject({ success: true, output: 1 });
  });

  test("transforms string to int", () => {
    expect(v.safeParse(Page, "123")).toMatchObject({ success: true, output: 123 });
  });

  test("transforms negative numbers to 1", () => {
    expect(v.safeParse(Page, -2)).toMatchObject({ success: true, output: 1 });
  });

  test("rejects fractions", () => {
    expect(() => v.parse(Page, 1.5)).toThrow("pagination.page.type");
  });
});
