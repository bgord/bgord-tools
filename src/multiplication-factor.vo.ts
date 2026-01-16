import * as z from "zod/v4";

export const MultiplicationFactorError = {
  Type: "multiplication.factor.type",
  Invalid: "multiplication.factor.invalid",
};

// Stryker disable all
export const MultiplicationFactor = z
  // Stryker restore all
  .number(MultiplicationFactorError.Type)
  .min(0, MultiplicationFactorError.Invalid)
  .brand("MultiplicationFactor");

export type MultiplicationFactorType = z.infer<typeof MultiplicationFactor>;
