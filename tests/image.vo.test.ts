import { describe, expect, test } from "bun:test";
import { Height, Width } from "../src/image.vo";

describe("Width validator", () => {
  test("should accept a positive integer", () => {
    expect(Width.safeParse(100).success).toBe(true);
  });

  test("should reject zero", () => {
    expect(Width.safeParse(0).success).toBe(false);
  });

  test("should reject negative numbers", () => {
    expect(Width.safeParse(-42).success).toBe(false);
  });

  test("should reject non-integer numbers", () => {
    expect(Width.safeParse(3.14).success).toBe(false);
  });

  test("should reject non-number values", () => {
    expect(Width.safeParse("100").success).toBe(false);
  });

  test("should reject a number over the max", () => {
    expect(Width.safeParse(10_0001).success).toBe(false);
  });
});

describe("Height validator", () => {
  test("should accept a positive integer", () => {
    expect(Height.safeParse(200).success).toBe(true);
  });

  test("should reject zero", () => {
    expect(Height.safeParse(0).success).toBe(false);
  });

  test("should reject negative numbers", () => {
    expect(Height.safeParse(-10).success).toBe(false);
  });

  test("should reject non-integer numbers", () => {
    expect(Height.safeParse(12.5).success).toBe(false);
  });

  test("should reject non-number values", () => {
    expect(Height.safeParse(null).success).toBe(false);
  });

  test("should reject a number over the max", () => {
    expect(Height.safeParse(10_0001).success).toBe(false);
  });
});
