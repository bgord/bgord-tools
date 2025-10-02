import { describe, expect, test } from "bun:test";
import {
  Random,
  RandomMaxNotIntegerError,
  RandomMinEqualsMaxError,
  RandomMinGreaterThanMaxError,
  RandomMinNotIntegerError,
} from "../src/random.service";

describe("Random", () => {
  describe("validations", () => {
    test("invalid min", () => {
      expect(() => Random.generate({ min: 1.5, max: 2 })).toThrow(RandomMinNotIntegerError);
    });

    test("invalid max", () => {
      expect(() => Random.generate({ min: 1, max: 2.5 })).toThrow(RandomMaxNotIntegerError);
    });

    test("min equals max", () => {
      expect(() => Random.generate({ min: 1, max: 1 })).toThrow(RandomMinEqualsMaxError);
    });

    test("min greater than max", () => {
      expect(() => Random.generate({ min: 2, max: 1 })).toThrow(RandomMinGreaterThanMaxError);
    });

    test("all zeros", () => {
      expect(() => Random.generate({ min: 0, max: 0 })).toThrow(RandomMinEqualsMaxError);
    });
  });

  describe("generate", () => {
    test("default config", () => {
      const result = Random.generate();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });

    test("min 1, max 10", () => {
      const result = Random.generate({ min: 1, max: 10 });
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  });
});
