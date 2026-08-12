import * as v from "valibot";

export const MinuteValueError = { Type: "minute.value.type", Invalid: "minute.value.invalid" };

export const MinuteValueConstraints = { min: 0, max: 59 };

export const MinuteValue = v.pipe(
  v.number(MinuteValueError.Type),
  v.integer(MinuteValueError.Type),
  v.minValue(MinuteValueConstraints.min, MinuteValueError.Invalid),
  v.maxValue(MinuteValueConstraints.max, MinuteValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("MinuteValue"),
);

export type MinuteValueType = v.InferOutput<typeof MinuteValue>;
