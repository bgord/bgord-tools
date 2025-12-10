import type { DivisionFactorType } from "./division-factor.vo";
import { MoneyAmount, type MoneyAmountType } from "./money-amount.vo";
import type { MultiplicationFactorType } from "./multiplication-factor.vo";
import { RoundDown, RoundToNearest } from "./rounding.adapter";
import type { RoundingPort } from "./rounding.port";

export const MoneyError = { SubtractResultLessThanZero: "money.subtract.result.less.than.zero" } as const;

export class Money {
  private static readonly ZERO = MoneyAmount.parse(0);
  private static readonly DEFAULT_ROUNDING: RoundingPort = new RoundToNearest();

  private constructor(
    private readonly amount: MoneyAmountType,
    private readonly rounding: RoundingPort = Money.DEFAULT_ROUNDING,
  ) {}

  static fromAmount(candidate: number, rounding?: RoundingPort): Money {
    return new Money(MoneyAmount.parse(candidate), rounding);
  }

  static fromAmountSafe(candidate: MoneyAmountType, rounding?: RoundingPort): Money {
    return new Money(candidate, rounding);
  }

  getAmount(): MoneyAmountType {
    return this.amount;
  }

  add(money: Money): Money {
    return new Money(MoneyAmount.parse(this.amount + money.getAmount()), this.rounding);
  }

  multiply(factor: MultiplicationFactorType): Money {
    return new Money(MoneyAmount.parse(this.rounding.round(this.amount * factor)), this.rounding);
  }

  subtract(money: Money): Money {
    const result = this.amount - money.getAmount();

    if (result < Money.ZERO) throw new Error(MoneyError.SubtractResultLessThanZero);
    return new Money(MoneyAmount.parse(result), this.rounding);
  }

  divide(factor: DivisionFactorType): Money {
    return new Money(MoneyAmount.parse(this.rounding.round(this.amount / factor)), this.rounding);
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
    const whole = new RoundDown().round(this.amount / 100);
    const fraction = this.amount % 100;

    return `${whole}.${fraction.toString().padStart(2, "0")}`;
  }

  toString(): string {
    return this.format();
  }

  toJSON(): number {
    return this.amount;
  }
}
