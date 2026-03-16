import * as v from "valibot";

export const PaginationPageError = { Type: "pagination.page.type" };

export const Page = v.pipe(
  v.unknown(),
  v.transform((value) => (value === undefined || value === null ? 1 : Number(value))),
  v.number(PaginationPageError.Type),
  v.integer(PaginationPageError.Type),
  v.transform((value) => (value <= 0 ? 1 : value)),
);

export type PageType = v.InferOutput<typeof Page>;
