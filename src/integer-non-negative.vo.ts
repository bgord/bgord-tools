import { z } from "zod/v4";

export const IntegerNonNegativeError = {
  Type: "integer.non.negative.type",
  Invalid: "integer.non.negative.invalid",
};

export const IntegerNonNegative = z
  .number(IntegerNonNegativeError.Type)
  .int(IntegerNonNegativeError.Type)
  .min(0, IntegerNonNegativeError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("IntegerNonNegative");

export type IntegerNonNegativeType = z.infer<typeof IntegerNonNegative>;
