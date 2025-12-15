import { z } from "zod/v4";

export const PaginationSkipError = { Type: "pagination.skip.type", Invalid: "pagination.skip.invalid" };

export const Skip = z
  .number(PaginationSkipError.Type)
  .int(PaginationSkipError.Type)
  .gte(0, PaginationSkipError.Invalid);

export type SkipType = z.infer<typeof Skip>;
