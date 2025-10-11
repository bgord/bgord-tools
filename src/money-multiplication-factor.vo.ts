import { z } from "zod/v4";

export const MoneyMultiplicationFactorError = {
  Type: "money.multiplication.factor.type",
  Invalid: "money.multiplication.factor.invalid",
} as const;

export const MoneyMultiplicationFactor = z
  .number(MoneyMultiplicationFactorError.Type)
  .min(0, MoneyMultiplicationFactorError.Invalid)
  .brand("MoneyMultiplicationFactor");

export type MoneyMultiplicationFactorType = z.infer<typeof MoneyMultiplicationFactor>;
