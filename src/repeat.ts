import type { IntegerPositiveType } from "./integer-positive.vo";

export function repeat<T>(value: T, count: IntegerPositiveType): Array<T> {
  return Array.from({ length: count }).map(() => value);
}
