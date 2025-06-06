import { describe, expect, it } from "bun:test";

import { Height, Width } from "../src/image.vo";

describe("Width validator", () => {
  it("should accept a positive integer", () => {
    const result = Width.safeParse(100);
    expect(result.success).toBe(true);
  });

  it("should reject zero", () => {
    const result = Width.safeParse(0);
    expect(result.success).toBe(false);
  });

  it("should reject negative numbers", () => {
    const result = Width.safeParse(-42);
    expect(result.success).toBe(false);
  });

  it("should reject non-integer numbers", () => {
    const result = Width.safeParse(3.14);
    expect(result.success).toBe(false);
  });

  it("should reject non-number values", () => {
    const result = Width.safeParse("100");
    expect(result.success).toBe(false);
  });

  it("should reject a number over the max", () => {
    const result = Width.safeParse(10_0001);
    expect(result.success).toBe(false);
  });
});

describe("Height validator", () => {
  it("should accept a positive integer", () => {
    const result = Height.safeParse(200);
    expect(result.success).toBe(true);
  });

  it("should reject zero", () => {
    const result = Height.safeParse(0);
    expect(result.success).toBe(false);
  });

  it("should reject negative numbers", () => {
    const result = Height.safeParse(-10);
    expect(result.success).toBe(false);
  });

  it("should reject non-integer numbers", () => {
    const result = Height.safeParse(12.5);
    expect(result.success).toBe(false);
  });

  it("should reject non-number values", () => {
    const result = Height.safeParse(null);
    expect(result.success).toBe(false);
  });

  it("should reject a number over the max", () => {
    const result = Height.safeParse(10_0001);
    expect(result.success).toBe(false);
  });
});
