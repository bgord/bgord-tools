import { describe, expect, test } from "bun:test";
import { ImageHeight, ImageWidth } from "../src/image.vo";

describe("ImageWidth", () => {
  test("happy path", () => {
    expect(ImageWidth.safeParse(1).success).toEqual(true);
    expect(ImageWidth.safeParse(100).success).toEqual(true);
    expect(ImageWidth.safeParse(10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => ImageWidth.parse(null)).toThrow("image.width.type");
  });

  test("rejects non-numeric - string", () => {
    expect(() => ImageWidth.parse("100")).toThrow("image.width.type");
  });

  test("rejects too small", () => {
    expect(() => ImageWidth.parse(0)).toThrow("image.width.length");
  });

  test("rejects too big", () => {
    expect(() => ImageWidth.parse(10_001)).toThrow("image.width.length");
  });
});

describe("ImageWidth", () => {
  test("happy path", () => {
    expect(ImageHeight.safeParse(1).success).toEqual(true);
    expect(ImageHeight.safeParse(100).success).toEqual(true);
    expect(ImageHeight.safeParse(10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => ImageHeight.parse(null)).toThrow("image.height.type");
  });

  test("rejects non-numeric - string", () => {
    expect(() => ImageHeight.parse("100")).toThrow("image.height.type");
  });

  test("rejects too small", () => {
    expect(() => ImageHeight.parse(0)).toThrow("image.height.length");
  });

  test("rejects too big", () => {
    expect(() => ImageHeight.parse(10_001)).toThrow("image.height.length");
  });
});
