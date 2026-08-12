import * as v from "valibot";

export const RoundingDecimalError = { Type: "rounding.decimal.type", Invalid: "rounding.decimal.invalid" };

export const RoundingDecimal = v.pipe(
  v.number(RoundingDecimalError.Type),
  v.integer(RoundingDecimalError.Type),
  v.minValue(0, RoundingDecimalError.Invalid),
  v.maxValue(100, RoundingDecimalError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("RoundingDecimal"),
);

export type RoundingDecimalType = v.InferOutput<typeof RoundingDecimal>;
