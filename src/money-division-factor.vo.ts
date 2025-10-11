import { z } from "zod/v4";

export const MoneyDivisionFactorError = {
  Type: "money.division.factor.type",
  Invalid: "money.division.factor.invalid",
} as const;

export const MoneyDivisionFactor = z
  .number(MoneyDivisionFactorError.Type)
  .gt(0, MoneyDivisionFactorError.Invalid)
  .brand("MoneyDivisionFactor");

export type MoneyDivisionFactorType = z.infer<typeof MoneyDivisionFactor>;
