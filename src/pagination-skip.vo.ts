import * as v from "valibot";

export const PaginationSkipError = { Type: "pagination.skip.type", Invalid: "pagination.skip.invalid" };

export const Skip = v.pipe(
  v.number(PaginationSkipError.Type),
  v.integer(PaginationSkipError.Type),
  v.minValue(0, PaginationSkipError.Invalid),
);

export type SkipType = v.InferOutput<typeof Skip>;
