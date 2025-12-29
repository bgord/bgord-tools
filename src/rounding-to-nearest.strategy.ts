import type { RoundingStrategy } from "./rounding.strategy";

export class RoundingToNearestStrategy implements RoundingStrategy {
  round(value: number): number {
    return Math.round(value);
  }
}
