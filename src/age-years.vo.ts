import { z } from "zod/v4";

export const AgeYearsError = { Type: "age.years.type", Invalid: "age.years.invalid" };

export const AgeYearsConstraints = { min: 1, max: 130 };

export const AgeYears = z
  .number(AgeYearsError.Type)
  .int(AgeYearsError.Type)
  .min(1, AgeYearsError.Invalid)
  .max(130, AgeYearsError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("AgeYears");

export type AgeYearsType = z.infer<typeof AgeYears>;
