import { z } from "zod/v4";

export const ReorderingItemPositionValueError = { Invalid: "reordering.position.type" } as const;

export const ReorderingItemPositionValue = z
  .number(ReorderingItemPositionValueError.Invalid)
  .int(ReorderingItemPositionValueError.Invalid)
  .min(0, ReorderingItemPositionValueError.Invalid)
  .brand("ReorderingItemPositionValue");

export type ReorderingItemPositionValueType = z.infer<typeof ReorderingItemPositionValue>;
