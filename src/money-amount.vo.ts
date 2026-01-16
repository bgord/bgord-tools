import * as z from "zod/v4";

export const MoneyAmountError = { Type: "money.amount.type", Invalid: "money.amount.invalid" };

// Stryker disable all
export const MoneyAmount = z
  // Stryker restore all
  .number(MoneyAmountError.Type)
  .int(MoneyAmountError.Type)
  .min(0, MoneyAmountError.Invalid)
  .brand("MoneyAmount");

export type MoneyAmountType = z.infer<typeof MoneyAmount>;
