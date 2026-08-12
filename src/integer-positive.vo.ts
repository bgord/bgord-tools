import * as v from "valibot";

export const IntegerPositiveError = { Type: "integer.positive.type", Invalid: "integer.positive.invalid" };

export const IntegerPositive = v.pipe(
  v.number(IntegerPositiveError.Type),
  v.safeInteger(IntegerPositiveError.Type),
  v.minValue(1, IntegerPositiveError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("IntegerPositive"),
);

export type IntegerPositiveType = v.InferOutput<typeof IntegerPositive>;
