import { z } from "zod/v4";

export const IntegerPositiveError = { Type: "integer.positive.type", Invalid: "integer.positive.invalid" };

// Stryker disable all
export const IntegerPositive = z
  // Stryker restore all
  .number(IntegerPositiveError.Type)
  .int(IntegerPositiveError.Type)
  .min(1, IntegerPositiveError.Invalid)
  .brand("IntegerPositive");

export type IntegerPositiveType = z.infer<typeof IntegerPositive>;
