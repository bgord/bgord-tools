import type { IntegerPositiveType } from "./integer-positive.vo";

export function batch<T>(array: Array<T>, size: IntegerPositiveType): Array<Array<T>> {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size),
  );
}
