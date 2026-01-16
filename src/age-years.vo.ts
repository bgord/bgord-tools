import * as z from "zod/v4";

export const AgeYearsError = { Type: "age.years.type", Invalid: "age.years.invalid" };

export const AgeYearsConstraints = { min: 1, max: 130 };

// Stryker disable all
export const AgeYears = z
  // Stryker restore all
  .number(AgeYearsError.Type)
  .int(AgeYearsError.Type)
  .min(1, AgeYearsError.Invalid)
  .max(130, AgeYearsError.Invalid)
  .brand("AgeYears");

export type AgeYearsType = z.infer<typeof AgeYears>;
