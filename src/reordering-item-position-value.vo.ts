import * as v from "valibot";

export const ReorderingItemPositionValueError = { Invalid: "reordering.position.type" };

export const ReorderingItemPositionValue = v.pipe(
  v.number(ReorderingItemPositionValueError.Invalid),
  v.integer(ReorderingItemPositionValueError.Invalid),
  v.minValue(0, ReorderingItemPositionValueError.Invalid),
);

export type ReorderingItemPositionValueType = v.InferOutput<typeof ReorderingItemPositionValue>;
