import { describe, expect, test } from "bun:test";
import { ImageHeight, ImageWidth } from "../src/image.vo";

describe("ImageWidth validator", () => {
  test("should accept a positive integer", () => {
    expect(ImageWidth.safeParse(100).success).toBe(true);
  });

  test("should reject zero", () => {
    expect(ImageWidth.safeParse(0).success).toBe(false);
  });

  test("should reject negative numbers", () => {
    expect(ImageWidth.safeParse(-42).success).toBe(false);
  });

  test("should reject non-integer numbers", () => {
    expect(ImageWidth.safeParse(3.14).success).toBe(false);
  });

  test("should reject non-number values", () => {
    expect(ImageWidth.safeParse("100").success).toBe(false);
  });

  test("should reject a number over the max", () => {
    expect(ImageWidth.safeParse(10_0001).success).toBe(false);
  });
});

describe("ImageHeight validator", () => {
  test("should accept a positive integer", () => {
    expect(ImageHeight.safeParse(200).success).toBe(true);
  });

  test("should reject zero", () => {
    expect(ImageHeight.safeParse(0).success).toBe(false);
  });

  test("should reject negative numbers", () => {
    expect(ImageHeight.safeParse(-10).success).toBe(false);
  });

  test("should reject non-integer numbers", () => {
    expect(ImageHeight.safeParse(12.5).success).toBe(false);
  });

  test("should reject non-number values", () => {
    expect(ImageHeight.safeParse(null).success).toBe(false);
  });

  test("should reject a number over the max", () => {
    expect(ImageHeight.safeParse(10_0001).success).toBe(false);
  });
});
