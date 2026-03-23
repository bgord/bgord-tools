import * as v from "valibot";
import { Page, type PageType } from "./pagination-page.vo";
import { Skip, type SkipType } from "./pagination-skip.vo";
import { Take, type TakeType } from "./pagination-take.vo";
import { RoundingUpStrategy } from "./rounding-up.strategy";

export type PaginationType = { values: { take: TakeType; skip: SkipType }; page: PageType };
export type PaginationValuesType = Record<string, unknown>;
export type TotalType = number;
export type ExhaustedType = boolean;
export type PaginationExhaustedConfig = { total: TotalType; pagination: PaginationType };
export type PaginationPrepareConfigType<T> = {
  total: TotalType;
  pagination: PaginationType;
  result: ReadonlyArray<T>;
};

export class Pagination {
  static parse(values: PaginationValuesType, _take: TakeType): PaginationType {
    const page = v.parse(Page, values["page"]);
    const take = v.parse(Take, _take);

    const skip = v.parse(Skip, (page - 1) * take);

    return { values: { take, skip }, page };
  }

  static prepare<T>(config: PaginationPrepareConfigType<T>): Paged<T> {
    const exhausted = Pagination.isExhausted(config);

    const currentPage = config.pagination.page;
    const lastPage = Pagination.getLastPage(config);

    const previousPage = currentPage > 1 ? v.parse(Page, currentPage - 1) : undefined;
    const nextPage = currentPage < lastPage ? v.parse(Page, currentPage + 1) : undefined;

    return {
      result: config.result,
      meta: { exhausted, currentPage, previousPage, nextPage, lastPage, total: config.total },
    };
  }

  static isExhausted(config: PaginationExhaustedConfig): ExhaustedType {
    return Pagination.getLastPage(config) <= config.pagination.page;
  }

  private static getLastPage(config: PaginationExhaustedConfig): PageType {
    return v.parse(Page, new RoundingUpStrategy().round(config.total / config.pagination.values.take));
  }

  static empty = {
    result: [],
    meta: {
      exhausted: true,
      currentPage: 1,
      previousPage: undefined,
      nextPage: undefined,
      lastPage: 1,
      total: 0,
    },
  };

  static getFirstPage(input: { take: TakeType }): PaginationType {
    return { values: { take: v.parse(Take, input.take), skip: v.parse(Skip, 0) }, page: v.parse(Page, 1) };
  }
}

export type Paged<T> = {
  result: ReadonlyArray<T>;
  meta: {
    exhausted: ExhaustedType;
    currentPage: PageType;
    previousPage: PageType | undefined;
    nextPage: PageType | undefined;
    lastPage: PageType;
    total: TotalType;
  };
};
