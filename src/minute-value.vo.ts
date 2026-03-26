import * as v from "valibot";

export const MinuteValueError = { Type: "minute.value.type", Invalid: "minute.value.invalid" };

export const MinuteValue = v.pipe(
  v.number(MinuteValueError.Type),
  v.integer(MinuteValueError.Type),
  v.minValue(0, MinuteValueError.Invalid),
  v.maxValue(59, MinuteValueError.Invalid),
  v.brand("MinuteValue"),
);

export type MinuteValueType = v.InferOutput<typeof MinuteValue>;
