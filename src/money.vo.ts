import * as v from "valibot";
import type { DivisionFactorType } from "./division-factor.vo";
import { MoneyAmount, type MoneyAmountType } from "./money-amount.vo";
import type { MultiplicationFactorType } from "./multiplication-factor.vo";
import type { RoundingStrategy } from "./rounding.strategy";
import { RoundingToNearestStrategy } from "./rounding-to-nearest.strategy";

export const MoneyError = { SubtractResultLessThanZero: "money.subtract.result.less.than.zero" };

export class Money {
  private static readonly ZERO = v.parse(MoneyAmount, 0);

  private constructor(private readonly amount: MoneyAmountType) {}

  static fromAmount(candidate: number): Money {
    return new Money(v.parse(MoneyAmount, candidate));
  }

  static fromAmountSafe(candidate: MoneyAmountType): Money {
    return new Money(candidate);
  }

  static zero(): Money {
    return Money.fromAmount(0);
  }

  getAmount(): MoneyAmountType {
    return this.amount;
  }

  add(money: Money): Money {
    return new Money(v.parse(MoneyAmount, this.amount + money.getAmount()));
  }

  multiply(
    factor: MultiplicationFactorType,
    rounding: RoundingStrategy = new RoundingToNearestStrategy(),
  ): Money {
    return new Money(v.parse(MoneyAmount, rounding.round(this.amount * factor)));
  }

  subtract(money: Money): Money {
    const result = this.amount - money.getAmount();

    if (result < Money.ZERO) throw new Error(MoneyError.SubtractResultLessThanZero);
    return new Money(v.parse(MoneyAmount, result));
  }

  divide(factor: DivisionFactorType, rounding: RoundingStrategy = new RoundingToNearestStrategy()): Money {
    return new Money(v.parse(MoneyAmount, rounding.round(this.amount / factor)));
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

  toString(): string {
    return this.amount.toString();
  }

  toJSON(): number {
    return this.amount;
  }
}
