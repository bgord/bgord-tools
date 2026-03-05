export function repeat<T>(value: T, count: number): Array<T> {
  return Array.from({ length: count }).map(() => value);
}
