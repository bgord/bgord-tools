import { z } from "zod/v4";

export const PaginationPageError = { Type: "pagination.page.Type" };

export const Page = z.coerce
  .number(PaginationPageError.Type)
  .int(PaginationPageError.Type)
  .transform((value) => (value <= 0 ? 1 : value))
  .default(1);

export type PageType = z.infer<typeof Page>;
