import * as v from "valibot";

export const IntegerNonNegativeError = {
  Type: "integer.non.negative.type",
  Invalid: "integer.non.negative.invalid",
};

export const IntegerNonNegative = v.pipe(
  v.number(IntegerNonNegativeError.Type),
  v.integer(IntegerNonNegativeError.Type),
  v.minValue(0, IntegerNonNegativeError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("IntegerNonNegative"),
);

export type IntegerNonNegativeType = v.InferOutput<typeof IntegerNonNegative>;
