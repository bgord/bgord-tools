import { z } from "zod/v4";

export const PaginationSkipError = {
  Type: "pagination.skip.type",
  Invalid: "pagination.skip.invalid",
} as const;

export const Skip = z
  .number(PaginationSkipError.Type)
  .int(PaginationSkipError.Type)
  .gte(0, PaginationSkipError.Invalid)
  .brand("Skip");

export type SkipType = z.infer<typeof Skip>;
