import { z } from "zod/v4";

export const IntegerNonNegativeError = {
  Type: "integer.non.negative.type",
  Invalid: "integer.non.negative.invalid",
};

// Stryker disable all
export const IntegerNonNegative = z
  // Stryker restore all
  .number(IntegerNonNegativeError.Type)
  .int(IntegerNonNegativeError.Type)
  .min(0, IntegerNonNegativeError.Invalid)
  .brand("IntegerNonNegative");

export type IntegerNonNegativeType = z.infer<typeof IntegerNonNegative>;
