import { describe, expect, test } from "bun:test";
import { ImageHeight, ImageHeightError, ImageWidth, ImageWidthError } from "../src/image.vo";

describe("ImageWidth", () => {
  test("happy path", () => {
    expect(ImageWidth.safeParse(1).success).toEqual(true);
    expect(ImageWidth.safeParse(100).success).toEqual(true);
    expect(ImageWidth.safeParse(10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => ImageWidth.parse(null)).toThrow(ImageWidthError.Type);
  });

  test("rejects non-numeric - string", () => {
    expect(() => ImageWidth.parse("100")).toThrow(ImageWidthError.Type);
  });

  test("rejects too small", () => {
    expect(() => ImageWidth.parse(0)).toThrow(ImageWidthError.Length);
  });

  test("rejects too big", () => {
    expect(() => ImageWidth.parse(10_001)).toThrow(ImageWidthError.Length);
  });
});

describe("ImageWidth", () => {
  test("happy path", () => {
    expect(ImageHeight.safeParse(1).success).toEqual(true);
    expect(ImageHeight.safeParse(100).success).toEqual(true);
    expect(ImageHeight.safeParse(10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => ImageHeight.parse(null)).toThrow(ImageHeightError.Type);
  });

  test("rejects non-numeric - string", () => {
    expect(() => ImageHeight.parse("100")).toThrow(ImageHeightError.Type);
  });

  test("rejects too small", () => {
    expect(() => ImageHeight.parse(0)).toThrow(ImageHeightError.Length);
  });

  test("rejects too big", () => {
    expect(() => ImageHeight.parse(10_001)).toThrow(ImageHeightError.Length);
  });
});
