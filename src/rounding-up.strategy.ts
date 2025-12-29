import type { RoundingStrategy } from "./rounding.strategy";

export class RoundingUpStrategy implements RoundingStrategy {
  round(value: number): number {
    return Math.ceil(value);
  }
}
