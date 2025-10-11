import { z } from "zod/v4";

export const MoneyAmountError = { Type: "money.amount.type", Invalid: "money.amount.invalid" };

export const MoneyAmount = z
  .number(MoneyAmountError.Type)
  .int(MoneyAmountError.Type)
  .min(0, MoneyAmountError.Invalid)
  .brand("MoneyAmount");
