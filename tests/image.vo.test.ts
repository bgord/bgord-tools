import { describe, expect, test } from "bun:test";
import { ImageHeight, ImageWidth } from "../src/image.vo";

describe("ImageWidth (smoke)", () => {
  test("accepts a positive integer within max", () => {
    expect(ImageWidth.safeParse(100).success).toEqual(true);
  });

  test("rejects zero (must be positive)", () => {
    expect(ImageWidth.safeParse(0).success).toEqual(false);
  });

  test("rejects a number over the max", () => {
    expect(ImageWidth.safeParse(10_001).success).toEqual(false);
  });
});

describe("ImageHeight (smoke)", () => {
  test("accepts a positive integer within max", () => {
    expect(ImageHeight.safeParse(200).success).toEqual(true);
  });

  test("rejects zero (must be positive)", () => {
    expect(ImageHeight.safeParse(0).success).toEqual(false);
  });

  test("rejects a number over the max", () => {
    expect(ImageHeight.safeParse(10_001).success).toEqual(false);
  });
});
