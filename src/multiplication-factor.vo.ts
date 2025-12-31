import { z } from "zod/v4";

export const MultiplicationFactorError = {
  Type: "multiplication.factor.type",
  Invalid: "multiplication.factor.invalid",
};

export const MultiplicationFactor = z
  .number(MultiplicationFactorError.Type)
  .min(0, MultiplicationFactorError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("MultiplicationFactor");

export type MultiplicationFactorType = z.infer<typeof MultiplicationFactor>;
