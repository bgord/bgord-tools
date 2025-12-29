import type { RoundingStrategy } from "./rounding.strategy";

export class RoundingDownStrategy implements RoundingStrategy {
  round(value: number): number {
    return Math.floor(value);
  }
}
