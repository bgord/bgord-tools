import { z } from "zod/v4";

export const PaginationTakeError = {
  Type: "pagination.take.type",
  Invalid: "pagination.take.invalid",
} as const;

export const Take = z
  .number(PaginationTakeError.Type)
  .int(PaginationTakeError.Type)
  .gte(1, PaginationTakeError.Invalid);

export type TakeType = z.infer<typeof Take>;
