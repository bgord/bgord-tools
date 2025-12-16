import { describe, expect, test } from "bun:test";
import { Random, RandomError } from "../src/random.service";

describe("Random", () => {
  test("throws when min equals max", () => {
    expect(() => Random.generate({ min: 1, max: 1 })).toThrow(RandomError.MinMax);
  });

  test("throws when min greater than max", () => {
    expect(() => Random.generate({ min: 2, max: 1 })).toThrow(RandomError.MinMax);
  });

  test("throws when all zeros", () => {
    expect(() => Random.generate({ min: 0, max: 0 })).toThrow(RandomError.MinMax);
  });

  test("generate - default config", () => {
    const result = Random.generate();

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  test("generate - min 1, max 10", () => {
    const result = Random.generate({ min: 1, max: 10 });

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});
