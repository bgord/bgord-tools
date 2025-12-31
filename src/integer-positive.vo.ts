import { z } from "zod/v4";

export const IntegerPositiveError = { Type: "integer.positive.type", Invalid: "integer.positive.invalid" };

export const IntegerPositive = z
  .number(IntegerPositiveError.Type)
  .int(IntegerPositiveError.Type)
  .min(1, IntegerPositiveError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("IntegerPositive");

export type IntegerPositiveType = z.infer<typeof IntegerPositive>;
