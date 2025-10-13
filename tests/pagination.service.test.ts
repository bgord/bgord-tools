import { describe, expect, test } from "bun:test";
import { Pagination } from "../src/pagination.service";

describe("Pagination", () => {
  test("page 0, take 10", () => {
    const take = 10;
    const parsed = Pagination.parse({ page: 0 }, take);

    expect(parsed.page).toEqual(1);
    expect(parsed.values.take).toEqual(take);
    expect(parsed.values.skip).toEqual(0);
  });

  test("page 1, take 10", () => {
    const take = 10;
    const page = 1;
    const parsed = Pagination.parse({ page }, take);

    expect(parsed.page).toEqual(page);
    expect(parsed.values.take).toEqual(take);
    expect(parsed.values.skip).toEqual(0);
  });

  test("page 2, take 10", () => {
    const take = 10;
    const parsed = Pagination.parse({ page: 2 }, take);

    expect(parsed.page).toEqual(2);
    expect(parsed.values.take).toEqual(10);
    expect(parsed.values.skip).toEqual(10);
  });

  test("page -1, take 10", () => {
    const take = 10;
    const parsed = Pagination.parse({ page: -1 }, take);

    expect(parsed.page).toEqual(1);
    expect(parsed.values.take).toEqual(take);
    expect(parsed.values.skip).toEqual(0);
  });

  test("prepares paged metadata", () => {
    const config = {
      total: 50,
      pagination: { values: { take: 10, skip: 10 }, page: 2 },
      result: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    };

    const paged = Pagination.prepare(config);

    expect(paged.result).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(paged.meta.exhausted).toEqual(false);
    expect(paged.meta.currentPage).toEqual(2);
    expect(paged.meta.previousPage).toEqual(1);
    expect(paged.meta.nextPage).toEqual(3);
    expect(paged.meta.lastPage).toEqual(5);
    expect(paged.meta.total).toEqual(50);
  });

  test("empty paged data", () => {
    const emptyPaged = Pagination.empty;

    expect(emptyPaged.result).toEqual([]);
    expect(emptyPaged.meta.exhausted).toEqual(true);
    expect(emptyPaged.meta.currentPage).toEqual(1);
    expect(emptyPaged.meta.previousPage).toEqual(undefined);
    expect(emptyPaged.meta.nextPage).toEqual(undefined);
    expect(emptyPaged.meta.lastPage).toEqual(1);
    expect(emptyPaged.meta.total).toEqual(0);
  });

  test("isExhausted", () => {
    const config = {
      total: 25,
      pagination: { values: { take: 10, skip: 10 }, page: 3 },
    };

    const exhausted = Pagination.isExhausted(config);

    expect(exhausted).toEqual(true);
  });

  test("getFirstPage", () => {
    const firstPage = Pagination.getFirstPage({ take: 15 });

    expect(firstPage.page).toEqual(1);
    expect(firstPage.values.take).toEqual(15);
    expect(firstPage.values.skip).toEqual(0);
  });
});
