import * as z from "zod/v4";

export const ReorderingItemPositionValueError = { Invalid: "reordering.position.type" };

export const ReorderingItemPositionValue = z
  .number(ReorderingItemPositionValueError.Invalid)
  .int(ReorderingItemPositionValueError.Invalid)
  .min(0, ReorderingItemPositionValueError.Invalid);

export type ReorderingItemPositionValueType = z.infer<typeof ReorderingItemPositionValue>;
