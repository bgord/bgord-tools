import * as v from "valibot";

export const HourValueError = { Type: "hour.value.type", Invalid: "hour.value.invalid" };

export const HourValue = v.pipe(
  v.number(HourValueError.Type),
  v.integer(HourValueError.Type),
  v.minValue(0, HourValueError.Invalid),
  v.maxValue(23, HourValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("HourValue"),
);

export type HourValueType = v.InferOutput<typeof HourValue>;
