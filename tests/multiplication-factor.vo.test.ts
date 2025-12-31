import { describe, expect, test } from "bun:test";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";

describe("DivisionFactor", () => {
  test("happy path", () => {
    expect(MultiplicationFactor.safeParse(10).success).toEqual(true);
    expect(MultiplicationFactor.safeParse(1.5).success).toEqual(true);
    expect(MultiplicationFactor.safeParse(0).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => MultiplicationFactor.parse(null)).toThrow("multiplication.factor.type");
  });

  test("rejects non-number - string", () => {
    expect(() => MultiplicationFactor.parse("123")).toThrow("multiplication.factor.type");
  });

  test("rejects negative numbers", () => {
    expect(() => MultiplicationFactor.parse(-1)).toThrow("multiplication.factor.invalid");
  });
});
