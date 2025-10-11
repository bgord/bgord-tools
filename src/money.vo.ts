import { z } from "zod/v4";
import { MoneyAmount, type MoneyAmountType } from "./money-amount.vo";
import type { MoneyDivisionFactorType } from "./money-division-factor.vo";
import { RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

// TODO
export const MoneyAmountInvalidError = { error: "money.amount.invalid" } as const;
export const MoneyMultiplicationFactorInvalidError = {
  error: "money.multiplication-factor.invalid",
} as const;
export const MoneySubtractLessThanZeroError = "money.subtract.less.than.zero" as const;

export const MoneyMultiplicationFactor = z
  .number(MoneyMultiplicationFactorInvalidError)
  .min(0, MoneyMultiplicationFactorInvalidError)
  .brand("MoneyMultiplicationFactor");

export type MoneyMultiplicationFactorType = z.infer<typeof MoneyMultiplicationFactor>;

export class Money {
  private static readonly ZERO = 0;
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToNearest();

  private readonly amount: MoneyAmountType;
  private readonly rounding: RoundingPort;

  constructor(value: number = Money.ZERO, rounding?: RoundingPort) {
    this.amount = MoneyAmount.parse(value);
    this.rounding = rounding ?? Money.DEFAULT_ROUNDING;
  }

  getAmount(): MoneyAmountType {
    return this.amount;
  }

  add(money: Money): Money {
    const result = this.rounding.round(this.amount + money.getAmount());

    return new Money(MoneyAmount.parse(result), this.rounding);
  }

  multiply(factor: MoneyMultiplicationFactorType): Money {
    const result = this.rounding.round(this.amount * factor);

    return new Money(MoneyAmount.parse(result), this.rounding);
  }

  subtract(money: Money): Money {
    const result = this.rounding.round(this.amount - money.getAmount());

    if (result < Money.ZERO) throw new Error(MoneySubtractLessThanZeroError);
    return new Money(MoneyAmount.parse(result), this.rounding);
  }

  divide(factor: MoneyDivisionFactorType): Money {
    const result = this.rounding.round(this.amount / factor);

    return new Money(MoneyAmount.parse(result), this.rounding);
  }

  equals(another: Money): boolean {
    return this.amount === another.getAmount();
  }

  isGreaterThan(another: Money): boolean {
    return this.amount > another.getAmount();
  }

  isLessThan(another: Money): boolean {
    return this.amount < another.getAmount();
  }

  isZero(): boolean {
    return this.amount === Money.ZERO;
  }

  format(): string {
    const whole = Math.floor(this.amount / 100);
    const fraction = this.amount % 100;

    return `${whole}.${fraction.toString().padStart(2, "0")}`;
  }
}
