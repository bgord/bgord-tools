import * as v from "valibot";

export const AgeYearsError = { Type: "age.years.type", Invalid: "age.years.invalid" };

export const AgeYearsConstraints = { min: 0, max: 130 };

export const AgeYears = v.pipe(
  v.number(AgeYearsError.Type),
  v.integer(AgeYearsError.Type),
  v.minValue(0, AgeYearsError.Invalid),
  v.maxValue(130, AgeYearsError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("AgeYears"),
);

export type AgeYearsType = v.InferOutput<typeof AgeYears>;
