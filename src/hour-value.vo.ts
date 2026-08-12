import * as v from "valibot";

export const HourValueError = { Type: "hour.value.type", Invalid: "hour.value.invalid" };

export const HourValueConstraints = { min: 0, max: 23 };

export const HourValue = v.pipe(
  v.number(HourValueError.Type),
  v.integer(HourValueError.Type),
  v.minValue(HourValueConstraints.min, HourValueError.Invalid),
  v.maxValue(HourValueConstraints.max, HourValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("HourValue"),
);

export type HourValueType = v.InferOutput<typeof HourValue>;
