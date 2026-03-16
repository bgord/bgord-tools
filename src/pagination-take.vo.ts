import * as v from "valibot";

export const PaginationTakeError = { Type: "pagination.take.type", Invalid: "pagination.take.invalid" };

export const Take = v.pipe(
  v.number(PaginationTakeError.Type),
  v.integer(PaginationTakeError.Type),
  v.minValue(1, PaginationTakeError.Invalid),
);

export type TakeType = v.InferOutput<typeof Take>;
