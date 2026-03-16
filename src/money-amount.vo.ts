import * as v from "valibot";

export const MoneyAmountError = { Type: "money.amount.type", Invalid: "money.amount.invalid" };

export const MoneyAmount = v.pipe(
  v.number(MoneyAmountError.Type),
  v.integer(MoneyAmountError.Type),
  v.minValue(0, MoneyAmountError.Invalid),
  v.brand("MoneyAmount"),
);

export type MoneyAmountType = v.InferOutput<typeof MoneyAmount>;
